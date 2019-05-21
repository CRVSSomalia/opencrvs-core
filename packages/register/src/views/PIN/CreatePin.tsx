import * as React from 'react'
import { PINKeypad } from '@opencrvs/components/lib/interface'
import { PIN } from '@opencrvs/components/lib/icons'
import styled from 'styled-components'
import * as bcrypt from 'bcryptjs'
import { storage } from '@opencrvs/register/src/storage'
import { injectIntl, InjectedIntlProps } from 'react-intl'
import messages from './messages'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.gradients.gradientNightshade};
  height: 100vh;
  width: 100%;
  position: absolute;
  overflow-y: hidden;
  overflow-x: hidden;
`

const TitleText = styled.span`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.h4Style};
  text-align: center;
  margin-top: 24px;
  margin-bottom: 16px;
`

const DescriptionText = styled.span`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.bigBodyStyle};
  text-align: center;
  max-width: 360px;
  margin-bottom: 40px;
`

const ErrorBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.bodyStyle};
  background: ${({ theme }) => theme.colors.error};
  height: 40px;
  width: 360px;
  margin-top: -30px;
  margin-bottom: -10px;
`

type IProps = InjectedIntlProps & { onComplete: () => void }

class CreatePinComponent extends React.Component<IProps> {
  state = {
    pin: null,
    pinMatchError: false,
    pinHasSeqDigits: false,
    refresher: false
  }

  firstPINEntry = (pin: string) => {
    this.setState({ refresher: !this.state.refresher })
    if (this.sequential(pin)) {
      this.setState({ pinHasSeqDigits: true })
    } else {
      this.setState({ pin, pinHasSeqDigits: false })
    }
  }

  secondPINEntry = (pin: string) => {
    const { pin: firstEnteredPIN } = this.state
    if (pin !== firstEnteredPIN) {
      this.setState({ pinMatchError: true, pin: null })
      return
    }

    this.storePINForUser(pin)
  }

  sequential = (pin: string) => {
    const d = pin.split('').map(i => Number(i))
    return d[0] + 1 === d[1] && d[1] + 1 === d[2] && d[2] + 1 === d[3]
  }

  storePINForUser = async (pin: string) => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(pin, salt)

    // TODO: this should be moved to the user object when the support for multiple user has been added
    await storage.setItem('pin', hash)

    this.props.onComplete()
  }

  render() {
    const { pin, pinMatchError, pinHasSeqDigits, refresher } = this.state
    const { intl } = this.props

    return (
      <Container>
        <PIN />
        {pin === null && !pinHasSeqDigits && (
          <>
            <TitleText id="title-text">
              {intl.formatMessage(messages.createTitle)}
            </TitleText>
            <DescriptionText id="description-text">
              {intl.formatMessage(messages.createDescription)}
            </DescriptionText>
            {pinMatchError && (
              <ErrorBox id="error-text">
                {intl.formatMessage(messages.pinMatchError)}
              </ErrorBox>
            )}
            <PINKeypad pin="" onComplete={this.firstPINEntry} />
          </>
        )}
        {pinHasSeqDigits && (
          <>
            <TitleText id="title-text">
              {intl.formatMessage(messages.createTitle)}
            </TitleText>
            <DescriptionText id="description-text">
              {intl.formatMessage(messages.createDescription)}
            </DescriptionText>
            <ErrorBox id="error-text">
              {intl.formatMessage(messages.pinSequentialDigitsError)}
            </ErrorBox>
            <PINKeypad
              onComplete={this.firstPINEntry}
              key={refresher.toString()}
            />
          </>
        )}
        {pin && (
          <>
            <TitleText id="title-text">
              {intl.formatMessage(messages.reEnterTitle)}
            </TitleText>
            <DescriptionText id="description-text">
              {intl.formatMessage(messages.reEnterDescription)}
            </DescriptionText>
            <PINKeypad onComplete={this.secondPINEntry} />
          </>
        )}
      </Container>
    )
  }
}

export const CreatePin = injectIntl(CreatePinComponent)
