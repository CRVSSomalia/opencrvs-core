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
import { Header } from '@client/components/interface/Header/Header'
import { messages } from '@client/i18n/messages/views/performance'
import { PERFORMANCE_REPORT_TYPE_MONTHLY } from '@client/utils/constants'
import { IconTab } from '@client/views/RegistrationHome/RegistrationHome'
import { ICON_ALIGNMENT, CircleButton } from '@opencrvs/components/lib/buttons'
import { TopBar } from '@opencrvs/components/lib/interface'
import { Container, BodyContent } from '@opencrvs/components/lib/layout'
import * as React from 'react'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { BackArrowDeepBlue } from '@opencrvs/components/lib/icons'

const TAB_ID = {
  monthly: PERFORMANCE_REPORT_TYPE_MONTHLY
}

const Content = styled(BodyContent)`
  padding: 0px;
  margin: 32px auto 0;
  @media (max-width: ${({ theme }) => theme.grid.breakpoints.lg}px) {
    padding: 0px 16px;
  }
`
const SubPageContent = styled(Content)`
  margin: 8px auto 0;
`
export enum PerformancePageVariant {
  DEFAULT = 'DEFAULT',
  SUBPAGE = 'SUBPAGE'
}

interface BasePage {
  id?: string
  type?: PerformancePage['type']
  tabId?: string
  hideTopBar?: boolean
  children?: React.ReactNode
}

interface DefaultPage extends BasePage {
  type?: typeof PerformancePageVariant.DEFAULT
}

interface HeaderProps {
  id?: string
  headerTitle: string
  backActionHandler: () => void
  toolbarComponent?: React.ReactNode
}

interface SubPage extends BasePage, HeaderProps {
  type: typeof PerformancePageVariant.SUBPAGE
}

type PerformancePage = DefaultPage | SubPage

function isSubPage(page: PerformancePage): page is SubPage {
  return page.type === PerformancePageVariant.SUBPAGE
}

const SubPageHeaderContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.copy};
  border-bottom: 1px solid ${({ theme }) => theme.colors.dividerDark};
`
const SubPageHeaderBody = styled.div`
  display: flex;
  align-items: center;
  max-height: 56px;
  padding: 16px;
  ${({ theme }) => theme.fonts.bodyBoldStyle}
  text-overflow: ellipsis;
  & > :first-child {
    margin-right: 8px;
  }
`
const ToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  margin: 0 32px;
  padding: 0 40px 16px 40px;

  @media (max-width: ${({ theme }) => theme.grid.breakpoints.md}px) {
    margin: 0 -8px;
  }
`

const HeaderText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
function SubPageHeader(props: HeaderProps) {
  return (
    <SubPageHeaderContainer>
      <SubPageHeaderBody>
        <CircleButton
          id={`${props.id}-action-back`}
          onClick={props.backActionHandler}
        >
          <BackArrowDeepBlue />
        </CircleButton>
        <HeaderText id={`${props.id}-header`}>{props.headerTitle}</HeaderText>
      </SubPageHeaderBody>
      {props.toolbarComponent && (
        <ToolbarContainer>{props.toolbarComponent}</ToolbarContainer>
      )}
    </SubPageHeaderContainer>
  )
}

export function PerformanceContentWrapper(props: PerformancePage) {
  const intl = useIntl()
  function renderTopBar() {
    const { tabId } = props

    return (
      <TopBar id="top-bar">
        <IconTab
          id={`tab_${TAB_ID.monthly}`}
          key={TAB_ID.monthly}
          active={tabId === TAB_ID.monthly}
          align={ICON_ALIGNMENT.LEFT}
        >
          {intl.formatMessage(messages.monthlyTabTitle)}
        </IconTab>
      </TopBar>
    )
  }
  let pageHeader: JSX.Element
  let pageContent: JSX.Element
  if (isSubPage(props)) {
    pageHeader = (
      <SubPageHeader
        id={props.id}
        headerTitle={props.headerTitle}
        backActionHandler={props.backActionHandler}
        toolbarComponent={props.toolbarComponent}
      />
    )

    pageContent = <SubPageContent>{props.children}</SubPageContent>
  } else {
    pageHeader = <Header />
    pageContent = <Content>{props.children}</Content>
  }

  return (
    <Container>
      {pageHeader}
      {!props.hideTopBar && renderTopBar()}
      {pageContent}
    </Container>
  )
}
