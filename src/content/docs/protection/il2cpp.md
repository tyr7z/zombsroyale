---
title: IL2CPP Fork
description: ZombsRoyale Wiki
sidebar:
    label: IL2CPP Fork
    order: 0
---

:::note
If you're unfamiliar with what IL2CPP is, we strongly recommend learning about it and about modding/hacking it before reading this article.
:::

## Introduction

For a number of years now, ZR has been running on a forked IL2CPP system with changes made specifically to combat cheats. Initially, it was meant to remove compatibility with [MelonLoader](https://github.com/lavagang/melonloader) and [BepInEx](https://github.com/bepinex/bepinex) which most hacks/mods at that time used as a framework. Over time more and more parts of the codebase were edited to patch next generations of cheats taking advantage of IL2CPP's quirks.

## Metadata file encryption

If you know anything about IL2CPP, you know about the global-metadata.dat\* file and that it contains all sorts of useful information like type details, method addresses and so on. If you know a little bit more then you might recall a structure called `Il2CppGlobalMetadataHeader` sitting at the very top (duh!) of that file. It is essentiall for decoding the file properly.

To make it harder for modders to access what's hidden inside the file, two layers of encryption were applied onto it.

_\* In Zombs Royale, global-metadata.dat exists under the questionable name dkmsblob and can be found in its usual location at zombsroyale_Data/il2cpp_data/Metadata/dkmsblob._

#### Layer 1 - full file encryption

<details>
<summary>
Header key
</summary>

```
FA 3E BF F2 E5 11 7E 5F 50 BC E7 F6 79 D7 92 FC 98 C6 75 E8 99 FF 10 66 55 31 50 09 37 05 11 5E 4C 9F 81 1D 55 22 2D 53 11 73 87 4F 92 81 CE 6F AB B9 6D A3 CD 29 AF FB 2E 59 9C B3 C1 75 28 4B AA 89 A9 D9 56 74 A6 75 99 21 D6 25 77 C0 D4 D4 63 E0 5D 7D 97 6D 90 22 EF 85 EF FC 85 79 91 9C 4A 3C A4 09 D7 F4 19 37 13 F7 0A AC 53 8A 83 6D 85 C8 50 E1 17 AB B3 3D F8 86 E9 D0 84 A9 F0 1F 90 3A DA 3A 1B CB FC 6E C7 26 6A 9F 62 E4 CF 65 02 81 77 BD 28 B0 84 9F 89 67 10 50 0B 48 B2 69 07 EB 1B 18 AF 48 52 BA CC E2 1A F1 41 13 DA 13 B7 84 CE 02 32 32 F6 DF B5 3B B1 B4 BA AB 62 7E 73 00 98 77 C8 B7 B6 B9 2F BD F1 46 95 93 5E 76 8C FD 99 87 7A AF 37 D5 F4 3B 63 73 97 9D FF 20 7F 9B 7D 40 7B 63 4A 00 CD 14 D3 74 41 B0 49 21 DD 3B 27 BC 11 DB 04 C4 C9 C2 82 8C 53 42 22 92
```

</details>

The dkmsblob file is split into regions of `8192` (`0x2000`) bytes each. The first section being `0x0000`-`0x1FFF`, will have a XOR operation performed on each byte with the key `0xFA`, which is the first byte in the header key above. The second section being `0x2000`-`0x3FFF`, will have a XOR operation performed on each byte with the key `0x3E`, which is the second byte in the header key. This pattern repeats until EOF is reached. When the end of the header key is reached it just loops back to the beginning. However, after each XOR operation on a byte of the metadata file, you must add `0x48` to the result (this is constant and unchanging).

These operations are performed by the metadata loader while loading the file into memory. You can skip this decryption step entirely by dumping the memory region.

#### Layer 2 - header encryption

Each field of the global metadata header is encrypted with its own unique 4-byte XOR key. Whenever the game needs to access one of those fields, it fetches the encrypted value and then decrypts it with a hard-coded key without making changes to the header.

For example, this snippet from the **stock** IL2CPP source code:

```c
s_MetadataImagesCount = s_GlobalMetadataHeader->imagesSize / sizeof(Il2CppImageDefinition);
```

turns into this in ZR's fork:

```c
s_MetadataImagesCount = (s_GlobalMetadataHeader->imagesSize ^ 0x2555C80DuLL) / 0x28;
```

These keys are different for each field and change across game versions. There is not one place in the binary where all of the keys are stored for an easy dump.

## Static data pointer encryption

Pointers to class static fields data (`Il2CppClass.static_fields`) are also encrypted with two layers. This encryption is performed during class initialization (`il2cpp::vm::LayoutFieldsLocked()`) and similarly to the metadata header encryption mechanism, it is a copy-based encryption.

This example snippet shows how the game accesses static fields data:

```c
statics = (Game_StaticFields*)(DecryptPointer(Game_TypeInfo->static_fields, Game_TypeInfo->rgctx_data) ^ 0x5B4720BC);
network = statics->NetworkV1;
```

First, `DecryptPointer()` (that's just my name for it) is called to perform the first layer of decryption. It's the same function that's used for encrypting the pointer in the first place. Then the output is xorred with a hardcoded key (`0x5B4720BC`). This key is universal but changes across game versions.

## Return address checks

Some of GameAssembly.dll exports include logic to check if the caller is "legit" and return nonsense if it isn't. I won't go into great detail about this because, frankly, I don't know enough to do so.

This pseudocode very roughly shows how the protected exports look like:

```c
whatever_t il2cpp_some_export(...)
{
    if _ReturnAddress() not in UnityPlayer.dll or GameAssembly.dll then
        return nonsense D:

    result = InternalIl2CppFunction(...)

    // again (for some reason?)
    if _ReturnAddress() not in UnityPlayer.dll or GameAssembly.dll then
        return nonsense D:
    else
        return result :D
}
```

Usually you're fine just sigging the "`InternalIl2CppFunction()`" and calling it directly instead of using the export.

## Removed exports

The IL2CPP fork removes functionality from a couple GameAssembly.dll exports, including `il2cpp_capture_memory_snapshot()` which used to be used by cheaters to dump type information at runtime without having to decrypt global-metadata.dat.
