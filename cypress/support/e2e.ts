import './commands'
import '@cypress/code-coverage/support'
import 'cypress-real-events'

before(() => {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(4000)
})