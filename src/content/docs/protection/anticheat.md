---
title: Anticheat
description: Documentation of ZombsRoyale.io's anticheat
sidebar:
    label: Anticheat
    order: 1
---

:::caution[Important]
This section of the documentation is incomplete.
:::

## Introduction

Zombs Royale uses a domestically-developed user mode anticheat solution. The developer responsible for maintaining it is [Jeremiah](https://github.com/jeremiahar).

The anticheat module lives at zombsroyale_Data/Plugins/x86_64/anticheat.dll in the game's installation directory. It is loaded into the process at game's startup by GameAssembly.dll using `kernel32.dll!LoadLibraryA`.

## Obfuscation

Unfortunately, all the interesting parts of the binary which contain the actual AC packet decoding/encoding logic and anti-tamper functionality are heavily obfuscated. We have never found a way to access the original, sensible, assembly of that code.

## Communcation

#### Between Server and Client

All communication between the anticheat and the "anticheat server" happens via the game socket, meaning information is exchanged only while you're in-game. `ACToClientRpc` (incoming) and `ACToServerRpc` (outgoing) are used for this purpose.

#### Between anticheat.dll and GameAssembly.dll

Whenever the client receives a `ACToClientRpc` packet, `AntiCheatService` (class) forwards its payload to anticheat.dll via the `anticheat.dll!AC_SendMessage()` export. It's later decoded and handled appropirately by the obfuscated pits of hell.

Every game tick, `AntiCheatService::Tick()` calls `anticheat.dll!AC_GetNextMessage()` to check if anticheat.dll is ready to send its own message to the server. If 1 is returned, the message is retrieved using `anticheat.dll!AC_GetMessageData()` and `anticheat.dll!AC_GetMessageLength()` and sent to the server as a `ACToServerRpc`.

## Checks

After joining a game, the following checks are performed:

#### Debugger

Try to detect a debugger with `kernel32.dll!IsDebuggerPresent()`. This check runs **once**.

#### AHK

Try to detect AHK scripts with `kernel32.dll!OpenMutexW()` and "AHK Mouse" passed in. This check runs **once**.

#### Noobhammer

Try to detect the centuries old Noobhammer cheat with `user32.dll!FindWindowW()` and "Noobhammer Window Class" and "Noobhammer" passed in. This check runs **every 10 seconds**.

#### Data integrity

Verify integrity of UnityPlayer.dll and GameAssembly.dll by loading their copies into memory from disk and comparing their .text and .il2cpp (in case of GA) sections against the ones in loaded modules. These checks run **every 70 seconds**.

In the past there used to be a non-obfuscated function responsible for performing these comparisons. It was later removed and replaced with a mechanism that loads the raw assembly of that function byte by byte into a region of pure junk inside anticheat.dll, calls that and instantly replaces the code back with junk. Below is said code dumped:

<details>
<summary>Disassembly</summary>

```asm
0:  55                      push   rbp
1:  56                      push   rsi
2:  57                      push   rdi
3:  53                      push   rbx
4:  48 89 e5                mov    rbp,rsp
7:  8b 45 48                mov    eax,DWORD PTR [rbp+0x48]
a:  85 c0                   test   eax,eax
c:  0f 8e 00 00 00 00       jle    0x12
12: 41 89 c2                mov    r10d,eax
15: 44 8b 5d 50             mov    r11d,DWORD PTR [rbp+0x50]
19: 31 f6                   xor    esi,esi
1b: 31 c0                   xor    eax,eax
1d: e9 00 00 00 00          jmp    0x22
22: 0f 1f 04 00             nop    DWORD PTR [rax+rax*1]
26: 48 ff c6                inc    rsi
29: 41 39 f2                cmp    r10d,esi
2c: 0f 84 00 00 00 00       je     0x32
32: 41 0f b6 1c 31          movzx  ebx,BYTE PTR [r9+rsi*1]
37: 41 3a 1c 30             cmp    bl,BYTE PTR [r8+rsi*1]
3b: 0f 84 00 00 00 00       je     0x41
41: 41 8d 3c 33             lea    edi,[r11+rsi*1]
45: 89 3c c1                mov    DWORD PTR [rcx+rax*8],edi
48: 41 0f b6 1c 31          movzx  ebx,BYTE PTR [r9+rsi*1]
4d: 88 5c c1 04             mov    BYTE PTR [rcx+rax*8+0x4],bl
51: 41 0f b6 1c 30          movzx  ebx,BYTE PTR [r8+rsi*1]
56: 88 5c c1 05             mov    BYTE PTR [rcx+rax*8+0x5],bl
5a: 48 8d 78 01             lea    rdi,[rax+0x1]
5e: 48 89 f8                mov    rax,rdi
61: 48 39 d7                cmp    rdi,rdx
64: 0f 82 00 00 00 00       jb     0x6a
6a: e9 00 00 00 00          jmp    0x6f
6f: 31 c0                   xor    eax,eax
71: 5b                      pop    rbx
72: 5f                      pop    rdi
73: 5e                      pop    rsi
74: 5d                      pop    rbp
75: c3                      ret
```

</details>

Anticheat uses `kernel32.dll!ReadFile()` to read files from disk.

---

... more docs to come!
