// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
Cypress.Commands.add('createExpense', (carId, liters, totalCost) => {
  const date = new Date().toISOString().split('T')[0]; // поточна дата у форматі YYYY-MM-DD

  cy.request({
    method: 'POST',
    url: '/api/expenses',
    auth: {
      username: 'guest',
      password: 'welcome2qauto'
    },
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      carId,
      liters,
      totalCost,
      price: totalCost / liters,
      date
    }
  }).then((res) => {
    expect(res.status).to.eq(201);
    expect(res.body.status).to.eq('ok');
    cy.wrap(res.body.data).as('createdExpense');
  });
  Cypress.Cookies.defaults({
  preserve: ['session_cookie_name'], // вкажи ім'я куки сесії
})
});


