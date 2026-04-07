---
title: Codec
description: Official zombslib docs
sidebar:
    order: 3
---

:::caution[Important]
This section of the documentation is incomplete.
:::

## Introduction

The `Codec` class insisde of Zombslib is the main packet decoding/encoding interface. It is what `Game` uses internally to deal with raw data.

## Coverage

| ID  | Packet type               | Encode | Decode | Codec method                  |
| --- | ------------------------- | ------ | ------ | ----------------------------- |
| 0   | EntityUpdate              | ✅     | ✅     | de/encodeEntityUpdate()       |
| 1   | ~~PlayerCounterUpdate~~   | ➖     | ➖     |                               |
| 2   | ~~SetWorldDimensions~~    | ➖     | ➖     |                               |
| 3   | ~~Input~~                 | ➖     | ➖     |                               |
| 4   | EnterWorld (req)          | ✅     | ✅     | de/encodeEnterWorldRequest()  |
| 4   | EnterWorld (res)          | ✅     | ✅     | de/encodeEnterWorldResponse() |
| 7   | Ping                      | ❌     | ❌     |                               |
| 9   | Rpc                       | ✅     | ✅     | de/encodeRpc()                |
| 10  | UdpConnect (req)          | ✅     | ✅     | de/encodeUdpConnectRequest()  |
| 10  | UdpConnect (res)          | ✅     | ✅     | de/encodeUdpConnectResponse() |
| 11  | UdpTick                   | ✅     | ✅     | de/encodeUdpTick()            |
| 12  | UdpAckTick                | ✅     | ✅     | de/encodeUdpAckTick()         |
| 13  | UdpPong                   | ❌     | ❌     |                               |
| 14  | UdpTickWithCompressedUids | ✅     | ✅     | de/encdodeUdpTick()           |
| 15  | UdpFragment               | ✅     | ✅     | de/encodeUdpFragment()        |
| 16  | UdpConnect1300 (req)      | ✅     | ✅     | de/encodeUdpConnectRequest()  |
| 16  | UdpConnect1300 (res)      | ✅     | ✅     | de/encodeUdpConnectResponse() |
| 17  | UdpConnect500 (req)       | ✅     | ✅     | de/encodeUdpConnectRequest()  |
| 17  | UdpConnect500 (res)       | ✅     | ✅     | de/encodeUdpConnectResponse() |
| -1  | UdpRpc                    | ✅     | ✅     | de/encodeRpc()                |

## Cryptography

Documentation for `ZRCrypto` class, as well as the rest of `Codec` is going to be completed in a later time frame. <br/>

## Unknowns

In case the RPC mapping, for whatever reason, doesn't contain a descriptor for an RPC with a given namehash, the following fallbacks are used:

-   Rpc name: `R_0x{rpc-namehash-hex}`
-   Rpc parameter name: `P_0x{param-namehash-hex}`

The same parameter name fallback is used when a descriptor exists but the needed parameter can't be found in it.

Analgoically, entity map attributes (Tick fields) unaccounted for by `Codec.getAttributeName()`, use a similar convention:

-   Attribute name: `A_0x{attr-id-hex}`
