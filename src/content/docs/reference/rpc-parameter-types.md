---
title: RPC Parameter Types
description: ZombsRoyale Wiki's RPC Parameter Types reverse-engineering documentation
---

The `e_ParameterType` enum is used within the `RpcParameter` class and determines the given parameter's data type.

```c#
enum e_ParameterType
{
    Uint32,           // 0x00 (0)
    Int32,            // 0x01 (1)
    Float,            // 0x02 (2)
    String,           // 0x03 (3)
    Uint64,           // 0x04 (4)
    Int64,            // 0x05 (5)
    Uint16,           // 0x06 (6)
    Int16,            // 0x07 (7)
    Uint8,            // 0x08 (8)
    Int8,             // 0x09 (9)
    VectorUint8,      // 0x0A (10)
    CompressedString  // 0x0B (11)
}
```

## Uint32 (0)

-   **Value:** 0 (0x00)
-   **Description:** Represents a 32-bit unsigned integer.

## Int32 (1)

-   **Value:** 1 (0x01)
-   **Description:** Represents a 32-bit signed integer.

## Float (2)

-   **Value:** 2 (0x02)
-   **Description:** Represents a floating-point number multiplied by 100 as a Uint32.

## String (3)

-   **Value:** 3 (0x03)
-   **Description:** Represents a string of characters.

## Uint64 (4)

-   **Value:** 4 (0x04)
-   **Description:** Represents a 64-bit unsigned integer.

## Int64 (5)

-   **Value:** 5 (0x05)
-   **Description:** Represents a 64-bit signed integer.

## Uint16 (6)

-   **Value:** 6 (0x06)
-   **Description:** Represents a 16-bit unsigned integer.

## Int16 (7)

-   **Value:** 7 (0x07)
-   **Description:** Represents a 16-bit signed integer.

## Uint8 (8)

-   **Value:** 8 (0x08)
-   **Description:** Represents an 8-bit unsigned integer.

## Int8 (9)

-   **Value:** 9 (0x09)
-   **Description:** Represents an 8-bit signed integer.

## VectorUint8 (10)

-   **Value:** 10 (0x0A)
-   **Description:** Represents a vector of 8-bit unsigned integers.

## CompressedString (11)

-   **Value:** 11 (0x0B)
-   **Description:** Represents a string compressed with GZIP.

---

_Note: This documentation provides a brief description of each parameter type and its associated value._
