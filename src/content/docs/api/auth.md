---
title: Authentication API
description: ZombsRoyale Wiki's ZombsRoyale.io REST API documentation
sidebar:
    label: "Auth"
---

## **POST** /user/login/google

**Description:** Redirects to Google's embedded Oauth login page (which redirects back to `/user/validate/google` after login).\
**Query Parameters:**

| NAME | DESCRIPTION | REQUIRED |
| ---- | ----------- | -------- |
| csrf | CSRF token  | yes      |

## **POST** /user/login/facebook

**Description:** Redirects to Facebook's embedded Oauth login page (which redirects back to `/user/validate/facebook` after login).\
**Query Parameters:**

| NAME | DESCRIPTION | REQUIRED |
| ---- | ----------- | -------- |
| csrf | CSRF token  | yes      |

## **POST** /user/validate/google

**Description:** Returns the user key of the Google account on the ApiUser object after successful login. On the web version of the game, the returned HTML sends an `onLoginSuccess` message to the client with the login user data and `csrf` token to origin. On the Windows client it sends a GET request (`localhost:7163/?userKey={0}&csrf={1}`) to login with user key through a gateway image in HTML.\
**Query Parameters:**

| NAME     | DESCRIPTION | REQUIRED |
| -------- | ----------- | -------- |
| code     | Code token  | yes      |
| scope    | Scope       | yes      |
| authuser | "0"         | yes      |
| prompt   | "none"      | yes      |

## **POST** /user/validate/facebook

**Description:** Returns the user key of the Facebook account on the ApiUser object after successful login. On the web version of the game, the returned HTML sends an `onLoginSuccess` message to the client with the login user data and `csrf` token to origin. On the Windows client it sends a GET request (`localhost:7163/?userKey={0}&csrf={1}`) to login with user key through a gateway image in HTML.\
**Query Parameters:**

| NAME  | DESCRIPTION | REQUIRED |
| ----- | ----------- | -------- |
| code  | Code token  | yes      |
| state | State token | yes      |

## **POST** /api/validate/apple

**Description:** Deprecated. Unknown.

<!-- /api/validate/device/{0} -->

## **POST** /api/validate/device/_:deviceId:_

**Description:** Creates a device account (or signs in) and returns a new user key on the ApiUser object. Device accounts are only usable from iOS and Android versions of the game.\
**Query Parameters:**

| NAME     | DESCRIPTION                                                  | REQUIRED |
| -------- | ------------------------------------------------------------ | -------- |
| deviceId | String identifier (format [not enforced]: {platform}-{uuid}) | yes      |

<!-- /api/validate/discord/{0} -->

## **POST** /api/validate/discord/_:authToken:_

**Description:** Takes a Discord Oauth Bearer Authorization Token and returns ApiUser object.\
**Query Parameters:**

| NAME      | DESCRIPTION | REQUIRED |
| --------- | ----------- | -------- |
| authToken | Token       | yes      |

<!-- /api/validate/facebook/{0} -->

## **POST** /api/validate/facebook/_:accessToken:_

**Description:** Deprecated.\
**Query Parameters:**

| NAME        | DESCRIPTION | REQUIRED |
| ----------- | ----------- | -------- |
| accessToken | Token       | yes      |

<!-- /api/validate/google/{0} -->

## **POST** /api/validate/google/_:authCode:_

**Description:** Deprecated.\
**Query Parameters:**

| NAME     | DESCRIPTION | REQUIRED |
| -------- | ----------- | -------- |
| authCode | Token       | yes      |

## **POST** /api/validate/gamecenter

**Description:** Deprecated. Unknown.
