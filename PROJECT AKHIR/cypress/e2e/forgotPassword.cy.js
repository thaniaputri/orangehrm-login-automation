import LoginPage from '../support/pageObjects/loginPage'
import ForgotPasswordPage from '../support/pageObjects/forgotPassword'

import forgotPasswordData from '../fixtures/forgotPasswordData.json'

describe('Scenario Forgot Password OrangeHRM', () => {

  beforeEach(() => {

    LoginPage.visitPage()

  })

  it('TC001 - Verify forgot password page', () => {

    ForgotPasswordPage.clickForgotPassword()
    ForgotPasswordPage.verifyForgotPasswordPage()

  })

  it('TC002 - Reset password with valid username', () => {

    ForgotPasswordPage.clickForgotPassword()
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('resetPassword')

    ForgotPasswordPage.inputUsername(
      forgotPasswordData.validUsername
    )

    ForgotPasswordPage.clickResetPassword()
    ForgotPasswordPage.verifyResetPasswordSuccess()

  })

  it('TC003 - Reset password without username', () => {

    ForgotPasswordPage.clickForgotPassword()
    ForgotPasswordPage.clickResetPassword()
    ForgotPasswordPage.verifyRequiredMessage()

  })

  it('TC004 - Verify cancel button', () => {

    ForgotPasswordPage.clickForgotPassword()
    ForgotPasswordPage.clickCancelButton()
    ForgotPasswordPage.verifyBackToLoginPage()

  })

  it('TC005 - Verify username field visible', () => {

    ForgotPasswordPage.clickForgotPassword()

    cy.get("input[name='username']")
      .should('be.visible')

  })

})