---
title: REST API
description: ZombsRoyale Wiki's REST API reverse-engineering documentation.
---

ZombsRoyale's API is split into two components that each handle different things. Below is the documentation for the HTTPS/REST part.

## **GET** /api
**Description:** Health check.

## **GET** /api/metrics/update
**Description:** Does nothing at all.

## **GET** /user/logout
**Description:** Logs out on the Web client by returning HTML code that deletes the `userKey` cookie client-side.

<!-- /api/config?platform={0}&version={1}&userKey={2}&isPolledUpdate={3} -->
## **GET** /api/config
**Description:** Returns ApiGetConfigResponse object.\
**Query Parameters:**
|      NAME      |             DESCRIPTION             | REQUIRED |
|----------------|-------------------------------------|----------|
| platform       | options: web, windows, android, ios | no       |
| version        | client version                      | no       |
| version2       | anticheat version                   | no       |
| userKey        | account token                       | no       |
| isPolledUpdate | polled                              | no       |

<!-- /api/leaderboard/live?userKey={0}&mode={1}&time={2}&category={3} -->
## **GET** /api/leaderboard/live
**Description:** Returns ApiLeaderboardResponse object.\
**Query Parameters:**
|   NAME   |                                DESCRIPTION                                | REQUIRED |
|----------|---------------------------------------------------------------------------|----------|
| userKey  | account token                                                             | no       |
| mode     | game mode; options: solo, duo, squad, limited                             | no       |
| time     | options: 24h, 7d, 1m, 1y, all (all time)                                  | no       |
| category | options: wins, kills, kills_per_round, winrate, time_alive, rounds, top10 | no       |

<!-- /api/poll/available?userKey={0} -->
## **GET** /api/poll/available
**Description:** Returns ApiPollAvailableResponse object.\
**Query Parameters:**
|  NAME   |  DESCRIPTION  | REQUIRED |
|---------|---------------|----------|
| userKey | account token | yes      |

<!-- /api/poll/vote/{0}?userKey={1} -->
## **POST** /api/poll/vote/*:poll-id:*
**Description:** Votes in a poll.\
**Query Parameters:**
|   NAME   |   DESCRIPTION   | REQUIRED |
|----------|-----------------|----------|
| userKey  | account token   | yes      |
| optionId | selected option | yes      |

<!-- /api/profile/{0}?userKey={1} -->
## **GET** /api/profile/*:friend-code:*
**Description:** Returns ApiProfileResponse object.\
**Query Parameters:**
|  NAME   |  DESCRIPTION  | REQUIRED |
|---------|---------------|----------|
| userKey | account token | yes*     |

\* used not to be authenticated

<!-- /api/quest/available?userKey={0} -->
## **GET** /api/quest/available
**Description:** Returns ApiQuestAvailableResponse object.\
**Query Parameters:**
|  NAME   |  DESCRIPTION  | REQUIRED |
|---------|---------------|----------|
| userKey | account token | no       |

<!-- /api/reward/tracks/mid-season/buy?userKey={0} -->
## ~~**POST** /api/reward/tracks/mid-season/buy~~
**Description:** Deprecated.\
**Query Parameters:**
|  NAME   |  DESCRIPTION  | REQUIRED |
|---------|---------------|----------|
| userKey | account token | yes      |

<!-- /api/reward/tracks/mid-season?userKey={0} -->
## ~~**GET** /api/reward/tracks/mid-season~~
**Description:** Deprecated.\
**Query Parameters:**
|  NAME   |  DESCRIPTION  | REQUIRED |
|---------|---------------|----------|
| userKey | account token | no       |

<!-- /api/reward/tracks/{0}/buy?userKey={0} -->
## **POST** /api/reward/tracks/*:track-id:*/buy
**Description:** Buys a track.\
**Query Parameters:**
|  NAME   |  DESCRIPTION  | REQUIRED |
|---------|---------------|----------|
| userKey | account token | yes      |

<!-- /api/reward/tracks/{0}/skip?userKey={0} -->
## **POST** /api/reward/tracks/*:track-id:*/skip
**Description:** Skips a track.\
**Query Parameters:**
|  NAME   |  DESCRIPTION  | REQUIRED |
|---------|---------------|----------|
| userKey | account token | yes      |
| tiers   | tiers to skip | yes      |

