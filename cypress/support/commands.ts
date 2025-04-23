// / <reference types="cypress" />
export {}

Cypress.Commands.add('getById', (id) => {
    return cy.get(`[data-testid=${id}]`)
})

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to select DOM element by data-cy attribute.
             * @example cy.dataCy('greeting')
             */
            getById: (value: string) => Chainable<JQuery<HTMLElement>>
        }
    }
}