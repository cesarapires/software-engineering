import { makeLogin } from '../fixtures/makeLogin'
import { User } from '../fixtures/types/user'
import { createWallet } from '../fixtures/createWallet'
import { createUser } from '../fixtures/createUser'
import { buyStock } from '../fixtures/buyAction'
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

  it('[RF010] Deve visualizar a carteira', () => {
    createWallet('Minha nova carteira')

    addFunds(50000)

    buyStock('BAIQ39', '1')

    cy.contains('a', 'Carteiras').click()

    cy.get(
      '[data-testid="data-table-row-actions__dropdown-trigger__open-button"]'
    ).click()

    cy.get(
      '[data-testid="data-table-row-actions__dropdown__vizualize-button"]'
    ).click()

    cy.contains('h1', 'Minha nova carteira').should('be.visible')
  })
})
