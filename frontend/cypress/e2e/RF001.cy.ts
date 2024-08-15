import { createUser } from "../fixtures/createUser"
import { User } from "../fixtures/types/user"

describe('Login Page', () => {

	let user: User

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

  it('[RF001] Deve Criar um novo Usuário', () => {
	createUser(user)

	cy.contains('Fazer login').should('be.visible')
  })


  it('[RF001E] Não deve criar o usuário, quando o usuário já está cadastrado', () => {
	createUser(user)

	cy.contains('Falha ao cadastrar conta').should('be.visible')
	cy.contains('Email já cadastrado').should('be.visible')
  })
})