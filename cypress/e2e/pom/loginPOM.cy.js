import LoginPage from "../../support/pages/loginPage"

describe('Login Feature OrangeHRM POM', () => {

    const loginPage = new LoginPage()

    beforeEach(() => {
        loginPage.visitPage()
    })

    it('TC001 - Verifikasi halaman login', () => {

        loginPage.usernameField().should('be.visible')
        loginPage.passwordField().should('be.visible')
        loginPage.loginButton().should('be.visible')

        cy.contains('Login').should('be.visible')

    })

    it('TC002 - Berhasil Login dengan credential valid', () => {

        cy.fixture('loginData').then((data) => {

            loginPage.inputUsername(data.validUser.username)
            loginPage.inputPassword(data.validUser.password)
            loginPage.clickLogin()

            loginPage.verifyDashboard()

        })

    })

    it('TC003 - Login dengan username invalid dan password valid', () => {

        cy.fixture('loginData').then((data) => {

            loginPage.inputUsername(data.invalidUsername.username)
            loginPage.inputPassword(data.invalidUsername.password)
            loginPage.clickLogin()

            loginPage.verifyInvalidCredentials()

        })

    })

    it('TC004 - Login dengan username valid dan password invalid', () => {

        cy.fixture('loginData').then((data) => {

            loginPage.inputUsername(data.invalidPassword.username)
            loginPage.inputPassword(data.invalidPassword.password)
            loginPage.clickLogin()

            loginPage.verifyInvalidCredentials()

        })

    })

    it('TC005 - Login dengan username dan password kosong', () => {

        loginPage.clickLogin()

        loginPage.verifyRequiredMessage()

    })

    it('TC006 - Login tanpa username', () => {

        cy.fixture('loginData').then((data) => {

            loginPage.inputPassword(data.validUser.password)
            loginPage.clickLogin()

            loginPage.verifyRequiredMessage()

        })

    })

    it('TC007 - Login tanpa password', () => {

        cy.fixture('loginData').then((data) => {

            loginPage.inputUsername(data.validUser.username)
            loginPage.clickLogin()

            loginPage.verifyRequiredMessage()

        })

    })

})