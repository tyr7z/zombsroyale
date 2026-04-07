---
title: Mason Service
description: Official zombslib docs
sidebar:
    order: 1
---

## Introduction

If you are unfamiliar with what Mason Service is, please refer to our [articles](https://zombs.wiki/mason/introduction/) regarding it.

By default, Zombslib connects you to the official server but Zombslib also allows you to specify where exactly you wish to connect and if you want to use a proxy or not:

```ts
const mason = new MasonService({
    url: "https://example.com/mason",
    proxy: ...,
});
```

## Matchmaking

To enter matchmaking, you must first create a party and configure it, once you've done that, you can go ready.

```ts
mason.on("socketIoSessionData", (data: SocketIOSessionData) => {
    setInterval(() => mason.sendPing(), data.pingInterval);
    mason.createParty();
    mason.setPartyRegion(ServerRegion.Europe);
    mason.setPartyGameMode("Solo");
    mason.setReady(true);
});
```

Once the matchmaking server finds a lobby for you, it will emit a `partyJoinServer` event, containing its details so that you can connect to it.

```ts
mason.on("partyJoinServer", (server: ApiServer) => {
    console.log(`${server.hostname}/${server.endpoint}`);
});
```

Use the `Game` class to join the lobby with an in-game bot. More information on that [here](https://zombs.wiki/mason/game/).

```ts
mason.on("partyJoinServer", (server: ApiServer) => {
    const game = new Game(server, { displayName: "Example Bot" });
});
```

## Other events

List of all events and their parameters can be found in the source code, as well as [here](https://zombs.wiki/mason/introduction/). It is worth noting that there is also an `any` event.
