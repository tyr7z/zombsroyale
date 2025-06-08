---
title: Packet IDs
description: ZombsRoyale Wiki's Packet IDs reverse-engineering documentation.
---

The packet IDs are usually the first values ([`Uint8`](https://zombsroyale.wiki/reference/rpc-parameter-types/#uint8-8)) of the packets.

The `e_PacketId` enum represents different packet identifiers used in the Zombs Royale server protocol. Each packet ID corresponds to a specific type of communication or data exchange between the client and the server. Below is the documentation for each packet ID:

## PACKET_ENTITY_UPDATE (0)
- **Value:** 0 (0x00)
- **Description:** Represents a packet for updating entity information.

## PACKET_PLAYER_COUNTER_UPDATE (1)
- **Value:** 1 (0x01)
- **Description:** Represents a packet for updating player counters.

## PACKET_SET_WORLD_DIMENSIONS (2)
- **Value:** 2 (0x02)
- **Description:** Represents a packet for setting world dimensions.

## PACKET_INPUT (3)
- **Value:** 3 (0x03)
- **Description:** Represents a packet for input data exchange.

## PACKET_ENTER_WORLD (4)
- **Value:** 4 (0x04)
- **Description:** Represents a packet for entering the world.

## PACKET_PING (7)
- **Value:** 7 (0x07)
- **Description:** Represents a packet for ping communication.

## PACKET_RPC (9)
- **Value:** 9 (0x09)
- **Description:** Represents a packet for Remote Procedure Call (RPC) communication.

## PACKET_UDP_CONNECT (10)
- **Value:** 10 (0x0A)
- **Description:** Represents a packet for UDP connection establishment.

## PACKET_UDP_TICK (11)
- **Value:** 11 (0x0B)
- **Description:** Represents a packet for UDP tick communication.

## PACKET_UDP_ACK_TICK (12)
- **Value:** 12 (0x0C)
- **Description:** Represents a packet for acknowledging UDP ticks.

## PACKET_UDP_PONG (13)
- **Value:** 13 (0x0D)
- **Description:** Represents a packet for UDP pong communication.

## PACKET_UDP_TICK_WITH_COMPRESSED_UIDS (14)
- **Value:** 14 (0x0E)
- **Description:** Represents a packet for UDP tick with compressed UIDs.

## PACKET_UDP_FRAGMENT (15)
- **Value:** 15 (0x0F)
- **Description:** Represents a packet for UDP fragmentation.

## PACKET_UDP_CONNECT_1300 (16)
- **Value:** 16 (0x10)
- **Description:** Represents a packet for UDP connection with a specific size (1300).

## PACKET_UDP_CONNECT_500 (17)
- **Value:** 17 (0x11)
- **Description:** Represents a packet for UDP connection with a specific size (500).

## PACKET_UDP_RPC (-1)
- **Value:** -1 (0xFFFFFFFF)
- **Description:** Represents a special packet for UDP Remote Procedure Call (RPC) communication.

---

*Note: This documentation provides a brief description of each packet ID and its associated value.*
