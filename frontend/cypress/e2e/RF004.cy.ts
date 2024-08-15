import faker from '@faker-js/faker';
import { makeLogin } from '../fixtures/makeLogin';
import { User } from '../fixtures/types/user';
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

	it('[RF004E] Não deve editar a senha, quando a senha antiga é inválida', () => {
		cy.get('button[type="submit"]').click()

		cy.contains('a', 'Editar Senha').click()

		cy.get('input[name="oldPassword"]').type('passwordd')
		cy.get('input[name="newPassword"]').type('password')
		cy.get('input[name="confirmPassword"]').type('password')

		cy.contains('button', 'Alterar senha').click()

		cy.contains('Erro ao alterar senha').should('be.visible')
	})

	it('RF004] Deve editar a senha, quando o usuário está logado', () => {
		cy.get('button[type="submit"]').click()

		cy.contains('a', 'Editar Senha').click()

		cy.get('input[name="oldPassword"]').type('password')
		cy.get('input[name="newPassword"]').type('password')
		cy.get('input[name="confirmPassword"]').type('password')

		cy.contains('button', 'Alterar senha').click()

		cy.contains('Senha alterada com sucesso').should('be.visible')
		cy.contains('Depositar').should('be.visible')
	})
})