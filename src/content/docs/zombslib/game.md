---
title: Game
description: Official Zombslib docs
sidebar:
    order: 2
---

## Joining a game

Once Mason Service sends you your server details, the following is all that's needed to make a simple connection to the server:

```ts
mason.on("partyJoinServer", (server: ApiServer) => {
    const game = new Game(server, { displayName: "Example Bot" });
});
```

There are some more options which you can tweak to fit your needs:

| NAME        | TYPE       | DESCRIPTION                                          | DEFAULT                |
| ----------- | ---------- | ---------------------------------------------------- | ---------------------- |
| displayName | string     | Bot's in-game name                                   | "Player"               |
| proxy       | Agent      | Connection proxy                                     | undefined              |
| schemas     | boolean    | Automatically parse JSON data and emit Schema events | true                   |
| rpcMapping  | DumpedData | RPC mapping for the targetted platform & version\*   | _built-in mapping\*\*_ |
| udp         | boolean    | Communicate over UDP where possible                  | false                  |
| autoAckTick | boolean    | Automatically acknowledge UDP ticks                  | true                   |
| ssl         | boolean    | Connect via WSS                                      | true                   |

_\* Dumping RPC mappings is not easy and there is no public tool that can do it for you. In case you need any help, feel free to ask us in our [Discord server](https://discord.gg/E5QWPx6TrX)._ <br/>
_\*\* Built-in mapping version can be checked in zombslib source code ([rpcs.json](https://github.com/creaffy/zombslib/blob/main/rpcs.json))._

After initializing a connection, you must wait for the server to accept your join request and send you an `EnterWorldResponse`.

```ts
game.on("EnterWorldResponse", (response: EnterWorldResponse) => {
    if (response.allowed) {
        game.setPlatformRpc(/* your platform, same as in your RPC mapping */);
        game.startTcpStreamRpc(0, 0);
    }
});
```

The snippet above does two important things:

-   First, it sends a `SetPlatformRpc` to the server, which is required before anything else can be done. Not sure why they designed it that way but whatever.
-   Then, `StartTcpStreamRpc` is sent which informs the server that you are ready to start receiving entity updates.

:::note
If you've enabled the `udp` Game option, you're going to want to send a `StartUdpStreamRpc` instead.
:::

## Controlling the bot

Just like with Mason Service, zombslib handles all decoding/encoding for you and exposes a user-friendly API. Here's a couple very simple examples:

#### Example 1

In this example, every tick (servers run at 64 tps) all the newly created entities, meaning ones which have _just_ appeared in bot's FOV, are printed to the console.

```ts
game.on("EntityUpdate", (u: EntityUpdate) => {
    console.log(u.createdEntities?.flatMap((uid) => game.getEntityByUid(uid)));
});
```

:::note
If you're using UDP, the parameter of the `EntityUpdate` event is going to be of `UdpTick` type instead.
:::

#### Example 2

Here, the bot repeats every chat message it sees (as long as it didn't come from the bot itself).

```ts
game.on("ReceiveChatMessageRpc", (rpc: ReceiveChatMessageRpc) => {
    if (rpc.uid !== game.getMyUid()) {
        game.sendChatMessageRpc("Local", rpc.message);
    }
});
```

## Methods

#### Querying entities

-   **getEntityList()**: `Map<number, NetworkEntity>` <br/>
    Retrives all entities, maps them to their uids.

-   **getEntitiesByType(type: EntityType)**: `Map<number, NetworkEntity>` <br/>
    Retrives entities of given type, maps them to their uids.

-   **getEntityByUid(uid: number)**: `NetworkEntity?` <br/>
    Retrives entity with given uid if it exists.

-   **getPlayerByName(name: string)**: `NetworkEntity?` <br/>
    Retrives player entity with given uid if it exists.

-   **getSelf()**: `NetworkEntity?` <br/>
    Retrives controlled bot entity ("local player") if it exists (it _should_).

-   **getSelfUid()**: `number` <br/>
    Retrives controlled bot's uid.

#### Position translation

-   **toWorldPos(pos: Vector2)**: `Vector2` <br/>
    Translates server position to world (Unity) position.

-   **toServerPos(pos: Vector2)**: `Vector2` <br/>
    Translates Unity position to server position.

#### Other

-   **getEnterWorldResponse()**: `EnterWorldResponse` <br/>
    Retrives lobby join response.

-   **shutdown()**: `void` <br/>
    Disconnects the bot.

-   **send(data: Uint8Array, udp: boolean)**: `void` <br/>
    Sends raw data to the server. Used internally.

#### RPC

All `OutRpc`'s got their own method and should be pretty straightforward to understand. <br/>

Notes:

-   The few RPC's with more than 3 fields are passed as entire objects instead of as separate function args.
-   `InputRpc` can be a partial.
-   Due to `SetSkinRpc` being recognized as an "array rpc", its corresponding method is defined as `setSkinRpc(rpcs: SetSkinRpc[])`.

## Events

-   **RPC's** <br/>
    Event name: `"ExampleRpc"` <br/>
    Parameters: `(rpc: ExampleRpc, extra: RpcExtra)` <br/>

    ```ts
    // interface RpcExtra {
    //     tick?: number;
    //     udpCookie?: number;
    //     transport: "tcp" | "udp";
    // }
    game.on("KillFeedRpc", (rpc: KillFeedRpc, extra: RpcExtra) => ...);
    ```

-   **RPC's (any)** <br/>
    Event name: `"Rpc"` <br/>
    Parameters: `(name: string, rpc: object, extra: RpcExtra)` <br/>

    ```ts
    // This will trigger on any RPC. Let's say that you receive an AirDropRpc:
    // name => "AirDropRpc"
    // rpc  => type AirDropRpc
    game.on("Rpc", (name: string, rpc: object, extra: RpcExtra) => ...);
    ```

-   **Schemas** <br/>
    Event name: `"SchemaExample"` <br/>
    Parameters: `(data: ExampleRpc)` or `(data: SchemaExample[])` (majority) <br/>

    ```ts
    game.on("SchemaGeneral", (data: SchemaGeneral) => ...);
    game.on("SchemaWeapons", (data: SchemaWeapon[]) => ...);
    ```

-   **Any packet** <br/>
    Event name: `"RawData"` <br/>
    Parameters: `(data: Uint8Array, transport: "tpc" | "udp", packetId: PacketId)` <br/>

-   **Entity update** <br/>
    Event name: `"EntityUpdate"` <br/>
    Parameters (TCP): `(data: EntityUpdate, packetId: PacketId)` <br/>
    Parameters (UDP): `(data: UdpTick, packetId: PacketId)` <br/>

-   **Lobby join response** <br/>
    Event name: `"EnterWorldResponse"` <br/>
    Parameters: `(response: EnterWorldResponse)` <br/>

-   **UDP connect response** <br/>
    Event name: `"UdpConnectResponse"` <br/>
    Parameters: `(response: UdpConnectResponse)` <br/>

:::caution[Important]
RPC reference is not yet available in our documentation. Contact us if you've got any questions.
:::

## Entity types

`EntityType` enum:

| NAME                 | ID           | NOTES                  |
| -------------------- | ------------ | ---------------------- |
| ZombieEntity         | `0x0ed7fd27` |                        |
| SprayEntity          | `0x1e1837cc` |                        |
| PortalEntity         | `0x2293598d` |                        |
| PlayerEntity         | `0x4254ae62` | Includes bots          |
| CrystalEntity        | `0x58eafdbd` | Crystal Clash crystals |
| VehicleEntity        | `0x5d0b456b` | e.g. Hoverboard        |
| PhysicsEntity        | `0x8e187e23` | Likely unused          |
| PlaneEntity          | `0x8fe5d35b` |                        |
| ItemEntity           | `0xa7ecd754` |                        |
| ProjectileEntity     | `0xb6cebbaa` |                        |
| BuildingEntity       | `0xdf853d95` |                        |
| PropEntity           | `0xecaa7004` | e.g. Bush              |
| GasEntity            | `0xf15cdbb8` | The zone               |
| NpcEntity            | `0xf4de4be0` | No longer in use       |
| UnknownEntity        | `0xf5cf683e` | No idea                |
| PlayerBuildingEntity | `0xf63a37d6` | e.g. Snow Wall         |
