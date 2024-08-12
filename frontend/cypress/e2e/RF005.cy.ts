import faker from '@faker-js/faker';
import { makeLogin } from '../fixtures/makeLogin';
import { User } from '../fixtures/types/user';

describe('Login Page', () => {

	let user: User

	beforeEach(() => {
	  cy.visit('/')
  
	  user = {
		  name: 'Usuario Dummy',
		  email: 'usuario@dummy.com',
		  password: 'password'
	  }

	  makeLogin(user)
	})

  it('[RF005] Deve adicionar fundo na conta', () => {
	cy.contains('a', 'Depositar').click()

	cy.get('input[name="amount"]').type('50000')

	cy.contains('button', 'Depositar').click()

	cy.contains('h2', 'R$ 500,00').should('be.visible')
  })
})