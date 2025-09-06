class GaragePage {
  addCar(brand, model, mileage) {
    cy.contains('Add car').click();
    cy.get('#addCarBrand').select(brand);
    cy.get('#addCarModel').select(model);
    cy.get('#addCarMileage').type(mileage);

    // Клік тільки по кнопці Add в модалці
    cy.get('ngb-modal-window').within(() => {
      cy.contains('button', 'Add').should('be.visible').click();
    });

    // Чекаємо, поки модалка зникне
    cy.get('ngb-modal-window').should('not.exist');
  } // 

  openExpenses() {
    cy.contains('Fuel expenses').click(); // з пробілом
  }
}

export default new GaragePage();


