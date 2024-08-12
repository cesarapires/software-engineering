import { User } from "./types/user"

export function createUser(user: User) {
    cy.contains('a', 'Crie sua conta').click()

    cy.get('input[name="nome"]').type(user.name ?? '')
    cy.get('input[name="email"]').type(user.email)
    cy.get('input[name="password"]').type(user.password)
    cy.get('input[name="confirmPassword"]').type(user.password)

    cy.contains('button', 'Criar conta').click()
}