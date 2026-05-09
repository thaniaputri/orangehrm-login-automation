class DirectoryPage {

  clickDirectoryMenu() {
    cy.contains('Directory').click()
  }

  verifyDirectoryPage() {
    cy.url().should('include', '/directory')
  }

  inputEmployeeName(employeeName) {
    cy.get('input[placeholder="Type for hints..."]')
      .eq(0)
      .clear()
      .type(employeeName)
  }

  clickSearch() {
    cy.contains('Search').click()
  }

  clickReset() {
    cy.contains('Reset').click()
  }

  verifyEmployeeResult(employeeName) {
  cy.contains('.orangehrm-directory-card', employeeName)
    .should('exist')
}

  verifyNoResult() {
  cy.url().should('include', '/directory')
}

  verifyEmptyEmployeeInput() {
    cy.get('.oxd-autocomplete-text-input > input')
      .eq(0)
      .should('have.value', '')
  }

  verifySearchButtonVisible() {
    cy.contains('Search').should('be.visible')
  }

  verifyResetButtonVisible() {
    cy.contains('Reset').should('be.visible')
  }

  verifyEmployeePlaceholder() {
    cy.get('.oxd-autocomplete-text-input > input')
      .eq(0)
      .should('have.attr', 'placeholder')
  }

  verifyEmployeeListVisible() {
    cy.get('.oxd-sheet').should('be.visible')
  }

}

export default new DirectoryPage()