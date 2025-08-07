---
title: Codec
sidebar:
    order: 3
    badge:
        text: Unfinished
        variant: caution
---

## What is it?

Under the hood, the `Game` class encodes and decodes network packets using `Codec` and its cryptographic component `ZRCrypto` for encryption, decryption and proof of work.

## How can it be used?

Direct access to packet handling mechanisms allows zombslib to be used in projects such as:

-   Zombs Royale Proxy
-   Zombs Royale Private Server (ZRPS)
