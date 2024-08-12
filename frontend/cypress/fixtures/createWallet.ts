export function createWallet(walletName: string) {
	cy.contains('button', 'Criar nova carteira').click()

    cy.get('input[name="description"]').type(walletName)

	cy.get('button[type="submit"]').click()
}