---
title: Protocol
description: ZombsRoyale.io's ingame protocol reverse-engineering documentation.
---

When it comes to making bots or a private server for a given game, the first goal we have to keep in mind is to reverse-engineer and understand the protocol completely (or as much as possible). This is the major goal any game modder or hacker needs to achieve to be able to modify the game at will.

## Inspecting the packets

For this purpose, you will first need a way of getting the decrypted packets to be prepared to start reversing them.

Since the game is multi-platform you can choose any platform you are most comfortable with, but keep in mind that the client version has an AntiCheat, which makes it harder to retrieve the packet bytes since we cannot hook unless we find a bypass.

I will not go into much detail here but I have chosen to inspect the packets through a web userscript with [Violentmonkey](https://violentmonkey.github.io/).

Here are some other approaches you could try:
- Find a PC client AntiCheat bypass and use hooks on helper methods to retrieve the decrypted packets.
- Use [frida](https://frida.re/docs/javascript-api/) Interceptors on Android or an emulator to do the same thing.

There is no easy manner of doing this but some way may end up being easier for you.

## Joining a lobby

The type of packets in charge of joining a lobby are [`PACKET_ENTER_WORLD`](https://zr.tyr7.zip/reference/packet-ids/#packet_enter_world-4).\
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
- It is what distinguishes the platform of the client to the server and therefore decides whether you need to be connected to AntiCheat servers or not.

## RPCs and the EnterWorldResponse

RPC stands for [Remote Procedure Call](https://en.wikipedia.org/wiki/Remote_procedure_call) but basically and for our purposes, RPCs are just a type of packets called [`PACKET_RPC`](https://zr.tyr7.zip/reference/packet-ids/#packet_rpc-9) with id `9` that handle the major part of intercommunication between clients and server on the game, being the ones encrypted and most importantly next to `PACKET_ENTER_WORLD`.
Here is a decrypted sample of an RPC:
```js
// Outgoing PACKET_RPC:
Uint8Array(15) [ 9, 42, 0, 0, 0, 3, 87, 101, 98, 0, 0, 0, 0, 0, 0 ]
```
There are also incoming RPCs, and both incoming and outgoing come encrypted, so we have to previously decrypt them from our homebrew toolset to actually inspect them and start reversing.\
This is the first decryption layer.

#### RPC types

There are also `PACKET_RPC` sub-types identified by the second value on the packets (`42, 0, 0, 0` on our sample) of type [Uint32](https://zr.tyr7.zip/reference/rpc-parameter-types/#uint32-0), which is the reason why it has a padding of zeros.

These sub-types are actually called index's and they correspond to RPC internal C# classes that inherit from either `OutRpc` or `InRpc` types of the game depending on whether it is an outgoing or incoming RPC respectively.

This is actually not exactly like this.\
The game protocol is obfuscated in a way that both the client and server have so called `internalId`s that are matched to random index's when a client joins a lobby.\
**Here is where the EnterWorldResponse comes into play.**

### The EnterWorldResponse and internalId's

If you have been following along, you will remember the outgoing [`PACKET_ENTER_WORLD`](https://zr.tyr7.zip/reference/packet-ids/#packet_enter_world-4).
The EnterWorldResponse is no more than the incoming response packet to our outgoing `PACKET_ENTER_WORLD` sample.
This is our parsed sample:
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
      "unknownBool1": false,
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
I have skipped a huge part of it but you can take a look at the whole dump right [here](https://zr.tyr7.zip/enter-world-response-sample.json).

Both the client and the server has a copy of these internalId's and the server specifically chose to use this set of them because it identified the platform of the client by the PoW.

Here is our RPC sample again:
```js
// Outgoing PACKET_RPC:
Uint8Array(15) [ 9, 42, 0, 0, 0, 3, 87, 101, 98, 0, 0, 0, 0, 0, 0 ]
```

To reverse it, the first thing we must do is look for the index (`42` in this case, ignoring the padding) in the `rpcs` object of our parsed EnterWorldResponse.\
This is the part of `rcps` we are interested in:
```js
"rpcs": [
  // ...
  {
    "index": 42,
    "internalId": 942553282,
    "unknownBool1": false,
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

- `index` is the randomized RPC sub-type id for each lobby connection.
- `internalId` is a hash-like internal identifier of the C# inheriting class of `InRpc` or `OutRpc` game types.
- `unknownBool1` is actually unknown.
- `parameters` contains the parameter structure of a given RPC.

In our sample, the first parameter is of type [String](https://zr.tyr7.zip/reference/rpc-parameter-types/#string-3) which in this case represents the string "Web" in 4 bytes `3, 87, 101, 98` (the first byte is the string length and the rest are the characters in ASCII). The rest of the bytes of our outgoing RPC sample of type [Uint8](https://zr.tyr7.zip/reference/rpc-parameter-types/#uint8-8) are just to confuse the reverse-engineer but they are still required.
