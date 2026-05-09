class ForgotPasswordPage {

  clickForgotPassword() {
    cy.contains('Forgot your password').click()
  }

  verifyForgotPasswordPage() {
    cy.url().should('include', 'requestPasswordResetCode')
  }

  inputUsername(username) {
    cy.get("input[name='username']")
      .clear()
      .type(username)
  }

  clickResetPassword() {
    cy.get("button[type='submit']").click()
  }

  clickCancelButton() {
    cy.contains('Cancel').click()
  }

  verifyResetPasswordSuccess() {
    cy.contains('Reset Password link sent successfully')
      .should('be.visible')
  }

  verifyRequiredMessage() {
    cy.contains('Required').should('be.visible')
  }

  verifyBackToLoginPage() {
    cy.url().should('include', '/auth/login')
  }

}

export default new ForgotPasswordPage()