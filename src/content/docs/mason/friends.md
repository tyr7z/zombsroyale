---
title: Mason Friends Events
description: ZombsRoyale Wiki's Mason Service documentation
sidebar:
    label: Friends
---

## Client to server

---

### sendFriendRequest

**Description:** Sends a friend request.\
**Parameters:**

| NAME       | TYPE   |
| ---------- | ------ |
| friendCode | string |

### acceptFriendRequest

**Description:** Accepts a friend request.\
**Parameters:**

| NAME       | TYPE   |
| ---------- | ------ |
| friendCode | string |

### rejectFriendRequest

**Description:** Rejects a friend request.\
**Parameters:**

| NAME       | TYPE   |
| ---------- | ------ |
| friendCode | string |

### deleteFriend

**Description:** Deletes a friend request.\
**Parameters:**

| NAME     | TYPE   | NOTES                                                                                             |
| -------- | ------ | ------------------------------------------------------------------------------------------------- |
| friendId | string | Friend's user ID represented as a stringified float. For some reason.<br/> Example: “694202137.0” |

### ~~sendPrivateMessage~~

**Description:** Obsolete. Sends a private message to a friend.\
**Parameters:**

| NAME     | TYPE   |
| -------- | ------ |
| friendId | string |
| message  | string |

## Server to client

---

### friendsData

**Description:** Is sent during initialization. Contains friends list.\
**Parameters:**

| NAME    | TYPE        |
| ------- | ----------- |
| friends | ApiFriend[] |

### friendRequests

**Description:** Is sent during initialization. Contains friend requests list.\
**Parameters:**

| NAME           | TYPE               |
| -------------- | ------------------ |
| friendRequests | ApiFriendRequest[] |

### friendUpdated

**Description:** Is sent once a friend is update.\
**Parameters:**

| NAME   | TYPE        |
| ------ | ----------- |
| friend | ApiFriend[] |

### friendRequestRejected

**Description:** Is sent once you reject a friend request.\
**Parameters:**

| NAME          | TYPE             |
| ------------- | ---------------- |
| friendRequest | ApiFriendRequest |

### friendDeleted

**Description:** Is sent once you delete a friend.\
**Parameters:**

| NAME   | TYPE      |
| ------ | --------- |
| friend | ApiFriend |

### friendRequestReceived

**Description:** Is sent once you receive a friend request.\
**Parameters:**

| NAME          | TYPE             |
| ------------- | ---------------- |
| friendRequest | ApiFriendRequest |

### ~~privateMessageReceived~~

**Description:** Obsolete. Is sent once your friend sends you a private message.\
**Parameters:** Unknown.
