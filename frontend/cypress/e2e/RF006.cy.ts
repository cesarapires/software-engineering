import faker from '@faker-js/faker';
import { makeLogin } from '../fixtures/makeLogin';
import { User } from '../fixtures/types/user';
import { createWallet } from '../fixtures/createWallet';

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

  it('[RF006] Deve adicionar nova carteira', () => {
	cy.contains('a', 'Carteiras').click()

	createWallet('Minha nova carteira')

	cy.contains('Minha nova carteira').should('be.visible')
  })

  it('[RF006E] Não eve adicionar nova carteira, quando a descrição já está em uso', () => {
	cy.contains('a', 'Carteiras').click()

	createWallet('Minha nova carteira')

	cy.contains('Erro ao criar carteira').should('be.visible')
	cy.contains('Carteira já existe para esse usuário').should('be.visible')
  })
})