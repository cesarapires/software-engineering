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

  it('[RF014] Deve adicionar ação na carteira', () => {
    createWallet('Minha nova carteira')

    addFunds(50000)

    buyStock('BAIQ39', '1')
    cy.contains('Ações adicionadas a carteira com sucesso').should('be.visible')
  })

  it('[RF014E] Não deve comprar ações quando o saldo é insuficiente', () => {
    cy.contains('a', 'Ações').click()

    buyStock('BAIQ39', '1000')

    cy.contains('Não foi possível comprar a ação').should('be.visible')
    cy.contains('Saldo insuficiente para realizar esta transação!').should(
      'be.visible'
    )
  })
})
