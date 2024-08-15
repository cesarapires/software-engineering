import { createUser } from "../fixtures/createUser"
import { makeLogin } from "../fixtures/makeLogin"
import { User } from "../fixtures/types/user"

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

		user = {
			name: 'Usuario Dummy',
			email: 'usuario@dummy.com',
			password: 'password'
		}
	})

	after(() => {
		cy.resetDatabase()
	})

	it('RF002] Deve fazer o login quando as credenciais são válidas', () => {
		makeLogin(user)

		cy.contains('Histórico de transações').should('be.visible')
		cy.contains('Depositar').should('be.visible')
	})

	it('[RF002E] Não deve fazer o login quando as credenciais são inválidas', () => {
		user.password = 'passwordd'

		makeLogin(user)

		cy.contains('Email e/ou senha inválidos').should('be.visible')
	})


})