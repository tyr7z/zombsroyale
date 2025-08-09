---
title: Miscellaneous API
description: ZombsRoyale Wiki's ZombsRoyale.io REST API documentation
sidebar:
    label: "Miscellaneous"
---

<!-- /api/quest/available?userKey={0} -->

## **GET** /api/quest/available

**Description:** Returns ApiQuestAvailableResponse object.\
**Query Parameters:**

| NAME    | DESCRIPTION   | REQUIRED |
| ------- | ------------- | -------- |
| userKey | Account token | no       |

## **GET** /api

**Description:** Health check.

## **POST** /api/metrics/update

**Description:** Does nothing at all. Requires a body.\
**JSON Body:**

| KEY           | DESCRIPTION |
| ------------- | ----------- |
| webgl_version | "webgl2"    |

## **GET** /user/logout

**Description:** Logs out on the Web client by returning HTML code that deletes the `userKey` cookie client-side.

<!-- /api/config?platform={0}&version={1}&userKey={2}&isPolledUpdate={3} -->

## **GET** /api/config

**Description:** Returns ApiGetConfigResponse object.\
**Query Parameters:**

| NAME           | DESCRIPTION                         | REQUIRED |
| -------------- | ----------------------------------- | -------- |
| platform       | Options: web, windows, android, ios | no       |
| version        | Client version                      | no       |
| version2       | Anticheat version                   | no       |
| userKey        | Account token                       | no       |
| isPolledUpdate | Polled                              | no       |

<!-- /api/leaderboard/live?userKey={0}&mode={1}&time={2}&category={3} -->

## **GET** /api/leaderboard/live | /api/leaderboard

**Description:** Returns ApiLeaderboardResponse object.\
**Query Parameters:**

| NAME     | DESCRIPTION                                                               | REQUIRED |
| -------- | ------------------------------------------------------------------------- | -------- |
| userKey  | Account token                                                             | no       |
| mode     | Game mode; options: solo, duo, squad, limited                             | no       |
| time     | Options: 24h, 7d, 1m, 1y, all (all time)                                  | no       |
| category | Options: wins, kills, kills_per_round, winrate, time_alive, rounds, top10 | no       |

<!-- /api/poll/available?userKey={0} -->

## **GET** /api/poll/available

**Description:** Returns ApiPollAvailableResponse object.\
**Query Parameters:**

| NAME    | DESCRIPTION   | REQUIRED |
| ------- | ------------- | -------- |
| userKey | Account token | yes      |

<!-- /api/poll/vote/{0}?userKey={1} -->

## **POST** /api/poll/vote/_:pollId:_

**Description:** Votes in a poll.\
**Query Parameters:**

| NAME     | DESCRIPTION     | REQUIRED |
| -------- | --------------- | -------- |
| userKey  | Account token   | yes      |
| optionId | Selected option | yes      |