<!-- /api/reward/tracks?userKey={0} -->
## **GET** /api/reward/tracks
**Description:** Returns `tracks` object made of ApiRewardTrack objects.\
**Query Parameters:**
|  NAME   |  DESCRIPTION  | REQUIRED |
|---------|---------------|----------|
| userKey | account token | no       |

<!-- /api/shop/available?userKey={0}&sections={1} -->
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

<!-- /api/tournament/{0}/join?userKey={1} -->
## **GET** /api/*:tournament-code:*/join
**Description:** Returns tournament status. The tournament is open if the status field is "success".\
**Query Parameters:**
|  NAME   |  DESCRIPTION  | REQUIRED |
|---------|---------------|----------|
| userKey | account token | no       |

## **GET** /api/user/*:user-key:*
**Description:** Returns ApiUser object.

## **POST** /api/user/*:user-key:*/buy
**Description:** Buys an item or chest (pack) from the shop.\
**Query Parameters:**
|    NAME     | DESCRIPTION | REQUIRED |
|-------------|-------------|----------|
| quantity    | item count  | yes      |
| timedDealId | item count  | no*      |
| itemId      | item count  | no*      |
| packId      | item count  | no*      |

\* one of these must me present

## **POST** /api/user/*:user-key:*/clear-sessions
**Description:** Revokes all user keys.

<!-- /api/user/{0}/delete-account?confirmationKey={1} -->
## **POST** /api/user/*:user-key:*/delete-account
**Description:** Deletes account.\
**Query Parameters:**
|      NAME       |     DESCRIPTION      | REQUIRED |
|-----------------|----------------------|----------|
| confirmationKey | authentication token | yes      |

## **POST** /api/user/*:user-key:*/friend-code/update
**Description:** Changes friend code & charges gems.\
**Query Parameters:**
| NAME | DESCRIPTION | REQUIRED |
|------|-------------|----------|
| name | new name    | yes      |

## **POST** /api/user/*:user-key:*/pack/open
**Description:** Opens an available chest (pack).\
**Query Parameters:**
|    NAME     | DESCRIPTION | REQUIRED |
|-------------|-------------|----------|
| packId      | item count  | yes      |

## **GET** /api/user/*:user-key:*/rewards
**Description:** Returns ApiUserRewardsResponse object.

## **POST** /api/user/*:user-key:*/rewards/claim
**Description:** Claims a reward.\
**Query Parameters:**
| NAME |                              DESCRIPTION                              | REQUIRED |
|------|-----------------------------------------------------------------------|----------|
| type | options: first, gift, recurring, bonus, instagram, nitro, coming_soon | yes      |

## **POST** /user/login/google
**Description:** Redirects to Google's embedded Oauth login page (which redirects back to `/user/validate/google` after login).\
**Query Parameters:**
| NAME | DESCRIPTION | REQUIRED |
|------|-------------|----------|
| csrf | CSRF token  | yes      |

## **POST** /user/login/facebook
**Description:** Redirects to Facebook's embedded Oauth login page (which redirects back to `/user/validate/facebook` after login).\
**Query Parameters:**
| NAME | DESCRIPTION | REQUIRED |
|------|-------------|----------|
| csrf | CSRF token  | yes      |

## **POST** /user/validate/google
**Description:** Returns the user key of the Google account on the ApiUser object after successful login. On the web version of the game, the returned HTML sends an `onLoginSuccess` message to the client with the login user data and `csrf` token to origin. On the Windows client it sends a GET request (`localhost:7163/?userKey={0}&csrf={1}`) to login with user key through a gateway image in HTML.\
**Query Parameters:**
|   NAME   | DESCRIPTION | REQUIRED |
|----------|-------------|----------|
| code     | code token  | yes      |
| scope    | scope       | yes      |
| authuser | "0"         | yes      |
| prompt   | "none"      | yes      |

## **POST** /user/validate/facebook
**Description:** Returns the user key of the Facebook account on the ApiUser object after successful login. On the web version of the game, the returned HTML sends an `onLoginSuccess` message to the client with the login user data and `csrf` token to origin. On the Windows client it sends a GET request (`localhost:7163/?userKey={0}&csrf={1}`) to login with user key through a gateway image in HTML.\
**Query Parameters:**
|   NAME   | DESCRIPTION | REQUIRED |
|----------|-------------|----------|
| code     | code token  | yes      |
| state    | state token | yes      |

