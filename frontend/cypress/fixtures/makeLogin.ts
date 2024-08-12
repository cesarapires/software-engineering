import { User } from "./types/user"


export function makeLogin(user: User) {
    cy.get('input[name="email"]').type(user.email)
	cy.get('input[name="password"]').type(user.password)

    cy.get('button[type="submit"]').click()
}