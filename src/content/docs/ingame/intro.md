---
title: Introduction
description: ZombsRoyale Wiki's introduction to ingame protocol reverse-engineering documentation.
---

When it comes to making bots or a private server for a given game, the first goal we have to keep in mind is to reverse-engineer and understand the protocol completely (or as much as possible). This is the major goal any game modder or hacker needs to achieve to be able to modify the game at will.

## Inspecting the packets

For this purpose, you will first need a way of getting the decrypted packets to be prepared to start reversing them.

Since the game is multi-platform you can choose any platform you are most comfortable with, but keep in mind that the client version has an AntiCheat, which makes it harder to retrieve the packet bytes (because we cannot hook unless we figure out an AntiCheat bypass).

I will not go into much detail here but I have chosen to inspect the packets through a web userscript with [Violentmonkey](https://violentmonkey.github.io/).

Here are some other approaches you could try:
- Find a PC client AntiCheat bypass and use hooks on helper methods to retrieve the decrypted packets.
- Use [frida](https://frida.re/docs/javascript-api/) on an Android/iOS device or emulator.

There is no easy manner of doing this but some way may end up being easier for you.

## Joining a lobby

The type of packets in charge of joining a lobby are [`PACKET_ENTER_WORLD`](https://zombsroyale.wiki/reference/packet-ids/#packet_enter_world-4).\
Below is an outgoing parsed sample of these packets:
```json
// Outgoing PACKET_ENTER_WORLD:
{
  "displayName": "Player",
  "version": 18,
  "proofOfWork": [
    210, 121, 12, 65, 100, 84, 178, 85, 56, 241, 104, 185, 195, 241, 55, 43,
    31, 183, 215, 223, 176, 4, 54, 220
  ]
}
```
|    NAME     |     DESCRIPTION      |
|-------------|----------------------|
| displayName | display name         |
| version     | the protocol version |
| proofOfWork | **\*PoW**            |

The protocol version is also called Codec version and the proof of work is by far the hardest part to take away.

#### \***PoW** (Proof of Work)

- It is calculated differently for each platform and the algorithm changes across Codec versions.
- It is what distinguishes the platform of the client to the server and therefore decides whether you need to send AntiCheat health packets or not.

## RPCs and the EnterWorldResponse

RPC stands for [Remote Procedure Call](https://en.wikipedia.org/wiki/Remote_procedure_call) but basically and for our purposes, RPCs are just a type of packets called [`PACKET_RPC`](https://zombsroyale.wiki/reference/packet-ids/#packet_rpc-9) with id `9` that handle the major part of intercommunication between clients and server on the game, being the ones encrypted and most important next to `PACKET_ENTER_WORLD`.
Here is a decrypted sample of an RPC:
```js
// Outgoing PACKET_RPC:
Uint8Array(15) [ 9, 42, 0, 0, 0, 3, 87, 101, 98, 0, 0, 0, 0, 0, 0 ]
```
This type of RPC is actually called "SetPlatformRpc" and this sample is from the web client (you'll see why that's important in a bit).
There are also incoming RPCs, and both incoming and outgoing are encrypted, so we have to previously decrypt them from our homebrew toolset to actually inspect them and start reversing.\
This is the first RPC decryption layer.

#### RPC types

There are also `PACKET_RPC` sub-types (such as "SetPlatformRpc") identified by the second value on the packets (`42, 0, 0, 0` on our sample) of type [Uint32](https://zombsroyale.wiki/reference/rpc-parameter-types/#uint32-0), which is the reason why it has a padding of zeros.

These sub-types are actually called *indexes* and they correspond to RPC internal C# classes that inherit from either `OutRpc` or `InRpc` types of the game, depending on whether it is an outgoing or incoming RPC.

The game protocol is obfuscated in a way that both the client and server have so called `internalId`s that are matched to random indexes when a client joins a lobby.\
I know this may seem confusing at first but **here is where the EnterWorldResponse comes into play.**

### The EnterWorldResponse and internalId's

If you have been following along, you will remember the outgoing [`PACKET_ENTER_WORLD`](https://zombsroyale.wiki/reference/packet-ids/#packet_enter_world-4).
The EnterWorldResponse is no more than the server-to-client packet in response to our outgoing `PACKET_ENTER_WORLD` (client-to-server) sample.
Here is our parsed EnterWorldResponse sample:
```js
// Incoming PACKET_ENTER_WORLD:
{
  "version": 18,
  "allowed": 1,
  "uid": 256,
  "startingTick": 5186,
  "tickRate": 64,
  "effectiveTickRate": 64,
  "players": 30,
  "maxPlayers": 200,
  "chatChannel": 0,
  "effectiveDisplayName": "Player",
  "x1": 0,
  "y1": 0,
  "x2": 20000,
  "y2": 20000,
  "entities": [
    // ...
  ],
  "rpcs": [
    {
      "index": 0,
      "internalId": 2709538405,
      "isArray": false,
      "parameters": [
        { "id": 1082326051, "type": 0, "internalId": -1 },
        { "id": 3094559808, "type": 0, "internalId": -1 },
        { "id": 3633746829, "type": 8, "internalId": -1 },
        { "id": 639169537, "type": 8, "internalId": -1 },
        { "id": 201103873, "type": 0, "internalId": -1 },
        { "id": 509480188, "type": 8, "internalId": -1 },
        { "id": 3271804154, "type": 8, "internalId": -1 },
        { "id": 1122552831, "type": 8, "internalId": -1 },
        { "id": 2811707975, "type": 0, "internalId": -1 },
        { "id": 478880929, "type": 8, "internalId": -1 },
        { "id": 1968842697, "type": 3, "internalId": -1 },
        { "id": 2041678923, "type": 8, "internalId": -1 },
        { "id": 3526381527, "type": 0, "internalId": -1 }
      ]
    },
    // ...
  ],
  "mode": "Solo",
  "map": "Map1",
  "udpCookie": 11264265,
  "udpPort": 9002
}
```
I have skipped a huge part of it for readability but you can take a look at the whole dump [here](https://zombsroyale.wiki/enter-world-response-sample.json).

Both the client and server have a copy of these internalId's. The server is choosing to use this set of them because it identifies the platform of the client as "Web" with the Proof of Work. This is possible because the PoW is calculated differently for each platform.
Each platform has their own set of internalId's for each Codec version (18 in this case) that both client and server must share to intercommunicate, in relation to the Proof of Work.
The `proofOfWork`s must different per connection because they rely on the ingame server's endpoint (randomized on the server-side each time).

Here is our "SetPlatform" RPC sample again:
```js
// Outgoing PACKET_RPC:
Uint8Array(15) [ 9, 42, 0, 0, 0, 3, 87, 101, 98, 0, 0, 0, 0, 0, 0 ]
```

To reverse it, the first thing we must do is look for the index (`42` in this case, ignoring the padding) on the `rpcs` object of our EnterWorldResponse.\
This is the part of EnterWorldResponse's `rcps` object we are interested in:
```js
"rpcs": [
  // ...
  {
    "index": 42,
    "internalId": 942553282,
    "isArray": false,
    "parameters": [
      { "id": 1581339859, "type": 3, "internalId": -1 },
      { "id": 3417191498, "type": 8, "internalId": -1 },
      { "id": 107290053, "type": 8, "internalId": -1 },
      { "id": 3227619306, "type": 8, "internalId": -1 },
      { "id": 3775041204, "type": 8, "internalId": -1 },
      { "id": 235998359, "type": 8, "internalId": -1 },
      { "id": 3076491064, "type": 8, "internalId": -1 }
    ]
  },
  // ...
],
```

In this object:
- `index` is the randomized RPC sub-type id.
- `internalId` is a hash-like internal identifier of the C# inheriting class of `InRpc` or `OutRpc` game types (in this case of "SetPlatformRpc").
- `isArray` and determines if the RPC can be sent multiple times on the same packet as an array.
- `parameters` contains the parameter structure of the RPC.

In our "SetPlatformRpc" sample, the first parameter is of type [String](https://zombsroyale.wiki/reference/rpc-parameter-types/#string-3) which in this case represents the string "Web" in 4 bytes `3, 87, 101, 98`, where the first byte is the string length and the rest are the "Web" characters in ASCII. The rest of the bytes of our outgoing RPC sample are of type [Uint8](https://zombsroyale.wiki/reference/rpc-parameter-types/#uint8-8) and are there just to confuse the reverse-engineer by randomizing the RPC structures on each lobby.

If we ignore the dummy type `8` (Uint8) randomized parameters on this packet we are left with just the string "Web". So we now know the "SetPlatformRpc" sends a platform string that can be "Web", "Windows", "Android" or "iOS".
The SetPlatformRpc is special because the server wont show the client ingame until it receives it, which makes it essential for bots to send it.
