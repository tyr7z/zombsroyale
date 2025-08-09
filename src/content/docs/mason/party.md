---
title: Mason Party Events
description: ZombsRoyale Wiki's Mason Service documentation
sidebar:
    label: Party
---

Parties can have 4 members at most. They can be created with a random or a custom code and joined either with a code or via in-game party invites from friends.

## Client to server

---

### createParty

**Description:** Creates a brand new party on the network.

### joinParty

**Description:** Joins an existing party or creates a new one with a given code.\
**Parameters:**

| NAME     | TYPE   | NOTES                                                                                   |
| -------- | ------ | --------------------------------------------------------------------------------------- |
| partyKey | string | If a party with the given key does not exist, a brand new one is created with that code |

### leaveParty

**Description:** Leaves the party you're in.

### setReady

**Description:** Sets your ready status to ready. All party members must be ready in order to enter matchmaking.\
**Parameters:**

| NAME  | TYPE    |
| ----- | ------- |
| ready | boolean |

### setPartyVersion

**Description:** Sets the game version of the party. Only the party leader can change this.\
**Parameters:**

| NAME    | TYPE   | NOTES      |
| ------- | ------ | ---------- |
| version | string | e.g. 5.8.9 |

### setPartyRegion

**Description:** Sets the region of the party. Only the party leader can change this. Using **vultr-frankfurt** has the same effect as **linode-frankfurt**, same with **vultr-singapore** and **linode-singapore**.\
**Parameters:**

| NAME   | TYPE   | OPTIONS                                                                                                  |
| ------ | ------ | -------------------------------------------------------------------------------------------------------- |
| region | string | vultr-frankfurt, vultr-miami, vultr-la, vultr-singapore, i3d-oceania, linode-frankfurt, linode-singapore |

### setPartyGameMode

**Description:** Sets the game mode of the party. Only the party leader can change this. Setting this to anything other than what's listed in the options column will put you in the LTM lobby.\
**Parameters:**

| NAME     | TYPE   | OPTIONS                                                                                |
| -------- | ------ | -------------------------------------------------------------------------------------- |
| gameMode | string | Solo, Duo, Squad, Limited, CrystalClash, Hangout, PrivateZombieDuo, PrivateZombieSquad |

### setPartyAutoFill

**Description:** Sets the auto-fill status of the party. Only the party leader can change this. If this option is enabled, the party will be filled with random players once in game.\
**Parameters:**

| NAME     | TYPE    |
| -------- | ------- |
| autoFill | boolean |

### setPartyTournamentCode

**Description:** Sets the tournament code of the party. Only the party leader can change this.\
**Parameters:**

| NAME | TYPE   | NOTES                                                                                                           |
| ---- | ------ | --------------------------------------------------------------------------------------------------------------- |
| code | string | A list of all known codes can be found [here](https://gist.github.com/creaffy/26e74c6347b3c0dc1d494de9f9df0069) |

### restartPartyMatchmaking

**Description:** Restarts party's matchmaking. This can be used to enter the party into matchmaking without being the leader.

### sendPartyInvite

**Description:** Sends an invite to your party to a given user.\
**Parameters:**

| NAME   | TYPE   | NOTES                                                                                                                                                                            |
| ------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| userId | string | Despite user ID being a number, this parameter is a string, but that's not even the worst part. For some reason it's a stringified floating-point number! Example: "694202137.0" |

## Server to client

---

### partyInviteReceived

**Description:** Is sent once you receive an invite to a party.\
**Parameters:**

| NAME        | TYPE           |
| ----------- | -------------- |
| partyInvite | ApiPartyInvite |

### partyData

**Description:** Is sent once you join a party.\
**Parameters:**

| NAME  | TYPE     |
| ----- | -------- |
| party | ApiParty |

### partyPlayerJoined

**Description:** Is sent once a player joins your party.\
**Parameters:**

| NAME   | TYPE           |
| ------ | -------------- |
| player | ApiPartyPlayer |

### partyVersionUpdated

**Description:** Is sent once party version changes.\
**Parameters:**

| NAME    | TYPE   |
| ------- | ------ |
| version | string |

### partyMetadataUpdated

**Description:** Is sent once party tournamrnt code is changed.\
**Parameters:**

| NAME     | TYPE   | NOTES                        |
| -------- | ------ | ---------------------------- |
| metadata | string | Stringified ApiPartyMetadata |

### partyGameModeUpdated

**Description:** Is sent once party game mode changes.\
**Parameters:**

| NAME     | TYPE   |
| -------- | ------ |
| gameMode | string |

### partyJoinServer

**Description:** Is sent once matchmaking finishes.\
**Parameters:**

| NAME   | TYPE      |
| ------ | --------- |
| server | ApiServer |

### partyStateUpdated

**Description:** Is sent once party state changes. (waiting, matchmaking, ingame)\
**Parameters:**

| NAME  | TYPE   |
| ----- | ------ |
| state | string |

### partyLeft

**Description:** Is sent once you leave the party.

### partyPlayerUpdated

**Description:** Is sent once one of the party members is updated. (e.g. their ready status changes)\
**Parameters:**

| NAME   | TYPE           |
| ------ | -------------- |
| player | ApiPartyPlayer |

### partyPlayerLeft

**Description:** Is sent once a player leaves the party.\
**Parameters:**

| NAME   | TYPE           |
| ------ | -------------- |
| player | ApiPartyPlayer |

### partyAutofillUpdated

**Description:** Is sent once party auto-fill status changes.\
**Parameters:**

| NAME     | TYPE    |
| -------- | ------- |
| autoFill | boolean |

### partyRegionUpdated

**Description:** Is sent once party region changes.\
**Parameters:**

| NAME   | TYPE   |
| ------ | ------ |
| region | string |
