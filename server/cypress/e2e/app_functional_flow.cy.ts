describe('Application Functional Tests', () => {
  beforeEach(() => {
    cy.session('login', () => {
      cy.visit('/');
      cy.get('#username').type('adm12@gmail.com');
      cy.get('#pv_id_5').type('adm1234567');
      cy.get('#app button').click();
      cy.url().should('not.include', '/login');
    });
  });

  context('Menu Navigation', () => {
    it('should navigate through Resources > Users, Books, Home', () => {
      cy.visit('/');
      cy.contains('.p-menubar-item-link', 'Resources').click();
      cy.contains('.p-menubar-item-link', 'Users').click();

      cy.contains('.p-menubar-item-link', 'Resources').click();
      cy.contains('.p-menubar-item-link', 'Books').click();

      cy.contains('.p-menubar-item-link', 'Resources').click();
      cy.contains('.p-menubar-item-link', 'Home').click();
    });
  });

  context('Home Page', () => {
    it('should interact with the main select component', () => {
      cy.visit('/');
      cy.get('.p-select').click();
      cy.get('.p-select-option').first().click();
    });
  });

  context('Users Section', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.contains('.p-menubar-item-link', 'Resources').click();
      cy.contains('.p-menubar-item-link', 'Users').click();
    });

    it('should edit user name twice', () => {
      cy.get('.p-button').first().click();
      cy.get('.p-inputtext').first().clear().type('FLYNN THE CREATOR');
      cy.get('.p-datatable-row-editor-save').click();

      cy.get('.p-button').first().click();
      cy.get('.p-inputtext').first().clear().type('FLYNN THE CREATOR OFF THE GRID');
      cy.get('.p-datatable-row-editor-save').click();

      cy.wait(3000);
    });
  });

  context('Books Section', () => {
    beforeEach(() => {
      cy.visit('/');
      cy.contains('.p-menubar-item-link', 'Resources').click();
      cy.contains('.p-menubar-item-link', 'Books').click();
    });

    it('should create, edit and delete a book', () => {
      // Create
      cy.get('.p-speeddial-button').click();
      cy.get('.p-speeddial-item').first().click();
      cy.wait(300);

      cy.get(':nth-child(1) > #username').type('Ultimate Web Automation Testing with Cypress');
      cy.get(':nth-child(2) > #username').type('Vitaly Skadorva');
      cy.get(':nth-child(3) > #username').type('Orange Education Pvt Ltd');
      cy.get(':nth-child(4) > #username').type('547');
      cy.get(':nth-child(5) > #username').type('https://m.media-amazon.com/images/I/51kyNqJ7Q4L._SY445_SX342_.jpg');
      cy.get(':nth-child(6) > #username').type('https://www.amazon.com.br/...');

      cy.get('.p-dialog-footer > .p-button-outlined').click();
      cy.contains('Ultimate Web Automation Testing with Cypress');

      // Edit
      cy.contains('.p-card-body', 'Ultimate Web Automation Testing with Cypress')
        .within(() => {
          cy.contains('span.p-button-label', 'Edit').click();
        });

      cy.get(':nth-child(4) > #username').clear().type('548');
      cy.contains('Save').click();
      cy.wait(3000);

      // Delete
      cy.contains('.p-card-body', 'Ultimate Web Automation Testing with Cypress')
        .within(() => {
          cy.contains('Delete').click();
        });
    });
  });

  context('Dark Mode and Logout', () => {
    it('should toggle dark mode and logout', () => {
      cy.visit('/');
      cy.get('.p-menubar-end > .flex > .p-togglebutton').click();
      cy.wait(2000);
      cy.get('.p-menubar-end > .flex > .p-togglebutton').click();

      cy.contains('.p-menubar-item-link', 'Profile').click();
      cy.contains('.p-menubar-item-link', 'Logout').click();
      cy.get('[aria-label="Yes"]').click();
    });
  });
});
