describe('Registration Tests', () => {
  let email;
  const password = 'Test1234';

  beforeEach(() => {
    // Кожен тест повинен мати унікальний email, щоби уникнути конфліктів
    email = `user+${Date.now()}@test.com`;

    // Відкриваємо сайт з Basic Auth, щоб не отримувати 401
    cy.visit('/', {
      auth: { username: 'guest', password: 'welcome2qauto' },
    });

    // Відкриваємо модалку Sign up
    cy.contains(/sign up/i).click();
  });

  it('Validates required fields', () => {
    // Щоб Angular показав помилку, треба "тригернути" валідацію:
    // вводимо символ, видаляємо його та робимо blur
    cy.get('#signupName').type('x').clear().blur();
    cy.get('#signupLastName').type('x').clear().blur();
    cy.get('#signupEmail').type('x').clear().blur();
    cy.get('#signupPassword').type('x').clear().blur();
    cy.get('#signupRepeatPassword').type('x').clear().blur();

    // Чекаємо, що повідомлення про помилку з'являться (більш гнучкий підхід - regex)
    cy.contains(/name\s*(is\s*)?required/i, { timeout: 10000 }).should('be.visible');
    cy.contains(/last\s*name\s*(is\s*)?required/i).should('be.visible');
    cy.contains(/email\s*(is\s*)?required/i).should('be.visible');
    cy.contains(/password\s*(is\s*)?required/i).should('be.visible');
    cy.contains(/re-?enter\s*password\s*(is\s*)?required/i).should('be.visible');

    // Кнопка реєстрації має залишатися disabled у разі помилок
    cy.contains('button', 'Register').should('be.disabled');
  });

  it('Registers with valid data', () => {
    cy.get('#signupName').type('Teti');
    cy.get('#signupLastName').type('Grun');
    cy.get('#signupEmail').type(email);
    cy.get('#signupPassword').type(password, { sensitive: true });
    cy.get('#signupRepeatPassword').type(password, { sensitive: true });

    // Чекаємо, поки кнопка стане enabled, і тільки потім клікаємо
    cy.contains('button', 'Register').should('be.enabled').click();

    // Після реєстрації перевіряємо, що потрапили в гараж
    cy.url().should('include', '/panel/garage');
    cy.contains('Add car').should('be.visible');
  });

  it('Can log in with created user', () => {
    // Спочатку зареєструємо користувача
    cy.get('#signupName').type('Teti');
    cy.get('#signupLastName').type('Grun');
    cy.get('#signupEmail').type(email);
    cy.get('#signupPassword').type(password, { sensitive: true });
    cy.get('#signupRepeatPassword').type(password, { sensitive: true });
    cy.contains('button', 'Register').should('be.enabled').click();

    // Після реєстрації — відкриваємо меню користувача і виходимо
    cy.openUserMenu();
    cy.contains(/logout/i, { timeout: 10000 }).should('be.visible').click();

    // Тепер залогінюємося через кастомну команду (вона робить visit з auth + UI логін)
    cy.login(email, password);

    // Після логіну маємо опинитись в гаражі
    cy.url().should('include', '/panel/garage');
    cy.contains('Add car').should('be.visible');
  });
});

