export function buyStock(stockId: string, quantity: string = "1") {

    cy.get('[data-testid="data-table-row-actions__dropdown-trigger__open-button"]').first().click()

    cy.get('[data-testid="data-table-row-actions__dropdown__buy-button"]').click({ force: true })
    
    cy.get('[data-testid="test"]').click()

    cy.get('.p-1 > .relative').click()
    
    cy.get('input[name="quantidade"]').clear().type(quantity)

    cy.get('button[type="submit"]').click()
}