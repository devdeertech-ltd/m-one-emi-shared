# @mone/shared

Single source of truth for the M.one EMI Guard TS clients:
error codes + envelope, zod request schemas (mirrored from the server),
domain enums + response view-model types, and `tokens.json` (design tokens).

Consumed by: `m-one-emi-dashboard`, `m-one-emi-web`, `m-one-emi-admin-app`.

## Build

    npm i
    npm run build   # emits dist/

## Consume (in a client repo)

package.json:

    "@mone/shared": "file:../m-one-emi-shared"

then:

    npm i

Rebuild shared after any change to its source:

    npm run build

## Contract

`src/errors.ts`, `src/schemas/*`, and `src/types.ts` mirror the server
(`m-one-emi-server`). The server is the source of truth. When a server
schema, enum, or error code changes, update the matching file here and
rebuild. Enums are lowercase and must stay byte-identical to the Prisma
enums. Money values returned by the API are Decimal-serialized **strings**,
not numbers (see types.ts).