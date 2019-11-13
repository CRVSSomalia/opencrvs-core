/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * OpenCRVS is also distributed under the terms of the Civil Registration
 * & Healthcare Disclaimer located at http://opencrvs.org/license.
 *
 * Copyright (C) The OpenCRVS Authors. OpenCRVS and the OpenCRVS
 * graphic logo are (registered/a) trademark(s) of Plan International.
 */
import * as React from 'react'
import { injectIntl, WrappedComponentProps as IntlShapeProps } from 'react-intl'
import {
  ISubSectionProps,
  SubSectionDivider as SubSectionDividerComponent
} from '@opencrvs/components/lib/forms'
import { Omit } from '@opencrvs/client/src/utils'
import { formMessages } from '@client/i18n/messages'

export const SubSectionDivider = injectIntl(function FormInputField(
  props: Omit<ISubSectionProps, 'optionalLabel'> & IntlShapeProps
) {
  return (
    <SubSectionDividerComponent
      {...props}
      optionalLabel={props.intl.formatMessage(formMessages.optionalLabel)}
    />
  )
})