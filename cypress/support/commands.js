// ✅ Це має бути першим рядком у cypress/support/e2e.js
// import './commands'
//  Команда для відкриття меню користувача
Cypress.Commands.add('openUserMenu', () => {
  cy.get('header [ngbdropdown] [ngbdropdownToggle]')
    .should('exist')
    .click();
});

//  Кастомна команда логіну через UI (використовує Basic Auth)
Cypress.Commands.add('login', (email, password) => {
  // Basic Auth
  cy.visit('/', {
    auth: { username: 'guest', password: 'welcome2qauto' },
  });

  // Відкриваємо форму входу
  cy.contains(/sign in/i).click();

  // Заповнюємо форму
  cy.get('#signinEmail').should('be.visible').type(email);
  cy.get('#signinPassword').should('be.visible').type(password, { sensitive: true });
  cy.contains('button', 'Login').click();

  // Перевірка, що ми у гаражі
  cy.url().should('include', '/panel/garage');
});

// ✅ Кастомна команда створення витрати
Cypress.Commands.add('createExpense', (carId, expenseData) => {
  cy.request({
    method: 'POST',
    url: '/api/expenses',
    body: {
      carId,
      ...expenseData
    }
  }).then((response) => {
    expect(response.status).to.eq(201);
    expect(response.body.status).to.eq('ok');
  });
// Маскування пароля в логах
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options.log = false;
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    });
  }
  return originalFn(element, text, options);
})
 })