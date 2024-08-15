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

	it('[RF012] Deve listar visualizar a listagem de carteiras', () => {
		cy.contains('a', 'Ações').click()

		cy.contains('CIELO').should('be.visible')
		cy.contains('BKR SP100 DRE').should('be.visible')
		cy.contains('ILLINOIS TOODRN').should('be.visible')
	})
})