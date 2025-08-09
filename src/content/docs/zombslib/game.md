---
title: Game API
description: Zombslib Game API guide
sidebar:
    order: 2
---

## Joining a game

The following is all that's needed to make a simple connection to the server.

```ts
mason.on("partyJoinServer", (server: ApiServer) => {
    const game = new Game(server);
});
```

There are some options which you can tweak to fit your needs.

| NAME                | TYPE       | DESCRIPTION                                          | DEFAULT            |
| ------------------- | ---------- | ---------------------------------------------------- | ------------------ |
| displayName         | string     | In-game name                                         | "Player"           |
| proxy               | Agent      | Connection proxy                                     | -                  |
| decodeEntityUpdates | boolean    | Handle EntityUpdate packets                          | true               |
| decodeRpcs          | boolean    | Handle RPC packets                                   | true               |
| parseSchemas        | boolean    | Automatically parse JSON data and emit Schema events | true               |
| rpcMapping          | DumpedData | RPC mapping for the targetted platform & version     | _built-in mapping_ |

After initializing a connection, you must wait for the server to accept your request and send you an `EnterWorldResponse` to begin sending RPCs.

```ts
game.on("EnterWorldResponse", (response: EnterWorldResponse) => {
    if (response.allowed) {
        game.setPlatformRpc(/* your platform, same as in your RPC mapping */);
        game.startTcpStreamRpc(0, 0);
    }
});
```

## Controlling the bot

Just like with Mason, zombslib handles all decoding/encoding for you and exposes a user-friendly API. The server will begin sending you entity updates once you've delivered it `SetPlatformRpc` and `StartTcpStreamRpc`. After sending those, you're free to do anything with your bot.

```ts
// Iterating players
game.on("EntityUpdate", (update: EntityUpdate) => {
    for (const [uid, entity] of game.getEntitiesByType(
        EntityType.PlayerEntity
    )) {
        // ...
    }
});

// Echo example
game.on("ReceiveChatMessageRpc", (rpc: ReceiveChatMessageRpc) => {
    if (rpc.uid !== game.getMyUid()) {
        game.sendChatMessageRpc("Local", rpc.message);
    }
});
```

## Supported events

-   **All RPCs**\
    `ExampleRpc` (rpc: ExampleRpc)
-   **All Schemas**\
    `SchemaExample` (data: SchemaExample or SchemaExample[])
-   **Any packet**\
    `RawData` (data: Uint8Array)
-   **Any RPC**\
    `Rpc` (name: string, rpc: object)
-   **Any RPC (blob)**\
    `RpcRawData` (namehash: number, decryptedData: Uint8Array)
-   **Enter World Response**\
    `EnterWorldResponse` (enterWorldResponse: EnterWorldResponse)
-   **TCP Entity Update**\
    `EntityUpdate` (entityUpdate: EntityUpdate)

:::caution[Important]
RPC reference is not yet available in our documentation, contact us if you've got any questions.
:::
