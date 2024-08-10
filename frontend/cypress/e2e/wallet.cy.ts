import { generateName } from '../support/helpers'

describe('wallet spec', () => {
  let entityName: string = ''
  beforeEach(() => {
    entityName = generateName('Wallet')
  })
  it('should create wallet', () => {
    cy.visit('http://localhost:3005')
    cy.get('#\\:R5kvf6cq\\:-form-item').type('jean@teste.com')
    cy.get('#\\:R9kvf6cq\\:-form-item').type('123456')
    cy.get('.inline-flex').click()
    cy.get('#nav_carteira > span').click()
    cy.get(
      '.space-y-4 > div.justify-between > :nth-child(2) > .inline-flex'
    ).click()
    cy.get(
      '[data-testid="modal-nova-carteira__dialog__wallet-description"]'
    ).type(entityName)
    cy.get('.flex-col-reverse > .inline-flex').click()
    cy.get('.flex-1 > .flex').type(entityName)
    cy.get('.border-b > :nth-child(1) > .flex > span').should(
      'have.text',
      entityName
    )
    cy.get('.max-w-\\[80px\\]').should('have.text', 'R$ 0,00')
    cy.get(
      '[data-testid="data-table-row-actions__dropdown-trigger__open-button"]'
    ).click()
    cy.get(
      '[data-testid="data-table-row-actions__dropdown__delete-button"]'
    ).click()
    cy.get(
      '[data-testid="modal-excluir-carteira__dialog-content__checkbox"]'
    ).click()
    cy.get(
      '[data-testid="modal-excluir-carteira__dialog-footer__delete-button"]'
    ).click()
    cy.get('.grid > .text-sm').should(
      'have.text',
      'Carteira excluída com sucesso!'
    )
    cy.get('.border-b > .p-4').should('have.text', 'Sem resultados')
  })
})
