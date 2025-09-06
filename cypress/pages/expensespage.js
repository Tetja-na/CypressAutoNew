class ExpensesPage {
  addExpense({ mileage, liters, totalCost }) {
  cy.contains('Add an expense').click();

  cy.get('#addExpenseMileage').clear().type(mileage);
  cy.get('#addExpenseLiters').type(liters); //  тут буде undefined, якщо liters не передано
  cy.get('#addExpenseTotalCost').type(totalCost);

  cy.get('ngb-modal-window').within(() => {
    cy.contains('button', 'Add').click();
  });

  cy.get('ngb-modal-window').should('not.exist');
   
  
  }
}

export default new ExpensesPage();




