---
title: REST API
description: ZombsRoyale Wiki's ZombsRoyale.io REST API documentation
sidebar:
    label: Introduction
    order: 0
---

ZombsRoyale's API is split into two components that each handle different things. This section covers the HTTPS/REST component.

## Cheat sheet

-   **User key** - AKA "account token" or "key", is really just what the name suggests - an API token for the account. User keys are strings of 16 (old keys) or 24 lowercase bytes. Here is an example: `0123456789abcdefdeadbeef0123456789abcdef01234567`. If somebody comes in posession of your key, they can access your entire account and do anything they want with it. You can revoke all keys to your account by clicking the "Clear Sessions" button in ZR options menu.

-   **Privileged key** - AKA "dev key", is a key to an account which was given additional privileges by the developers. Such accounts get access to a built-in ESP, dev commands, tournament perms and in-game player effects.

-   **Tournament code** - is the identifier of a tournament lobby. A table containing all (known) tournament codes can be found [here](https://gist.github.com/creaffy/26e74c6347b3c0dc1d494de9f9df0069).

## Response structure

A successfull call will return an object structured like so:

```json
{
    "status": "success"
    // Additional data
}
```

An unsuccesssful one, like so:

```json
{
    "status": "error",
    "message": "Some message."
}
```

Do not rely on HTTP codes, unsuccessful calls often (but not always) return 200 OK.
