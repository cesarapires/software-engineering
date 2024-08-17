import { makeLogin } from '../fixtures/makeLogin'
import { User } from '../fixtures/types/user'
import { createWallet } from '../fixtures/createWallet'
import { buyStock } from '../fixtures/buyAction'
import { createUser } from '../fixtures/createUser'
import { addFunds } from '../fixtures/addFounds'
import { sellStock } from '../fixtures/sellAction'

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

  it('[RF0016] Deve mostrar o histórico de transação da carteira', () => {
    createWallet('Minha carteira com ações')

    addFunds(50000)

    buyStock('BAIQ39', '10')

    sellStock('10')

    cy.visit('/')

    cy.get('[data-testid="select-test"]').click()

    cy.get('.p-1 > .relative').click()

    cy.get('.text-red-9').should('be.visible')
    cy.get('.text-green-500').should('be.visible')
  })
})
