import { makeLogin } from '../fixtures/makeLogin'
import { User } from '../fixtures/types/user'
import { createUser } from '../fixtures/createUser'

describe('Login Page', () => {
  let user: User

  before(() => {
    cy.visit('/')

    user = {
      name: 'Usuario Dummy',
      email: 'usuario@dummy.com',
      password: 'password',
    }
    createUser(user)
  })

  beforeEach(() => {
    cy.visit('/')

    makeLogin(user)
  })

  after(() => {
    cy.resetDatabase()
  })

  it('[RF013] Deve visualizar os detalhes da ação', () => {
    cy.contains('a', 'Ações').click()
    cy.get('input[name=search]').clear().type('CIEL')

    cy.contains('CIELO').should('be.visible')

    cy.get(
      '[data-testid="data-table-row-actions__dropdown-trigger__open-button"]'
    )
      .first()
      .click()

    cy.get(
      '[data-testid="data-table-row-actions__dropdown__vizualize-button"]'
    ).click({ force: true })

    cy.contains('p', 'Commercial Services').should('be.visible')
    cy.contains('R$').should('be.visible')
  })
})
