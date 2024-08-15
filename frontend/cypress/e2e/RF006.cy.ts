import faker from '@faker-js/faker';
import { makeLogin } from '../fixtures/makeLogin';
import { User } from '../fixtures/types/user';
import { createWallet } from '../fixtures/createWallet';
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

  it('[RF006] Deve adicionar nova carteira', () => {
	createWallet('Minha nova carteira')

	cy.contains('Minha nova carteira').should('be.visible')
  })

  it('[RF006E] Não eve adicionar nova carteira, quando a descrição já está em uso', () => {
	createWallet('Minha nova carteira')

	cy.contains('Erro ao criar carteira').should('be.visible')
	cy.contains('Carteira já existe para esse usuário').should('be.visible')
  })
})