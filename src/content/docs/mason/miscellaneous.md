---
title: Mason Miscellaneous Events
description: ZombsRoyale Wiki's Mason Service documentation
sidebar:
    label: Miscellaneous
---

## Client to server

---

### login

**Description:** Sets the account key for your session.\
**Parameters:**

| NAME    | TYPE   |
| ------- | ------ |
| userKey | string |

### logout

**Description:** Clears the account key for your session.

### refresh

**Description:** Makes the server re-send all the initialization messages. (clansData, friendsData, friendRequests)

### setPlatform

**Description:** Sets your platform. Before client and mobile lobbies were fused, this was what the matchmaking system used to determing your platform.\
**Parameters:**

| NAME     | TYPE   |
| -------- | ------ |
| platform | string |

### setVersion

**Description:** Sets your game version.\
**Parameters:**

| NAME    | TYPE   |
| ------- | ------ |
| version | string |

### setName

**Description:** Sets your nickname which will be used in-game.\
**Parameters:**

| NAME | TYPE   |
| ---- | ------ |
| name | string |

### setStatus

**Description:** Sets your status. If you set it to **ingame** or **offline**, your friends won't be able to send you party invites through the Friends tab.\
**Parameters:**

| NAME   | TYPE   | OPTIONS                 |
| ------ | ------ | ----------------------- |
| status | string | online, ingame, offline |

### setIsInRound

**Description:** Sets your in-game status.\
**Parameters:**

| NAME    | TYPE    |
| ------- | ------- |
| inRound | boolean |

## Server to client

---

### loggedIn

**Description:** Is sent once your **login** message is processed.\
**Parameters:**

| NAME     | TYPE                  |
| -------- | --------------------- |
| userData | { userData: ApiUser } |
