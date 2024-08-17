import { makeLogin } from '../fixtures/makeLogin'
import { User } from '../fixtures/types/user'
import { createWallet } from '../fixtures/createWallet'
import { buyStock } from '../fixtures/buyAction'
import { createUser } from '../fixtures/createUser'
import { addFunds } from '../fixtures/addFounds'

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

  it('[RF009] Deve excluir a carteira', () => {
    createWallet('Minha nova carteira')

    cy.get(
      '[data-testid="data-table-row-actions__dropdown-trigger__open-button"]'
    )
      .first()
      .click()

    cy.get(
      '[data-testid="data-table-row-actions__dropdown__delete-button"]'
    ).click({ force: true })

    cy.get(
      '[data-testid="modal-excluir-carteira__dialog-content__checkbox"]'
    ).click()

    cy.get(
      '[data-testid="modal-excluir-carteira__dialog-footer__delete-button"]'
    ).click()

    cy.contains('body', 'Minha nova carteira').should('not.exist')
  })

  it('[RF009E] Não deve excluir a carteira, quando se ainda tem ações na carteira', () => {
    createWallet('Minha carteira com ações')

    addFunds(50000)

    buyStock('BAIQ39', '1')

    cy.contains('a', 'Carteiras').click()

    cy.get(
      '[data-testid="data-table-row-actions__dropdown-trigger__open-button"]'
    )
      .first()
      .click()

    cy.get(
      '[data-testid="data-table-row-actions__dropdown__delete-button"]'
    ).click({ force: true })

    cy.get(
      '[data-testid="modal-excluir-carteira__dialog-content__checkbox"]'
    ).click()

    cy.get(
      '[data-testid="modal-excluir-carteira__dialog-footer__delete-button"]'
    ).click()

    cy.contains('Não foi possível deletar a carteira!').should('be.visible')
  })
})
