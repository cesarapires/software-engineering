import { createUser } from '../fixtures/createUser';
import { makeLogin } from '../fixtures/makeLogin';
import { User } from '../fixtures/types/user';

describe('Login Page', () => {

	let user: User

	before(() => {
		cy.visit('/')

		user = {
			name: 'Usuario Dummy',
			email: 'usuario2@dummy.com',
			password: 'password'
		}
		createUser(user)
	})

	beforeEach(() => {
	  cy.visit('/')
  
	  user = {
		  name: 'Usuario Dummy',
		  email: 'usuario2@dummy.com',
		  password: 'password'
	  }

	  makeLogin(user)
	})

  it('[RF003E] Não deve editar o perfil, quando o usuário tenta utilizar um email já cadastrado', () => {
	cy.get('img[alt="Descrição da imagem"]').click()

	cy.get('input[name="name"]').type('Usuário Dummy 2')
	cy.get('input[name="email"]').clear().type('usuario@dummy.com')

	cy.contains('button', 'Alterar usuário').click()

	cy.contains('Erro ao atualizar usuário').should('be.visible')

  })

  it('RF003] Deve editar o perfil, quando o usuário está logado', () => {
	cy.get('img[alt="Descrição da imagem"]').click()

	cy.get('input[name="name"]').type('Usuário Dummy 2')
	cy.get('input[name="email"]').clear().type('usuario2@dummy.com')

	cy.contains('button', 'Alterar usuário').click()

	cy.contains('Usuário atualizado com sucesso').should('be.visible')
	cy.contains('Depositar').should('be.visible')
  })
})