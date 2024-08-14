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

	it('[RF012] Deve listar visualizar a listagem de carteiras', () => {
		cy.contains('a', 'Ações').click()
		
		cy.contains('NETEASE DRN').should('be.visible')
		cy.contains('UNITED RENTADRN').should('be.visible')
		cy.contains('GX AI TECH DRE').should('be.visible')
		cy.contains('ARES MANAGEMDRN').should('be.visible')
	  })
})