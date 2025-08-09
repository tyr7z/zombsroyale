---
title: User API
description: ZombsRoyale Wiki's ZombsRoyale.io REST API documentation
sidebar:
    label: "User"
---

## **GET** /api/user/_:userKey:_

**Description:** Returns ApiUser object.

## **POST** /api/user/_:userKey:_/buy

**Description:** Buys an item or pack (chest) from the shop.\
**Query Parameters:**

| NAME        | DESCRIPTION     | REQUIRED |
| ----------- | --------------- | -------- |
| quantity    | Item count      | yes      |
| timedDealId | Deal ID         | no\*     |
| itemId      | Item ID         | no\*     |
| packId      | Pack (chest) ID | no\*     |

\* one of these must me present

## **POST** /api/user/_:userKey:_/clear-sessions

**Description:** Revokes all user keys.

<!-- /api/user/{0}/delete-account?confirmationKey={1} -->

## **POST** /api/user/_:userKey:_/delete-account

**Description:** Deletes account.\
**Query Parameters:**

| NAME            | DESCRIPTION        | REQUIRED |
| --------------- | ------------------ | -------- |
| confirmationKey | Another user token | yes      |

## **POST** /api/user/_:userKey:_/friend-code/update

**Description:** Changes friend code & charges gems.\
**Query Parameters:**

| NAME | DESCRIPTION | REQUIRED |
| ---- | ----------- | -------- |
| name | New name    | yes      |

## **POST** /api/user/_:userKey:_/pack/open

**Description:** Opens an available chest (pack).\
**Query Parameters:**

| NAME   | DESCRIPTION | REQUIRED |
| ------ | ----------- | -------- |
| packId | Pack ID     | yes      |

## **GET** /api/user/_:userKey:_/rewards

**Description:** Returns ApiUserRewardsResponse object.

## **POST** /api/user/_:userKey:_/rewards/claim

**Description:** Claims a reward.\
**Query Parameters:**

| NAME | DESCRIPTION                                                           | REQUIRED |
| ---- | --------------------------------------------------------------------- | -------- |
| type | Options: first, gift, recurring, bonus, instagram, nitro, coming_soon | yes      |

<!-- /api/profile/{0}?userKey={1} -->

## **GET** /api/profile/_:friendCode:_

**Description:** Returns ApiProfileResponse object.\
**Query Parameters:**

| NAME    | DESCRIPTION   | REQUIRED |
| ------- | ------------- | -------- |
| userKey | Account token | yes\*    |

\* used not to be authenticated
