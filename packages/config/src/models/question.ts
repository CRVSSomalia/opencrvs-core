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
import { Document, model, Schema } from 'mongoose'

export enum FieldType {
  TEXT = 'TEXT',
  TEL = 'TEL',
  NUMBER = 'NUMBER',
  TEXTAREA = 'TEXTAREA',
  SUBSECTION = 'SUBSECTION',
  PARAGRAPH = 'PARAGRAPH'
}

export const validFieldType = Object.values(FieldType)

export interface IMessageDescriptor {
  id: string
  description: string
  defaultMessage: string
}

export interface IQuestion {
  fieldId: string
  label?: IMessageDescriptor
  placeholder?: IMessageDescriptor
  maxLength?: number
  fieldName?: string
  fieldType?: FieldType
  preceedingFieldId?: string
  required?: boolean
  enabled: boolean
  custom?: boolean
  initialValue?: string
}

export interface IQuestionModel extends IQuestion, Document {}

export const messageDescriptor = new Schema({
  id: { type: String, required: true },
  description: { type: String },
  defaultMessage: { type: String }
})

const questionSchema = new Schema({
  fieldId: { type: String, unique: true, required: true },
  label: { type: messageDescriptor },
  placeholder: { type: messageDescriptor },
  maxLength: { type: Number, default: 280 },
  fieldName: { type: String },
  fieldType: {
    type: String,
    enum: validFieldType,
    default: FieldType.TEXT
  },
  preceedingFieldId: { type: String },
  required: { type: Boolean },
  enabled: { type: Boolean, required: true },
  custom: { type: Boolean, default: false },
  initialValue: { type: String }
})

export default model<IQuestionModel>('Question', questionSchema)