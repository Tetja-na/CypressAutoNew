/// <reference types="cypress" />

import GaragePage from '../pages/garagePage';
import LoginPage from '../pages/loginPage';
import ExpensesPage from '../pages/expensesPage';

describe('Car & Expense API + UI tests with intercept, alias and fixtures', () => {
  let createdCarId;

  before(() => {
    cy.fixture('carData').as('carData');
  });

  beforeEach(function () {
    // логін через UI (використай Page Object)
    LoginPage.openLogin();
    LoginPage.login(Cypress.env('username'), Cypress.env('password'));
    cy.url().should('include', '/panel/garage');
  });

  it('Intercept and alias POST /api/cars when creating car via UI', function () {
    const car = this.carData;

    cy.intercept('POST', '/api/cars').as('postCar');

    GaragePage.addCar(car.brand, car.model, car.mileage.toString());

    cy.wait('@postCar').then(({ response }) => {
      expect(response.statusCode).to.eq(201);
      createdCarId = response.body.data.id;
      expect(createdCarId).to.exist;
      // Зберігаємо у фікстуру, якщо потрібно
      cy.writeFile('cypress/fixtures/carId.json', { id: createdCarId });
    });

    cy.contains(car.brand).should('be.visible');
    cy.contains(car.model).should('be.visible');
  });

  it('Validate created car via GET /api/cars', function () {
    cy.request({
      method: 'GET',
      url: '/api/cars'
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      const cars = resp.body.data;
      const car = cars.find(c => c.id === createdCarId);
      expect(car).to.exist;
      expect(car.brand).to.eq(this.carData.brand);
      expect(car.model).to.eq(this.carData.model);
    });
  });

  it('Create expense via API using intercept and alias', function () {
    cy.intercept('POST', '/api/expenses').as('createExpense');

    cy.createExpense(createdCarId, {
      mileage: this.carData.mileage,
      liters: this.carData.liters,
      totalCost: this.carData.totalCost
    });

    cy.wait('@createExpense').its('response.statusCode').should('eq', 201);
  });

  it('Validate expense in UI for that car', function () {
    cy.visit('/panel/garage');
    GaragePage.openExpenses();

    cy.contains(this.carData.totalCost.toString()).should('be.visible');
    cy.contains(this.carData.liters.toString()).should('be.visible');
  });
});
