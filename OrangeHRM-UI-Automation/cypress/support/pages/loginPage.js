class LoginPage {

    visitPage() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }

    usernameField() {
        return cy.get("input[name='username']")
    }

    passwordField() {
        return cy.get("input[name='password']")
    }

    loginButton() {
        return cy.get("button[type='submit']")
    }

    inputUsername(username) {
        this.usernameField().clear().type(username)
    }

    inputPassword(password) {
        this.passwordField().clear().type(password)
    }

    clickLogin() {
        this.loginButton().click()
    }

    verifyDashboard() {
        cy.url().should('include', '/dashboard')
    }

    verifyInvalidCredentials() {
        cy.contains('Invalid credentials', { timeout: 10000 })
            .should('be.visible')
    }

    verifyRequiredMessage() {
        cy.contains('Required', { timeout: 10000 })
            .should('be.visible')
    }

}

export default LoginPage