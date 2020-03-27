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
import {
  IFormSection,
  IFormSectionData,
  IFormSectionGroup,
  UserSection
} from '@client/forms'
import { getVisibleSectionGroupsBasedOnConditions } from '@client/forms/utils'
import { formMessages } from '@client/i18n/messages'
import { goBack } from '@client/navigation'
import { IStoreState } from '@client/store'
import styled from '@client/styledComponents'
import { replaceInitialValues } from '@client/views/RegisterForm/RegisterForm'
import { UserForm } from '@client/views/SysAdmin/tabs/user/userCreation/UserForm'
import { UserReviewForm } from '@client/views/SysAdmin/tabs/user/userCreation/UserReviewForm'
import { ActionPageLight, Spinner } from '@opencrvs/components/lib/interface'
import ApolloClient, { ApolloQueryResult } from 'apollo-client'
import * as React from 'react'
import { withApollo } from 'react-apollo'
import { injectIntl, WrappedComponentProps as IntlShapeProps } from 'react-intl'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { GET_USER } from '@client/sysadmin/user/queries'
import { gqlToDraftTransformer } from '@client/transformer'
import { GQLQuery } from '@opencrvs/gateway/src/graphql/schema'
import { storeUserFormData } from '@client/user/userReducer'
import { messages as sysAdminMessages } from '@client/i18n/messages/views/sysAdmin'

interface IMatchParams {
  userId?: string
  sectionId: string
  groupId: string
}

type INewUserProps = {
  userId?: string
  section: IFormSection
  activeGroup: IFormSectionGroup
  nextSectionId: string
  nextGroupId: string
  formData: IFormSectionData
  submitting: boolean
  userDetailsStored?: boolean
  client: ApolloClient<unknown>
}

interface IDispatchProps {
  goBack: typeof goBack
  storeUserFormData: typeof storeUserFormData
}

export type Props = RouteComponentProps<IMatchParams> &
  INewUserProps &
  IntlShapeProps

const Container = styled.div`
  display: flex;
  min-height: 80vh;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
`

class CreateNewUserComponent extends React.Component<Props & IDispatchProps> {
  async componentDidMount() {
    const { userId } = this.props
    if (userId) {
      this.fetchAndStoreUserDetails(userId)
    }
  }

  fetchAndStoreUserDetails = async (userId: string) => {
    try {
      const data: ApolloQueryResult<GQLQuery> = await this.props.client.query({
        query: GET_USER,
        variables: { userId }
      })
      const formData = gqlToDraftTransformer(
        { sections: [{ ...this.props.section, id: UserSection.User }] },
        { [UserSection.User]: data.data.getUser }
      )

      this.props.storeUserFormData(formData.user)
    } catch (error) {
      console.log(error)
    }
  }

  renderLoadingPage = () => {
    const { intl, userId } = this.props
    return (
      <ActionPageLight
        title={
          userId
            ? intl.formatMessage(sysAdminMessages.editUserDetailsTitle)
            : intl.formatMessage(formMessages.userFormTitle)
        }
        goBack={this.props.goBack}
      >
        <Container>
          <Spinner id="user-form-submitting-spinner" />
        </Container>
      </ActionPageLight>
    )
  }

  render() {
    const { section, submitting, userDetailsStored, userId } = this.props
    if (submitting || (userId && !userDetailsStored)) {
      return this.renderLoadingPage()
    }

    if (section.viewType === 'form') {
      return <UserForm {...this.props} />
    }

    if (section.viewType === 'preview') {
      return <UserReviewForm {...this.props} />
    }
  }
}

function getNextSectionIds(
  sections: IFormSection[],
  fromSection: IFormSection,
  fromSectionGroup: IFormSectionGroup,
  formData: IFormSectionData
) {
  const visibleGroups = getVisibleSectionGroupsBasedOnConditions(
    fromSection,
    formData || {}
  )
  const currentGroupIndex = visibleGroups.findIndex(
    (group: IFormSectionGroup) => group.id === fromSectionGroup.id
  )

  if (currentGroupIndex === visibleGroups.length - 1) {
    const visibleSections = sections.filter(
      section => section.viewType !== 'hidden'
    )
    const currentIndex = visibleSections.findIndex(
      (section: IFormSection) => section.id === fromSection.id
    )

    if (currentIndex === visibleSections.length - 1) {
      return null
    }
    return {
      sectionId: visibleSections[currentIndex + 1].id,
      groupId: visibleSections[currentIndex + 1].groups[0].id
    }
  }
  return {
    sectionId: fromSection.id,
    groupId: visibleGroups[currentGroupIndex + 1].id
  }
}

const mapStateToProps = (state: IStoreState, props: Props) => {
  const sectionId =
    props.match.params.sectionId || state.userForm.userForm!.sections[0].id
  const section = state.userForm.userForm!.sections.find(
    section => section.id === sectionId
  ) as IFormSection

  const groupId = props.match.params.groupId || section.groups[0].id

  const group = section.groups.find(
    group => group.id === groupId
  ) as IFormSectionGroup

  if (!section) {
    throw new Error(`No section found ${sectionId}`)
  }

  const fields = replaceInitialValues(group.fields, state.userForm.userFormData)

  const nextGroupId = getNextSectionIds(
    state.userForm.userForm!.sections,
    section,
    group,
    state.userForm.userFormData
  ) || { sectionId: '', groupId: '' }

  return {
    userId: props.match.params.userId,
    sectionId: sectionId,
    section,
    formData: state.userForm.userFormData,
    submitting: state.userForm.submitting,
    userDetailsStored: state.userForm.userDetailsStored,
    activeGroup: {
      ...group,
      fields
    },
    nextSectionId: nextGroupId && nextGroupId.sectionId,
    nextGroupId: nextGroupId && nextGroupId.groupId
  }
}

export const CreateNewUser = connect(
  mapStateToProps,
  { goBack, storeUserFormData }
)(injectIntl(withApollo(CreateNewUserComponent)))
