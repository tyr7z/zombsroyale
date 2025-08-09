---
title: Mason Service
description: Zombslib Mason Service guide
sidebar:
    order: 1
---

## Getting started

If you are running a custom Mason Service server, you can specify the url to which you wish to connect, otherwise, you'll be connected to the official one.

```ts
const mason = new MasonService({
    url: "https://example.com/mason",
});
```

Here is a table with all `MasonService` options:

| NAME  | TYPE   | DESCRIPTION      |
| ----- | ------ | ---------------- |
| url   | string | Target URL       |
| proxy | Agent  | Connection proxy |

## Entering matchmaking

To enter matchmaking, you must first create a party and configure it, once you're done, you can go ready.

```ts
mason.on("open", () => {
    setInterval(() => mason.sendPing(), 55 * 1000);
    mason.createParty();
    mason.setPartyRegion("vultr-frankfurt");
    mason.setPartyGameMode("Solo");
    mason.setReady(true);
});
```

:::note[Note]
The official Mason Service server expects the client to ping it every 55 seconds but you'll be timed out after 2 minutes.
:::

## Handling events

**Zombslib** automatically parses all incoming payloads for you and emits events.

```ts
mason.on("friendRequestReceived", (frq: ApiFriendRequest) => console.log(frq));
```

List of all events and their parameters can be found in the source code, as well as [here](https://zombsroyale.wiki/mason/socket/). It is worth noting that there is an `any` event.
