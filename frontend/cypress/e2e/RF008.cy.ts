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

  it('[RF008] Deve editar o nome da carteira', () => {
	cy.contains('a', 'Carteiras').click()
	
	cy.get('[data-testid="data-table-row-actions__dropdown__edit-button"]').click();


	createWallet('Minha nova carteira 2')
  })

  it('[RF008E] Não deve editar o nome da carteira, quando se tenta renomear com um nome já existente', () => {
	cy.contains('a', 'Carteiras').click()
	
	cy.contains('Minha nova carteira').should('be.visible')

	createWallet('Minha nova carteira 2')
  })
})