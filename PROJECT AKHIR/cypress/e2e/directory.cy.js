import LoginPage from '../support/pageObjects/loginPage'
import DirectoryPage from '../support/pageObjects/directoryPage'

import loginData from '../fixtures/loginData.json'
import directoryData from '../fixtures/directoryData.json'

describe('Scenario Directory OrangeHRM', () => {

  beforeEach(() => {

    LoginPage.visitPage()

    cy.intercept(
      'POST',
      '**/auth/validate'
    ).as('loginRequest')

    LoginPage.inputUsername(loginData.validUsername)
    LoginPage.inputPassword(loginData.validPassword)
    LoginPage.clickLogin()

    cy.wait('@loginRequest')

  })

  it('TC001 - Verifikasi menu directory', () => {

    DirectoryPage.clickDirectoryMenu()
    DirectoryPage.verifyDirectoryPage()

  })

  it('TC002 - Search employee valid', () => {

    DirectoryPage.clickDirectoryMenu()

    cy.intercept(
      'GET',
      '**/directory/employees*'
    ).as('searchEmployee')

    DirectoryPage.inputEmployeeName(
      directoryData.employeeName
    )

    DirectoryPage.clickSearch()

    cy.wait('@searchEmployee')

    DirectoryPage.verifyEmployeeResult(
      directoryData.employeeName
    )

  })
  it('TC003 - Search employee invalid', () => {

  DirectoryPage.clickDirectoryMenu()

  cy.intercept(
    'GET',
    '**/directory/employees*'
  ).as('searchEmployee')

  DirectoryPage.inputEmployeeName(
    directoryData.invalidEmployee
  )

  DirectoryPage.clickSearch()

  cy.wait('@searchEmployee')
    .its('response.statusCode')
    .should('eq', 200)

  DirectoryPage.verifyDirectoryPage()

})

  it('TC004 - Verify search button visible', () => {

    DirectoryPage.clickDirectoryMenu()
    DirectoryPage.verifySearchButtonVisible()

  })

  it('TC005 - Verify reset button visible', () => {

    DirectoryPage.clickDirectoryMenu()
    DirectoryPage.verifyResetButtonVisible()

  })

  it('TC007 - Verify employee placeholder', () => {

    DirectoryPage.clickDirectoryMenu()
    DirectoryPage.verifyEmployeePlaceholder()

  })

  it('TC008 - Search employee without input', () => {

    DirectoryPage.clickDirectoryMenu()

    cy.intercept(
      'GET',
      '**/directory/employees*'
    ).as('searchEmployee')

    DirectoryPage.clickSearch()

    cy.wait('@searchEmployee')

    DirectoryPage.verifyEmployeeListVisible()

  })

  it('TC009 - Verify user can access directory page', () => {

    DirectoryPage.clickDirectoryMenu()
    DirectoryPage.verifyDirectoryPage()

  })

})