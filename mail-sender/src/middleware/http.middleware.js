/*
 * SPDX-License-Identifier: MIT
 * Copyright (c) 2026 commercetools GmbH and the commercetools-labs contributors
 * Freely available, AS IS and UNSUPPORTED. See LICENSE.
 */

import readConfiguration from '../utils/config.utils.js';

export const buildHttpMiddlewareOptions = () => ({
  host: `https://api.${readConfiguration().region}.commercetools.com`,
});
