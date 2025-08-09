---
title: Entities
description: Zombslib entity management guide
sidebar:
    order: 4
---

Entities are split into categories. They're communicated to the client on `EnterWorldResponse`. Each category (entity map) has its own attributes (Tick fields). You can take a look at the attributes in your `EnterWorldResponse` callback.

```ts
game.on("EnterWorldResponse", (response: EnterWorldResponse) => {
    for (const entityMap of e.entities!) {
        console.log(entityMap.id, entityMap.defaultTick);
    }
});
```

## Entity map types

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
| PropEntity           | `0xecaa7004` |                        |
| GasEntity            | `0xf15cdbb8` | The zone               |
| NpcEntity            | `0xf4de4be0` | No longer in use       |
| UnknownEntity        | `0xf5cf683e` | No idea                |
| PlayerBuildingEntity | `0xf63a37d6` | e.g. Snow Wall         |

## Entity list

You can obtain the entity list or a specific entity using the following `Game` methods:

-   **getEntityList()**\
    returns the entire entity list
-   **getEntitiesByType(type)**\
    returns all entities in the specified entity map
-   **getEntityByUid(uid)**\
    returns an entity with the specified uid (unique identifier)
-   **getPlayerByName(name)**\
    returns the FIRST player in the list with the specified name

:::note[Note]
Game can only update entity list with **decodeEntityUpdates** set to true (default).
:::
