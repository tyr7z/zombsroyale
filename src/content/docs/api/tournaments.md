---
title: Tournaments API
description: ZombsRoyale Wiki's ZombsRoyale.io REST API documentation
sidebar:
    label: "Tournaments"
---

<!-- /api/tournament/{0}/whitelist/update?userKey={1} -->

## **POST** /api/tournament/_:tournamentCode:_/whitelist/update

**Description:** (Probably) Makes changes to the tournament whitelist. Requires a body.\
**Query Parameters:**

| NAME    | DESCRIPTION              | REQUIRED |
| ------- | ------------------------ | -------- |
| userKey | Privileged account token | yes      |

<!-- /api/tournament/{0}/join?userKey={1} -->

## **GET** /api/tournament/_:tournamentCode:_/join

**Description:** (Probably) Checks whether or not you are allowed to join the tournament.\
**Query Parameters:**

| NAME    | DESCRIPTION   | REQUIRED |
| ------- | ------------- | -------- |
| userKey | Account token | yes      |

<!-- /api/tournament/{0}/whitelist?userKey={1} -->

## **GET** /api/tournament/_:tournamentCode:_/whitelist

**Description:** (Probably) Returns the whitelist of the tournament.\
**Query Parameters:**

| NAME    | DESCRIPTION              | REQUIRED |
| ------- | ------------------------ | -------- |
| userKey | Privileged account token | yes      |

<!-- /api/tournament/{0}/join?userKey={1} -->

## **GET** /api/_:tournamentCode:_/join

**Description:** Checks tournament status.\
**Query Parameters:**

| NAME    | DESCRIPTION   | REQUIRED |
| ------- | ------------- | -------- |
| userKey | Account token | no       |
