---
title: REST API
description: Zombslib REST API guide
sidebar:
    order: 5
---

Zombslib provides a wrapper for the game's REST API. The usage is very straightforward so we won't go into much detail in this article. Documentation of all known API endpoints can be found [here](https://zombsroyale.wiki/api/introduction/).

## Example

```ts
const api = new RestClient({ unsafe: false });

api.getLeaderboard({
    mode: "squad",
    time: "all",
    category: "kills",
}).then((r) => {
    if (r.status === "success") {
        console.log(r.players);
    }
});

// This will throw an error and the request won't go through!
api.clearSessions("deadbeefdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef");
```

:::note[Note]
The `unsafe` option in RestClient options determines whether or not actions that modify the account are allowed. An attempt to make an unsafe API call with that option set to false will throw an error.
:::
