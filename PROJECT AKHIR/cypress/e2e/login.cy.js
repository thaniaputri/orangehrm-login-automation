import LoginPage from '../support/pageObjects/loginPage'
import loginData from '../fixtures/loginData.json'

describe('Scenario Login OrangeHRM', () => {

  beforeEach(() => {
    LoginPage.visitPage()
  })

  it('TC001 - Verifikasi halaman login', () => {

    LoginPage.verifyLoginPage()

  })

  it('TC002 - Berhasil login dengan credential valid', () => {

    cy.intercept( 'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary' 
            ).as('actionSummary');

    LoginPage.inputUsername(loginData.validUsername)
    LoginPage.inputPassword(loginData.validPassword)
    LoginPage.clickLogin()

    cy.wait('@actionSummary').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
    })

    LoginPage.verifyDashboard()

  })

  it('TC003 - Login dengan username invalid dan password valid', () => {

    LoginPage.inputUsername(loginData.invalidUsername)
    LoginPage.inputPassword(loginData.validPassword)
    LoginPage.clickLogin()
    LoginPage.verifyInvalidCredential()

  })

  it('TC004 - Login dengan username valid dan password invalid', () => {

    LoginPage.inputUsername(loginData.validUsername)
    LoginPage.inputPassword(loginData.invalidPassword)
    LoginPage.clickLogin()
    LoginPage.verifyInvalidCredential()

  })

  it('TC005 - Login dengan username dan password kosong', () => {

    LoginPage.clickLogin()
    LoginPage.verifyRequired()

  })

  it('TC006 - Login tanpa username', () => {

    LoginPage.inputPassword(loginData.validPassword)
    LoginPage.clickLogin()
    LoginPage.verifyRequired()

  })

  it('TC007 - Login tanpa password', () => {

    LoginPage.inputUsername(loginData.validUsername)
    LoginPage.clickLogin()
    LoginPage.verifyRequired()

  })

  it('TC008 - Login case sensitivity username & password (invalid)', () => {

  LoginPage.inputUsername(loginData.caseUpperUsername)
  LoginPage.inputPassword(loginData.caseWrongPasswordCase)
  LoginPage.clickLogin()

  LoginPage.verifyInvalidCredential()

  })

  it('TC009 - Login case sensitivity username (should still be valid login)', () => {

  cy.intercept( 'GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary' 
            ).as('actionSummary');

  LoginPage.inputUsername(loginData.caseUpperUsername)
  LoginPage.inputPassword(loginData.validPassword)
  LoginPage.clickLogin()

  cy.wait('@actionSummary').its('response.statusCode').should('eq', 200)

  LoginPage.verifyDashboard()

  })   
  
  it('TC010 - Login username dengan spasi di awal (invalid)', () => {

  LoginPage.inputUsername(loginData.usernameLeadingSpace)
  LoginPage.inputPassword(loginData.validPassword)
  LoginPage.clickLogin()

  LoginPage.verifyInvalidCredential()

  })

  it('TC011 - Login password dengan karakter spesial (invalid)', () => {

  LoginPage.inputUsername(loginData.validUsername)
  LoginPage.inputPassword(loginData.passwordSpecialChar)
  LoginPage.clickLogin()

  LoginPage.verifyInvalidCredential()

  })


})