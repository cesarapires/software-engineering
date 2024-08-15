import { makeLogin } from '../fixtures/makeLogin';
import { User } from '../fixtures/types/user';
import { createUser } from '../fixtures/createUser';
import { createWallet } from '../fixtures/createWallet';

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
	  
	  createWallet('Minha nova carteira')
	})

	after(() => {
		cy.resetDatabase()
	})

  it('[RF007] Deve listar as carteiras do usuário', () => {
	cy.contains('a', 'Carteiras').click()
	
	cy.contains('Minha nova carteira').should('be.visible')
  })
})