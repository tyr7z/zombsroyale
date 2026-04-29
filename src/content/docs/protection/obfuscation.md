---
title: Obfuscation
description: Documentation of obfuscation in ZombsRoyale.io
sidebar:
    label: Obfuscation
    order: 2
---

## Beebyte

Since game version 3.3.2, ZR uses a (discontinued) Unity plugin called **Beebyte Obfuscator** to obfuscate type, field and method names. All mentioned above get renamed to a random string of 11 uppercase english alphabet letters (e.g. ODDALKCPMIB). These names get re-randomized each update and there is no way to recover the original ones\*.

_\* Types deriving from UnityEngine.MonoBehaviour do not have their names obfuscated. There are also other exceptions which I can't explain._

## Field Shuffling

Version 5.9.9 randomized layouts of all RPC types and the `Tick` class. Since it is also the latest game version at the time of writing this, I do not know if those layouts are going to be randomized with each next update or not.
