/*
 * SPDX-License-Identifier: MIT
 * Copyright (c) 2026 commercetools GmbH and the commercetools-labs contributors
 * Freely available, AS IS and UNSUPPORTED. See LICENSE.
 */

import { lazy } from 'react';

const ServiceAdministration = lazy(() =>
  import(
    './service-administration' /* webpackChunkName: "service-administration" */
  )
);

export default ServiceAdministration;
