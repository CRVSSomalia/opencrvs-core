/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * OpenCRVS is also distributed under the terms of the Civil Registration
 * & Healthcare Disclaimer located at http://opencrvs.org/license.
 *
 * Copyright (C) The OpenCRVS Authors located at https://github.com/opencrvs/opencrvs-core/blob/master/AUTHORS.
 */
import {
  CompositionSectionCode,
  findCompositionSection,
  findExtension,
  findLastOfficeFromSavedBundle,
  getComposition,
  findLastOfficeLocationFromSavedBundle,
  getResourceFromBundleById,
  getStatusFromTask,
  getTaskFromSavedBundle,
  InProgressRecord,
  Patient,
  ReadyForReviewRecord,
  RegisteredRecord,
  RelatedPerson,
  resourceIdentifierToUUID,
  RejectedRecord
} from '@opencrvs/commons/types'
import { badRequest as boomBadRequest } from '@hapi/boom'

export function getContactPhoneNo(
  record: ReadyForReviewRecord | RegisteredRecord
) {
  const task = getTaskFromSavedBundle(record)
  const phoneNumberExtension = findExtension(
    'http://opencrvs.org/specs/extension/contact-person-phone-number',
    task.extension
  )
  return phoneNumberExtension?.valueString
}

export function getContactEmail(
  record: ReadyForReviewRecord | RegisteredRecord
) {
  const task = getTaskFromSavedBundle(record)
  const emailExtension = findExtension(
    'http://opencrvs.org/specs/extension/contact-person-email',
    task.extension
  )
  return emailExtension?.valueString
}

function error(
  record: ReadyForReviewRecord | RegisteredRecord | RejectedRecord,
  message: string
): never {
  const task = getTaskFromSavedBundle(record)
  const taskStatus = getStatusFromTask(task)
  throw boomBadRequest(`${message} in ${taskStatus} record`)
}

export function getOfficeName(
  record:
    | ReadyForReviewRecord
    | RegisteredRecord
    | InProgressRecord
    | RejectedRecord
) {
  const office = findLastOfficeFromSavedBundle(record)
  return office.name
}

export function getInformantName(
  record: ReadyForReviewRecord | RegisteredRecord
) {
  const composition = getComposition(record)
  const informantSection = findCompositionSection(
    'informant-details',
    composition
  )
  if (!informantSection) {
    error(record, 'informant section not found')
  }
  const informantRelation = getResourceFromBundleById<RelatedPerson>(
    record,
    resourceIdentifierToUUID(informantSection.entry[0].reference)
  )
  const informant = getResourceFromBundleById<Patient>(
    record,
    resourceIdentifierToUUID(informantRelation.patient.reference)
  )
  const name = informant.name.find(({ use }) => use === 'en')
  if (!name) {
    error(record, 'name not found in informant patient resource')
  }
  return [name.given?.join(' '), name.family?.join(' ')].join(' ').trim()
}

export function getPersonName(
  record: ReadyForReviewRecord | RegisteredRecord | RejectedRecord,
  personType: 'deceased' | 'child'
) {
  const compositionCode: Extract<
    CompositionSectionCode,
    'deceased-details' | 'child-details'
  > = `${personType}-details`
  const composition = getComposition(record)
  const patientSection = findCompositionSection(compositionCode, composition)
  if (!patientSection) {
    error(record, `patient section not found for ${compositionCode}`)
  }
  const person = getResourceFromBundleById<Patient>(
    record,
    resourceIdentifierToUUID(patientSection.entry[0].reference)
  )
  const name = person.name.find(({ use }) => use === 'en')
  if (!name) {
    error(record, `name not found in patient resource for ${compositionCode}`)
  }
  // the trim used in given name handles the case when a country does not have middlename
  return [name.given?.join(' ').trim(), name.family].join(' ').trim()
}

export function getRegistrationLocation(
  record:
    | ReadyForReviewRecord
    | RegisteredRecord
    | InProgressRecord
    | RejectedRecord
) {
  const location = findLastOfficeLocationFromSavedBundle(record)

  return location.name || ''
}
