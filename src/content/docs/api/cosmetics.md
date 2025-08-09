---
title: Cosmetics API
description: ZombsRoyale Wiki's ZombsRoyale.io REST API documentation
sidebar:
    label: "Cosmetics"
---

<!-- /api/reward/tracks/{0}/buy?userKey={0} -->

## **POST** /api/reward/tracks/_:trackId:_/buy

**Description:** Buys a track.\
**Query Parameters:**

| NAME    | DESCRIPTION   | REQUIRED |
| ------- | ------------- | -------- |
| userKey | Account token | yes      |

<!-- /api/reward/tracks/{0}/skip?userKey={0} -->

## **POST** /api/reward/tracks/_:trackId:_/skip

**Description:** Skips a track.\
**Query Parameters:**

| NAME    | DESCRIPTION   | REQUIRED |
| ------- | ------------- | -------- |
| userKey | Account token | yes      |
| tiers   | Tiers to skip | yes      |

<!-- /api/reward/tracks?userKey={0} -->

## **GET** /api/reward/tracks

**Description:** Returns `tracks` object made of ApiRewardTrack objects.\
**Query Parameters:**

| NAME    | DESCRIPTION   | REQUIRED |
| ------- | ------------- | -------- |
| userKey | Account token | no       |

<!-- /api/shop/available?userKey={0}&sections={1} -->

## **GET** /api/shop/available

**Description:** Returns ApiShopAvailableResponse object.\
**Query Parameters:**

| NAME     | DESCRIPTION                                  | REQUIRED |
| -------- | -------------------------------------------- | -------- |
| userKey  | Account token                                | no       |
| sections | Options: all, items, iaps, packs, timedDeals | no       |

## **POST** /api/shop/discord/handle

**Description:** Unknown.\
**Query Parameters:**

| NAME    | DESCRIPTION   | REQUIRED |
| ------- | ------------- | -------- |
| userKey | Account token | yes      |

## **POST** /api/shop/unity/handle

**Description:** Unknown.\
**Query Parameters:**

| NAME    | DESCRIPTION   | REQUIRED |
| ------- | ------------- | -------- |
| userKey | Account token | yes      |

<!-- /api/reward/tracks/mid-season/buy?userKey={0} -->

## ~~**POST** /api/reward/tracks/mid-season/buy~~

**Description:** Obsolete.\
**Query Parameters:**

| NAME    | DESCRIPTION   | REQUIRED |
| ------- | ------------- | -------- |
| userKey | Account token | yes      |

<!-- /api/reward/tracks/mid-season?userKey={0} -->

## ~~**GET** /api/reward/tracks/mid-season~~

**Description:** Obsolete.\
**Query Parameters:**

| NAME    | DESCRIPTION   | REQUIRED |
| ------- | ------------- | -------- |
| userKey | Account token | no       |

---

:::note[Note]
Refer to [User API docs](https://zombsroyale.wiki/api/user/) to find information on making purchases.
:::
