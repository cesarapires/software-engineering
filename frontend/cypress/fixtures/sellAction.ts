export function sellStock(quantity: string = "1", walletPosition: string = '1') {
    cy.contains('a', 'Carteiras').click()
		
    cy.get('[data-testid="data-table-row-actions__dropdown-trigger__open-button"]').click()

    cy.get('[data-testid="data-table-row-actions__dropdown__vizualize-button"]').click()

    cy.contains('Minha carteira com ações').should('be.visible')

    cy.get('[data-testid="data-table-row-actions__dropdown-trigger__open-stock-button"]').click()

    cy.get('[data-testid="data-table-row-actions__dropdown-trigger__sell-button"]').click()

    cy.get('input[name="quantidade"]').clear().type(quantity)

    cy.get('button[type="submit"]').click()
}