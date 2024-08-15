import faker from '@faker-js/faker';
import { makeLogin } from '../fixtures/makeLogin';
import { User } from '../fixtures/types/user';
import { addFunds } from '../fixtures/addFounds';
import { createUser } from '../fixtures/createUser';

describe('Login Page', () => {

	let user: User

	before(() => {
		cy.visit('/')

		user = {
			name: 'Usuario Dummy',
			email: 'usuario@dummy.com',
			password: 'password'
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

  it('[RF005] Deve adicionar fundo na conta', () => {
	addFunds(50000)

	cy.contains('h2', 'R$ 500,00').should('be.visible')
  })
})