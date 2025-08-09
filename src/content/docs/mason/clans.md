---
title: Mason Clans Events
description: ZombsRoyale Wiki's Mason Service documentation
sidebar:
    label: Clans
    badge:
        text: Obsolete
        variant: danger
---

## Client to server

---

### ~~sendPrivateMessage~~

**Description:** Obsolete. Sends a private message to a friend.\
**Parameters:**

| NAME     | TYPE   |
| -------- | ------ |
| friendId | string |
| message  | string |

## Server to client

---

### clansData

**Description:** Deprecated. Is sent during initialization. Contains clans list.\
**Parameters:**

| NAME  | TYPE      |
| ----- | --------- |
| clans | ApiClan[] |

### ~~privateMessageReceived~~

**Description:** Obsolete. Is sent once a clan member sends a clan message.\
**Parameters:** Unknown.
