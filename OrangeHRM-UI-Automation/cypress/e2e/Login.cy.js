describe('Login Feature OrangeHRM', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  it('TC001 - Verifikasi halaman login', () => {

  //Visit halaman login
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

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

    //Input username
    cy.get("input[name='username']").type('Admin');

    //Input password
    cy.get("input[name='password']").type('admin123');

    //Click submit
    cy.get("button[type='submit']").click();

    //Assertions
    cy.url().should("include", "/dashboard");

  });

  it('TC003 - Login dengan username invalid dan password valid', () => {

    //Input username
    cy.get("input[name='username']").type('USer');

    //Input password
    cy.get("input[name='password']").type('admin123');

    //Click submit
    cy.get("button[type='submit']").click();

    //Assertions
    cy.contains('Invalid credentials').should('be.visible');

  });

  it('TC004 - Login dengan username valid dan password invalid', () => {

  //Input username
  cy.get("input[name='username']").type('Admin');

  //Input password (invalid)
  cy.get("input[name='password']").type('Admin1234');

  //Click submit
  cy.get("button[type='submit']").click();

  //Assertions
  cy.contains('Invalid credentials').should('be.visible');

});
  it('TC005 - Login dengan username dan password kosong', () => {

  //Click submit tanpa isi apapun
  cy.get("button[type='submit']").click();

  //Assertions
  cy.contains('Required').should('be.visible');

});
  it('TC006 - Login tanpa username', () => {

  //Input password
  cy.get("input[name='password']").type('admin123');

  //Click submit
  cy.get("button[type='submit']").click();

  //Assertions
  cy.contains('Required').should('be.visible');

});
  it('TC007 - Login tanpa password', () => {

  //Input username
  cy.get("input[name='username']").type('Admin');

  //Kosongkan password (tidak diisi)

  //Click submit
  cy.get("button[type='submit']").click();

  //Assertions
  cy.contains('Required').should('be.visible');

});

});