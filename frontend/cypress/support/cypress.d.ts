// cypress/support/index.d.ts
declare namespace Cypress {
    interface Chainable {
        /**
         * Comando personalizado para resetar o banco de dados.
         * @example cy.resetDatabase()
         */
        resetDatabase(): Chainable<void>;
    }
}