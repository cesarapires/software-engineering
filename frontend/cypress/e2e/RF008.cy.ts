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
	
	cy.get('[data-testid="data-table-row-actions__dropdown-trigger__open-button"]').first().click()

	cy.get('[data-testid="data-table-row-actions__dropdown__edit-button"]').click({ force: true })

    cy.get('input[name="description"]').type('Minha nova carteira editada')

	cy.get('button[type="submit"]').click()

	cy.contains('Minha nova carteira editada').should('be.visible')
  })

  it('[RF008E] Não deve editar o nome da carteira, quando se tenta renomear com um nome já existente', () => {
	cy.contains('a', 'Carteiras').click()
	
	cy.get('[data-testid="data-table-row-actions__dropdown-trigger__open-button"]').first().click()

	cy.get('[data-testid="data-table-row-actions__dropdown__edit-button"]').click({ force: true })

	cy.get('input[name="description"]').type('Minha nova carteira editada')

	cy.get('button[type="submit"]').click()

	cy.contains('Erro ao editar carteira').should('be.visible')
	cy.contains('Carteira já existe para esse usuário').should('be.visible')
  })
})