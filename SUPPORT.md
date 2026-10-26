# Support

Thanks for taking a look at this project. It is commercetools-labs reference
code: a commercetools Connect connector for abandoned-cart email, shared in the
hope that it is useful, and **unsupported**.

In practice that means:

- It is freely available under the MIT license ([LICENSE](LICENSE)) and is
  provided as-is, without warranty.
- It isn't covered by commercetools Support, your account team or any
  service-level agreement, so we can't promise replies, fixes or new releases.
- Issues and pull requests are welcome, and we'll take a look when we can.

## Before you install this in a production Project

This connector emails your shoppers, so a few of its behaviours are worth
knowing before it meets a Project with real shoppers in it.

- **The first run on an established Project finds a backlog.** Every cart
  inside the abandonment window is a cart this connector chases, and on a
  Project that has been trading for a while that can be a large number of
  real people receiving mail as soon as it is installed.
  `ABANDONED_CART_MAX_PER_RUN` caps a single run (default 10), and what it
  holds back goes to the service log rather than passing in silence. Raise it
  deliberately, once you have seen what the first run selected.
- **A dry run is the place to start.** With `RESEND_API_KEY` unset the whole
  connector still works end to end: carts are recorded, every message is
  rendered and stored on its Custom Object, and the Merchant Center shows
  exactly what would have been sent. That is the clearest way to see what a
  real run would do.
- **`ABANDONED_CART_REDIRECT_ALL_TO` redirects every send to one address**,
  with a line naming who it was addressed to. It proves delivery works without
  mailing anybody. Leave it unset in production: while it is set, no shopper
  receives anything.
- **It writes a custom field on Carts.** A Cart carries exactly one custom
  Type and `setCustomType` replaces rather than merges, so a connector that
  sets its own Type on a cart already carrying yours drops every field yours
  defines. This one sets a Type only on a cart that has none, sets just its
  field on a cart carrying the configured Type, and leaves a cart carrying any
  other Type alone. Point `ABANDONED_CART_TYPE_KEY` at the Type your Project
  already puts on carts, or set `ABANDONED_CART_MARK_CARTS=false`, which gives
  up only the Cart Discount.
- **The mail-sender's Subscription cannot be filtered by container.** It is a
  Change Subscription on `key-value-document`, so every Custom Object write in
  the Project reaches it. One comparison rejects the ones it does not want
  before anything is fetched, but on a Project that writes Custom Objects
  heavily, that is real traffic you pay for.
- **`postDeploy` does not reliably run on a preview deployment**, and the
  deployment report says "Post-deployment setup succeeded" either way. Run
  `node scripts/connect.mjs ensure` after any deploy: it checks the
  Subscriptions and the Type against the Project and repoints them. A redeploy
  gets a new Pub/Sub topic, so a Subscription still aimed at the old one is as
  silent as no Subscription at all.

## If you need help

- **Questions and bugs:** open a GitHub issue. Another reader or a maintainer
  may well have an answer, though we can't commit to one.
- **Using it in production:** feel free to fork it and adapt it to your needs.
  Once it's in production it's yours, so review the code, test it against your
  Project and keep your copy up to date.
- **commercetools products:** for questions about Composable Commerce, the
  Merchant Center or Connect themselves, the
  [commercetools documentation](https://docs.commercetools.com) (including the
  [Connect documentation](https://docs.commercetools.com/connect/)), the
  community and commercetools Support are the right place, as usual.
