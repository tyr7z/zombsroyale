---
title: Mason API
description: ZombsRoyale Wiki's Mason API reverse-engineering documentation.
---

ZombsRoyale's API is split into two components that each handle different things. This is the documentation for the so called "mason" part.

# *Who* is Mason?

Mason is the API part of ZombsRoyale in charge of handling friends, parties and lobby joining. A important detail about Mason is that it acts as a dispenser of ingame server connection data for clients to join matches.

Mason is a [Socket.IO](https://socket.io/) based connection through WebSockets on top of TCP, so its API is adapted to these events.

## The events:

### **Client to server:**

#### `login`
#### `logout`
#### `refresh`
#### `setPlatform`
#### `setVersion`
#### `setName`
#### `setStatus`
#### `createParty`
#### `joinParty`
#### `leaveParty`
#### `setReady`
#### `setPartyVersion`
#### `setPartyRegion`
#### `setPartyGameMode`
#### `setPartyAutoFill`
#### `setPartyTournamentCode`
#### `setIsInRound`
#### `restartPartyMatchmaking`
#### `sendPartyInvite`
#### `sendFriendRequest`
#### `acceptFriendRequest`
#### `rejectFriendRequest`
#### `deleteFriend`
#### `sendPrivateMessage`
#### `sendClanMessage`

### **Server to client:**

#### `clansData`
#### `partyInviteReceived`
#### `partyData`
#### `friendsData`
#### `partyStateUpdated`
#### `partyLeft`
#### `partyPlayerJoined`
#### `partyVersionUpdated`
#### `partyMetadataUpdated`
#### `partyGameModeUpdated`
#### `privateMessageReceived`
#### `friendUpdated`
#### `partyJoinServer`
#### `friendRequestRejected`
#### `partyPlayerUpdated`
#### `friendDeleted`
#### `friendRequests`
#### `partyPlayerLeft`
#### `clanMessageReceived`
#### `loggedIn`
#### `partyAutofillUpdated`
#### `friendRequestReceived`
#### `partyRegionUpdated`

