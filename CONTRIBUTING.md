# Contributing

This is a commercetools-labs project, provided as-is and unsupported (see
[SUPPORT.md](SUPPORT.md)). Contributions are welcome and reviewed on a
best-effort basis, so a small, self-contained change is the easiest kind to
land.

Only contribute code you have the right to license under MIT, and never commit
credentials or personal data.

## Before you open a PR

```bash
./scripts/predeploy.sh
```

Audit, typecheck, lint, build and unit tests for all five applications. One
at a time with `./scripts/predeploy.sh mc-app`.

`predeploy` must pass. It runs locally and is the one gate on this
repository, so a change that passes it is a change the next person who clones
can build.

`npm audit` runs first because Connect's SCA scan is what rejects a
Connector, and its report names only the stage that failed. It gates at
**critical**, the threshold Connect enforces, and it keeps **development
dependencies** in scope, because Connect scans those too — `--omit=dev`
would go green here and still be rejected there.

## What a good change looks like here

This connector's hard parts are the ones where a mistake is silent — a
Subscription pointed at a dead topic, a Type replaced rather than extended, a
cart skipped for want of an email address. Changes in that territory are worth
making, and they are worth a test.

`service/src/tests/abandoned-cart.service.spec.ts` is where the selection and
cart-marking rules are pinned, and
`mail-sender/tests/unit/generic.handler.spec.js` covers the send path
including the dry run. A behaviour that can fail quietly should leave a
failing test when it does.

By contributing you agree your contribution is licensed under the [MIT License](LICENSE).
