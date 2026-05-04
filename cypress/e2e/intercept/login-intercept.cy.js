describe('Login Feature OrangeHRM - Intercept', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('TC001 - Verifikasi halaman login', () => {

    //Intercept load messages
    cy.intercept('GET', '**/core/i18n/messages').as('messages');

    cy.reload();

    cy.wait('@messages').its('response.statusCode').should('be.oneOf', [200, 304]);

    //Verifikasi field username tampil
    cy.get("input[name='username']").should('be.visible');

    //Verifikasi field password tampil
    cy.get("input[name='password']").should('be.visible');

    //Verifikasi tombol login tampil
    cy.get("button[type='submit']").should('be.visible');

    //Verifikasi text Login tampil
    cy.contains('Login').should('be.visible');

  });

  it('TC002 - Berhasil Login dengan credential valid', () => {

    cy.intercept('POST', '**/auth/validate').as('loginSuccess');

    cy.get("input[name='username']").type('Admin');
    cy.get("input[name='password']").type('admin123');

    cy.get("button[type='submit']").click();

    cy.wait('@loginSuccess').its('response.statusCode').should('be.oneOf', [200, 302]);

    cy.url().should("include", "/dashboard");

  });

  it('TC003 - Login dengan username invalid dan password valid', () => {

    cy.intercept('POST', '**/auth/validate').as('loginFailUser');

    cy.get("input[name='username']").type('USer');
    cy.get("input[name='password']").type('admin123');

    cy.get("button[type='submit']").click();

    cy.wait('@loginFailUser').its('response.statusCode').should('be.oneOf', [200, 302]);

    cy.contains('Invalid').should('be.visible');

  });

  it('TC004 - Login dengan username valid dan password invalid', () => {

    cy.intercept('POST', '**/auth/validate').as('loginFailPass');

    cy.get("input[name='username']").type('Admin');
    cy.get("input[name='password']").type('Admin1234');

    cy.get("button[type='submit']").click();

    cy.wait('@loginFailPass').its('response.statusCode').should('be.oneOf', [200, 302]);

    cy.contains('Invalid').should('be.visible');

  });

  it('TC005 - Login dengan username dan password kosong', () => {

    //Intercept tetap ada (biar sesuai soal)
    cy.intercept('POST', '**/auth/validate').as('emptyLogin');

    cy.get("button[type='submit']").click();


    cy.contains('Required').should('be.visible');

  });

  it('TC006 - Login tanpa username', () => {

    cy.intercept('POST', '**/auth/validate').as('noUsername');

    cy.get("input[name='password']").type('admin123');
    cy.get("button[type='submit']").click();


    cy.contains('Required').should('be.visible');

  });

  it('TC007 - Login tanpa password', () => {

    cy.intercept('POST', '**/auth/validate').as('noPassword');

    cy.get("input[name='username']").type('Admin');
    cy.get("button[type='submit']").click();

    cy.contains('Required').should('be.visible');

  });

});