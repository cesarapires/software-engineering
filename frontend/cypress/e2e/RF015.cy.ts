import { makeLogin } from '../fixtures/makeLogin';
import { User } from '../fixtures/types/user';
import { createWallet } from '../fixtures/createWallet';
import { buyStock } from '../fixtures/buyAction';
import { createUser } from '../fixtures/createUser';
import { addFunds } from '../fixtures/addFounds';
import { sellStock } from '../fixtures/sellAction';

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

	it('[RF0015E] Não deve vender as ações da carteira se a quantidade comprada for maior que o em posse', () => {
		createWallet('Minha carteira com ações')

		addFunds(50000)

		buyStock("BAIQ39", "1")

		sellStock('10')

		cy.contains('Não foi possível vender a ação').should('be.visible')
		cy.contains('Quantidade insuficiente para venda').should('be.visible')
	})

	it('[RF0015] Deve vender as ações da carteira', () => {
		sellStock('1')

		cy.contains('R$ 0').should('be.visible')
	})
})