export function addFunds(value: number) {
    cy.contains('a', 'Depositar').click()

	cy.get('input[name="amount"]').type(value.toString())

	cy.contains('button', 'Depositar').click()
}