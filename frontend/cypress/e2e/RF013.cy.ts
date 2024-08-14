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

	it('[RF013] Deve visualizar os detalhes da ação', () => {
		cy.contains('a', 'Ações').click()
		
		cy.contains('NETEASE DRN').should('be.visible')

		cy.get('[data-testid="data-table-row-actions__dropdown-trigger__open-button"]').first().click()

		cy.get('[data-testid="data-table-row-actions__dropdown__vizualize-button"]').click({ force: true })
			
		cy.contains('NetEase, Inc.').should('be.visible')
		cy.contains('NETE34').should('be.visible')
		cy.contains('Technology Services').should('be.visible')
		cy.contains('R$').should('be.visible')
	  })
})