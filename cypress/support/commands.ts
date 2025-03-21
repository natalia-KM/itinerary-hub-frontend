// / <reference types="cypress" />
export {}

Cypress.Commands.add('getById', (id) => {
    return cy.get(`[data-testid=${id}]`)
})

// support/commands.js
const COMMAND_DELAY = 500

const arr = ['visit', 'click', 'trigger', 'type', 'clear', 'reload', 'select']

arr.forEach((command) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Cypress.Commands.overwrite(command as unknown as keyof Cypress.Chainable<any>, (originalFn, ...args) => {
        const origVal = originalFn(...args)

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(origVal)
            }, COMMAND_DELAY)
        })
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
        }
    }
}