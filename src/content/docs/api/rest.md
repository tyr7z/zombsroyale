---
title: REST API
description: ZombsRoyale.io's REST API reverse-engineering documentation.
---

ZombsRoyale's API is split into two components that each handle different things. Below is the documentation for the HTTPS/REST part.

## **GET** /api
**Description:** Health check.

## **GET** /api/*:tournament-code:*/join

**Description:** Returns tournament status. The tournament is open if the status field is "success".\
**Query Parameters:**
|  NAME   |  DESCRIPTION  | REQUIRED |
|---------|---------------|----------|
| userKey | account token | no       |

## **GET** /api/leaderboard/live

**Description:** Returns ApiLeaderboardResponse object.\
**Query Parameters:**
|   NAME   |                                DESCRIPTION                                | REQUIRED |
|----------|---------------------------------------------------------------------------|----------|
| userKey  | account token                                                             | no       |
| mode     | game mode; options: solo, duo, squad, limited                             | no       |
| time     | options: 24h, 7d, 1m, 1y, all (all time)                                  | no       |
| category | options: wins, kills, kills_per_round, winrate, time_alive, rounds, top10 | no       |

## **GET** /api/shop/available

**Description:** Returns ApiShopAvailableResponse object.\
**Query Parameters:**
|   NAME   |                 DESCRIPTION                  | REQUIRED |
|----------|----------------------------------------------|----------|
| userKey  | account token                                | no       |
| sections | options: all, items, iaps, packs, timedDeals | no       |

## **POST** /api/shop/discord/handle

**Description:** Unknown.\
**Query Parameters:**
|  NAME   |  DESCRIPTION  | REQUIRED |
|---------|---------------|----------|
| userKey | account token | yes      |

## **POST** /api/shop/unity/handle

**Description:** Unknown.\
**Query Parameters:**
|  NAME   |  DESCRIPTION  | REQUIRED |
|---------|---------------|----------|
| userKey | account token | yes      |

## **GET** /api/user/*:user-key:*

**Description:** Returns ApiUser object.

## **POST** /api/user/*:user-key:*/clear-sessions

**Description:** Revokes all user keys.

## **POST** /api/user/*:user-key:*/friend-code/update

**Description:** Changes friend code & charges gems.\
**Query Parameters:**
| NAME | DESCRIPTION | REQUIRED |
|------|-------------|----------|
| name | new name    | yes      |

## **POST** /api/user/*:user-key:*/delete-account

**Description:** Deletes account.\
**Query Parameters:**
|      NAME       |     DESCRIPTION      | REQUIRED |
|-----------------|----------------------|----------|
| confirmationKey | authentication token | yes      |

## **POST** /api/user/*:user-key:*/buy

**Description:** Buys an item from the shop.\
**Query Parameters:**
|    NAME     | DESCRIPTION | REQUIRED |
|-------------|-------------|----------|
| quantity    | item count  | yes      |
| timedDealId | item count  | no*      |
| itemId      | item count  | no*      |
| packId      | item count  | no*      |

\* one of these must me present
