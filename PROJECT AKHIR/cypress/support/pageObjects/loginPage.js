class LoginPage {

  visitPage() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  }

  inputUsername(username) {
    cy.get("input[name='username']").clear().type(username)
  }

  inputPassword(password) {
    cy.get("input[name='password']").clear().type(password)
  }

  clickLogin() {
    cy.get("button[type='submit']").click()
  }

  verifyLoginPage() {
    cy.get("input[name='username']").should('be.visible')
    cy.get("input[name='password']").should('be.visible')
    cy.get("button[type='submit']").should('be.visible')
    cy.contains('Login').should('be.visible')
  }

  verifyDashboard() {
    cy.url().should('include', '/dashboard')
  }

  verifyInvalidCredential() {
  cy.get('.oxd-alert-content-text')
    .should('contain.text', 'Invalid credentials')
  }

  verifyRequired() {
    cy.contains('Required').should('be.visible')
    
  }


}

export default new LoginPage()