## **POST** /api/validate/apple
**Description:** Deprecated. Unknown.

<!-- /api/validate/device/{0} -->
## **POST** /api/validate/device/*:deviceId:*
**Description:** Creates a device account (or signs in) and returns a new user key on the ApiUser object. Device accounts are only usable from iOS and Android versions of the game.\
**Query Parameters:**
|   NAME   |                  DESCRIPTION                  | REQUIRED |
|----------|-----------------------------------------------|----------|
| deviceId | string identifier (format: {platform}-{uuid}) | yes      |

<!-- /api/validate/discord/{0} -->
## **POST** /api/validate/discord/*:authToken:*
**Description:** Takes a Discord Oauth Bearer Authorization Token and returns ApiUser object.\
**Query Parameters:**
|   NAME    | DESCRIPTION | REQUIRED |
|-----------|-------------|----------|
| authToken | token       | yes      |

<!-- /api/validate/facebook/{0} -->
## **POST** /api/validate/facebook/*:accessToken:*
**Description:** Deprecated.\
**Query Parameters:**
|    NAME     | DESCRIPTION | REQUIRED |
|-------------|-------------|----------|
| accessToken | token       | yes      |

<!-- /api/validate/google/{0} -->
## **POST** /api/validate/google/*:authCode:*
**Description:** Deprecated.\
**Query Parameters:**
|   NAME   | DESCRIPTION | REQUIRED |
|----------|-------------|----------|
| authCode | token       | yes      |

## **POST** /api/validate/gamecenter
**Description:** Deprecated. Unknown.

<!-- /api/tournament/{0}/whitelist/update?userKey={1} -->
## **POST** /api/tournament/*:tournament-code:*/whitelist/update
**Description:** Unknown.\
**Query Parameters:**
|  NAME   |  DESCRIPTION  | REQUIRED |
|---------|---------------|----------|
| userKey | account token | yes      |

<!-- /api/tournament/{0}/join?userKey={1} -->
## **POST** /api/tournament/*:tournament-code:*/join
**Description:** Unknown.\
**Query Parameters:**
|  NAME   |  DESCRIPTION  | REQUIRED |
|---------|---------------|----------|
| userKey | account token | yes      |

<!-- /api/tournament/{0}/whitelist?userKey={1} -->
## **GET** /api/tournament/*:tournament-code:*/whitelist
**Description:** Unknown.\
**Query Parameters:**
|  NAME   |  DESCRIPTION  | REQUIRED |
|---------|---------------|----------|
| userKey | account token | yes      |

<!-- /api/clan/available?userKey={1} -->
## ~~**GET** /api/clan/available~~
**Description:** Deprecated. Gets available clans. Returns ApiClanAvailableResponse object.\
**Query Parameters:**
|  NAME   |  DESCRIPTION  | REQUIRED |
|---------|---------------|----------|
| userKey | account token | no       |

<!-- /api/clan/create?userKey={1} -->
## ~~**POST** /api/clan/create~~
**Description:** Deprecated. Creates a clan.\
**Query Parameters:**
|    NAME     |   DESCRIPTION    | REQUIRED |
|-------------|------------------|----------|
| userKey     | account token    | yes      |
| tag         | 3 letter tag     | yes      |
| name        | clan name        | yes      |
| description | clan description | no       |

<!-- /api/clan/{0}/invite?userKey={1} -->
## ~~**POST** /api/clan/*:clanId:*/invite~~
**Description:** Deprecated. Invites a user to a clan.\
**Query Parameters:**
|  NAME   |  DESCRIPTION  | REQUIRED |
|---------|---------------|----------|
| userKey | account token | yes      |
| userId  | user id       | yes      |

<!-- /api/clan/{0}/join?userKey={1} -->
## ~~**POST** /api/clan/*:clanId:*/join~~
**Description:** Deprecated. Joins a clan you were previously invited to.\
**Query Parameters:**
|  NAME   |  DESCRIPTION  | REQUIRED |
|---------|---------------|----------|
| userKey | account token | yes      |
| clanId  | clan id       | yes      |

<!-- /api/clan/{0}/leave?userKey={1} -->
## ~~**POST** /api/clan/*:clanId:*/leave~~
**Description:** Deprecated. Leaves a clan.\
**Query Parameters:**
|  NAME   |  DESCRIPTION  | REQUIRED |
|---------|---------------|----------|
| userKey | account token | yes      |
