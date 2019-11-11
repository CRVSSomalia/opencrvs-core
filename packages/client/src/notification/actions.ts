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
export const SHOW_BACKGROUND_SYNC_TRIGGERED = 'SHOW_BACKGROUND_SYNC_TRIGGERED'
export const HIDE_BACKGROUND_SYNC_TRIGGERED = 'HIDE_BACKGROUND_SYNC_TRIGGERED'
export const SHOW_CONFIG_ERROR = 'SHOW_CONFIG_ERROR'
export const HIDE_CONFIG_ERROR = 'HIDE_CONFIG_ERROR'
export const SESSION_EXPIRED = 'AUTH/SESSION_EXPIRED'
export const TOGGLE_DRAFT_SAVED_NOTIFICATION = 'TOGGLE_DRAFT_SAVED_NOTIFICATION'

export const SHOW_SUBMIT_FORM_SUCCESS_TOAST = 'SUBMIT_FORM_SUCCESS_TOAST'
export const HIDE_SUBMIT_FORM_SUCCESS_TOAST = 'HIDE_SUBMIT_FORM_SUCCESS_TOAST'
export const SHOW_SUBMIT_FORM_ERROR_TOAST = 'SHOW_SUBMIT_FORM_ERROR_TOAST'
export const HIDE_SUBMIT_FORM_ERROR_TOAST = 'HIDE_SUBMIT_FORM_ERROR_TOAST '

export type ShowConfigurationErrorAction = {
  type: typeof SHOW_CONFIG_ERROR
}

export type HideConfigurationErrorAction = {
  type: typeof HIDE_CONFIG_ERROR
}

export type toggleDraftSavedNotificationAction = {
  type: typeof TOGGLE_DRAFT_SAVED_NOTIFICATION
}

export type ShowSubmitFormSuccessToast = {
  type: typeof SHOW_SUBMIT_FORM_SUCCESS_TOAST
  payload: {
    data: string
  }
}

export type HideSubmitFormSuccessToast = {
  type: typeof HIDE_SUBMIT_FORM_SUCCESS_TOAST
}

export type ShowSubmitFormErrorToast = {
  type: typeof SHOW_SUBMIT_FORM_ERROR_TOAST
  payload: {
    data: string
  }
}

export type HideSubmitFormErrorToast = {
  type: typeof HIDE_SUBMIT_FORM_ERROR_TOAST
}

export const showConfigurationErrorNotification = (): ShowConfigurationErrorAction => ({
  type: SHOW_CONFIG_ERROR
})

export const hideConfigurationErrorNotification = (): HideConfigurationErrorAction => ({
  type: HIDE_CONFIG_ERROR
})

export const toggleDraftSavedNotification = (): toggleDraftSavedNotificationAction => ({
  type: TOGGLE_DRAFT_SAVED_NOTIFICATION
})

export type ShowBackgroundSyncedAction = {
  type: typeof SHOW_BACKGROUND_SYNC_TRIGGERED
}

export type HideBackgroundSyncedAction = {
  type: typeof HIDE_BACKGROUND_SYNC_TRIGGERED
}

export type SessionExpiredAction = {
  type: typeof SESSION_EXPIRED
}

export const showBackgroundSyncedNotification = (): ShowBackgroundSyncedAction => ({
  type: SHOW_BACKGROUND_SYNC_TRIGGERED
})

export const hideBackgroundSyncedNotification = (): HideBackgroundSyncedAction => ({
  type: HIDE_BACKGROUND_SYNC_TRIGGERED
})

export const showSessionExpireConfirmation = (): SessionExpiredAction => ({
  type: SESSION_EXPIRED
})

export const showSubmitFormSuccessToast = (
  data: string
): ShowSubmitFormSuccessToast => ({
  type: SHOW_SUBMIT_FORM_SUCCESS_TOAST,
  payload: { data }
})

export const hideSubmitFormSuccessToast = (): HideSubmitFormSuccessToast => ({
  type: HIDE_SUBMIT_FORM_SUCCESS_TOAST
})

export const showSubmitFormErrorToast = (
  data: string
): ShowSubmitFormErrorToast => ({
  type: SHOW_SUBMIT_FORM_ERROR_TOAST,
  payload: { data }
})

export const hideSubmitFormErrorToast = (): HideSubmitFormErrorToast => ({
  type: HIDE_SUBMIT_FORM_ERROR_TOAST
})

export type Action =
  | ShowBackgroundSyncedAction
  | HideBackgroundSyncedAction
  | SessionExpiredAction
  | ShowConfigurationErrorAction
  | HideConfigurationErrorAction
  | toggleDraftSavedNotificationAction
  | ShowSubmitFormSuccessToast
  | HideSubmitFormSuccessToast
  | ShowSubmitFormErrorToast
  | HideSubmitFormErrorToast
