// / <reference types="cypress" />
export {}

Cypress.Commands.add('getById', (id) => {
    return cy.get(`[data-testid=${id}]`)
})

Cypress.Commands.add('mockClipboard', (value: string) => {
    cy.window().then((win) => {
        cy.stub(win.navigator.clipboard, 'readText').resolves(value)
    })
})

Cypress.Commands.add('rejectClipboard', () => {
    cy.window().then((win) => {
        cy.stub(win.navigator.clipboard, 'writeText')
            .rejects(new Error('Clipboard permission denied'))
    })
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
            mockClipboard: (value: string) => void
            rejectClipboard: () => void
        }
    }
}