

// Перекотись, що у cypress/support/e2e.js імпортується цей файл: import './commands'

Cypress.Commands.add('openUserMenu', () => {
  // Відкриваємо dropdown-меню в header (toggle кнопка)
  cy.get('header [ngbdropdown] [ngbdropdownToggle]')
    .should('exist')
    .click();
});

// Кастомна команда логіну через UI (використовує Basic Auth при заході)
Cypress.Commands.add('login', (email, password) => {
  // Відвідуємо головну сторінку з Basic Auth
  cy.visit('/', {
    auth: { username: 'guest', password: 'welcome2qauto' },
  });

  // Відкриваємо форму Sign In
  cy.contains(/sign in/i).click();

  // Вводимо дані та логінимося
  cy.get('#signinEmail').should('be.visible').type(email);
  cy.get('#signinPassword').should('be.visible').type(password, { sensitive: true });
  cy.contains('button', 'Login').click();

  // Чекаємо, що авторизація успішна
  cy.url().should('include', '/panel/garage');
});

// Перезаписуємо стандартну type(), щоб не показувати реальний пароль у логах
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    // Забираємо стандартний лог
    options.log = false;
    // Додаємо свій лог з маскою
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    });
  }
  return originalFn(element, text, options);
});




