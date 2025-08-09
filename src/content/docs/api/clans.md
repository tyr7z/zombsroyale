---
title: Clans
sidebar:
    badge:
        text: Obsolete
        variant: danger
---

<!-- /api/clan/available?userKey={1} -->

## ~~**GET** /api/clan/available~~

**Description:** Obsolete. Gets available clans. Returns ApiClanAvailableResponse object.\
**Query Parameters:**

| NAME    | DESCRIPTION   | REQUIRED |
| ------- | ------------- | -------- |
| userKey | Account token | no       |

<!-- /api/clan/create?userKey={1} -->

## ~~**POST** /api/clan/create~~

**Description:** Obsolete. Creates a clan.\
**Query Parameters:**

| NAME        | DESCRIPTION      | REQUIRED |
| ----------- | ---------------- | -------- |
| userKey     | Account token    | yes      |
| tag         | 3-letter tag     | yes      |
| name        | Clan name        | yes      |
| description | Clan description | no       |

<!-- /api/clan/{0}/invite?userKey={1} -->

## ~~**POST** /api/clan/_:clanId:_/invite~~

**Description:** Obsolete. Invites a user to a clan.\
**Query Parameters:**

| NAME    | DESCRIPTION   | REQUIRED |
| ------- | ------------- | -------- |
| userKey | Account token | yes      |
| userId  | User ID       | yes      |

<!-- /api/clan/{0}/join?userKey={1} -->

## ~~**POST** /api/clan/_:clanId:_/join~~

**Description:** Obsolete. Joins a clan you were previously invited to.\
**Query Parameters:**

| NAME    | DESCRIPTION   | REQUIRED |
| ------- | ------------- | -------- |
| userKey | Account token | yes      |
| clanId  | Clan ID       | yes      |

<!-- /api/clan/{0}/leave?userKey={1} -->

## ~~**POST** /api/clan/_:clanId:_/leave~~

**Description:** Obsolete. Leaves a clan.\
**Query Parameters:**

| NAME    | DESCRIPTION   | REQUIRED |
| ------- | ------------- | -------- |
| userKey | Account token | yes      |
