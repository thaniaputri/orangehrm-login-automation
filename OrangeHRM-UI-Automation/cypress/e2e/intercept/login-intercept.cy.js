describe('Login Feature OrangeHRM - Intercept', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('TC001 - Verifikasi halaman login', () => {

    cy.intercept('GET', '**/core/i18n/messages').as('messages');

    cy.reload();

    cy.wait('@messages')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);

    cy.get("input[name='username']").should('be.visible');

    cy.get("input[name='password']").should('be.visible');

    cy.get("button[type='submit']").should('be.visible');

    cy.contains('Login').should('be.visible');

  });

  it('TC002 - Berhasil Login dengan credential valid', () => {

    cy.get('[name="username"]').type('Admin');

    cy.get('[name="password"]').type('admin123');

    cy.intercept(
      'GET',
      'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary'
    ).as('actionSummary');

    cy.get('[type="submit"]').click();

    cy.wait('@actionSummary');

  });

  it('TC003 - Login dengan username invalid dan password valid', () => {
    cy.get('[name="username"]').type('USer');

    cy.get('[name="password"]').type('admin123');

    cy.get("button[type='submit']").click();

    // Assertion error message
    cy.contains('Invalid credentials').should('be.visible');

  });

  it('TC004 - Login dengan username valid dan password invalid', () => {

    cy.get("input[name='username']").type('Admin');

    cy.get("input[name='password']").type('Admin1234');

    cy.get("button[type='submit']").click();

    // Assertion error message
    cy.contains('Invalid credentials').should('be.visible');

  });

  it('TC005 - Login dengan username dan password kosong', () => {
    cy.get("button[type='submit']").click();

    // Assertion required field
    cy.contains('Required').should('be.visible');

  });

  it('TC006 - Login tanpa username', () => {
    cy.get("input[name='password']").type('admin123');

    cy.get("button[type='submit']").click();

    // Assertion required username
    cy.contains('Required').should('be.visible');

  });

  it('TC007 - Login tanpa password', () => {
    cy.get("input[name='username']").type('Admin');

    cy.get("button[type='submit']").click();

    // Assertion required password
    cy.contains('Required').should('be.visible');

  });

});