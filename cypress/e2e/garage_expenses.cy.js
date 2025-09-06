import GaragePage from '../pages/garagePage';
import ExpensesPage from '../pages/expensesPage';
import LoginPage from '../pages/loginPage'; //  цей імпорт важливий

describe('Garage and Expenses Tests', () => {
  const email = Cypress.env('username');
  const password = Cypress.env('password');

  beforeEach(() => {
    LoginPage.openLogin(); // visit з basic auth
    LoginPage.login(email, password);
    cy.url().should('include', '/panel/garage');
  });

  it('Додавання нового авто', () => {
    GaragePage.addCar('Audi', 'Q7', '20000');
    cy.contains('Audi Q7').should('be.visible');
  });

  it('Додавання витрат на паливо', () => {
    GaragePage.addCar('Audi', 'Q7', '20000');
    GaragePage.openExpenses();
    ExpensesPage.addExpense({
      mileage: '200000',
      liters: '40',
      totalCost: '60'
    });

    cy.contains('40L').should('be.visible');
    cy.contains('60').should('be.visible');
  });
});

