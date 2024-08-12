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

  it('[RF007] Deve listar as carteiras do usuário', () => {
	cy.contains('a', 'Carteiras').click()
	
	cy.contains('Minha nova carteira').should('be.visible')
  })
})