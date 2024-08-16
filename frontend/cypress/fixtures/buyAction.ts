export function buyStock(stockId: string, quantity: string = "1", walletPosition: string = '1') {
    cy.contains('a', 'Ações').click()
    
    cy.get(':nth-child(7) > :nth-child(5) > [data-testid="data-table-row-actions__dropdown-trigger__open-button"]').click()

    cy.get('[data-testid="data-table-row-actions__dropdown__buy-button"]').click({ force: true })
    
    cy.get('[data-testid="select-test"]').click()

    cy.get(`.p-${walletPosition} > .relative`).click()
    
    cy.get('input[name="quantidade"]').clear().type(quantity)

    cy.get('button[type="submit"]').click()
}