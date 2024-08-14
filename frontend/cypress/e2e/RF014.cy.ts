import faker from '@faker-js/faker';
import { makeLogin } from '../fixtures/makeLogin';
import { User } from '../fixtures/types/user';
import { createWallet } from '../fixtures/createWallet';
import { buyStock } from '../fixtures/buyAction';

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

	it('[RF014] Deve adicionar ação na carteira', () => {
		cy.contains('a', 'Ações').click()
		
		buyStock("BAIQ39", "1")
	})

	it('[RF014E] Não deve comprar ações quando o saldo é insuficiente', () => {
		cy.contains('a', 'Ações').click()
		
		buyStock("BAIQ39", "1")

		cy.contains('Não foi possível comprar a ação').should('be.visible')
		cy.contains('Saldo insuficiente para realizar esta transação!').should('be.visible')
	})
})