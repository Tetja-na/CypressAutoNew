describe('Перевірка кнопки Sign up та лінків з футера', () => {
  beforeEach(() => {
    cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');
  

    // Чекаємо поки завантажиться контент (наприклад, футер)
    cy.get('footer', { timeout: 100000 });
  });

  it('Кнопка Sign up присутня', () => {
    cy.contains('Sign up');
  });

it('Вивід усіх посилань', () => {
  cy.get('a').each(($el) => {
    cy.wrap($el).invoke('attr', 'href').then((href) => {
      cy.log(href);
    });
  });
});

  it('Перевірка лінка на сайт Hillel', () => {
  cy.contains('ithillel.ua', { timeout: 10000 }).should('exist');
  });
it('Перевірка email-посилання', () => {
  cy.contains('support@ithillel.ua', { timeout: 10000 }).should('exist');
});
});