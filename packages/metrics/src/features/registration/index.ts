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
export interface IBirthRegistrationFields extends IPoint {
  compositionId: string
  ageInDays: number | undefined
}

export interface IDeathRegistrationFields extends IPoint {
  compositionId: string
  ageInYears: number | undefined
  deathDays: number | undefined
}

export interface IPoint {
  time?: string
}

export interface IPointLocation {
  locationLevel5?: string
  locationLevel4?: string
  locationLevel3?: string
  locationLevel2?: string
}

export interface IAuthHeader {
  Authorization: string
}

export interface IBirthRegistrationTags {
  regStatus: string
  gender: string | undefined
  locationLevel5?: string
  locationLevel4?: string
  locationLevel3?: string
  locationLevel2?: string
}

export interface IDeathRegistrationTags {
  regStatus: string
  gender: string | undefined
  mannerOfDeath: string
  causeOfDeath: string
  locationLevel5?: string
  locationLevel4?: string
  locationLevel3?: string
  locationLevel2?: string
}

export interface IInProgressApplicationFields {
  compositionId: string
}

export interface IInProgressApplicationTags {
  regStatus: string
  missingFieldSectionId: string
  missingFieldGroupId: string
  missingFieldId: string
  eventType: string
  locationLevel5?: string
  locationLevel4?: string
  locationLevel3?: string
  locationLevel2?: string
}

export interface ILocationTags {
  locationLevel5?: string
  locationLevel4?: string
  locationLevel3?: string
  locationLevel2?: string
}

export interface ITimeLoggedFields {
  timeSpentEditing: number
  compositionId: string
}

export interface ITimeLoggedTags {
  currentStatus: string
  eventType: string
}

export interface IDurationFields {
  durationInSeconds: number
  compositionId: string
  currentTaskId: string
  previousTaskId: string
}
export interface IDurationTags {
  currentStatus: string
  previousStatus: string
  eventType: string
}

export interface IDurationPoints {
  measurement: string
  tags: IDurationTags
  fields: IDurationFields
}

export interface ITimeLoggedPoints {
  measurement: string
  tags: ITimeLoggedTags
  fields: ITimeLoggedFields
}

export interface IInProgressApplicationPoints {
  measurement: string
  tags: IInProgressApplicationTags
  fields: IInProgressApplicationFields
}

export interface IDeathRegistrationPoints {
  measurement: string
  tags: IDeathRegistrationTags
  fields: IDeathRegistrationFields
}

export interface IBirthRegistrationPoints {
  measurement: string
  tags: IBirthRegistrationTags
  fields: IBirthRegistrationFields
}

export interface IPaymentPoints {
  measurement: string
  tags: IPointLocation
  fields: IPaymentFields
}

export interface IPaymentFields {
  total: number
  compositionId: string
}

export interface IApplicationsStartedPoints {
  measurement: string
  tags: IPointLocation
  fields: IApplicationsStartedFields
}

export interface IApplicationsStartedFields {
  role: string
  compositionId: string
}

export interface IRejectedFields {
  compositionId: string
  startedBy: string
}

export interface IRejectedPoints {
  measurement: string
  tags: IPointLocation
  fields: IRejectedFields
}

export type IPoints =
  | IDurationPoints
  | ITimeLoggedPoints
  | IInProgressApplicationPoints
  | IPaymentPoints
  | IBirthRegistrationPoints
  | IDeathRegistrationPoints
  | IPaymentPoints
  | IApplicationsStartedPoints
  | IRejectedPoints
