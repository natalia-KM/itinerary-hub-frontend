import { apiInterceptor } from 'cypress/api/ApiInterceptor'

describe('Public Pages', () => {
    describe('unauthenticated visitors', () => {
        beforeEach(() => {
            apiInterceptor.interceptGetUserDetails({ status: 401 })
        })

        it('can view the privacy policy without being redirected to login', () => {
            cy.visit('/privacy-policy')

            cy.location('pathname', { timeout: 60000 }).should('eq', '/privacy-policy')

            cy.contains('Privacy Policy').should('be.visible')
            cy.contains('Information We Collect').should('be.visible')

            // No account menu for a logged-out visitor
            cy.getById('top-bar').should('be.visible')
            cy.getById('top-bar-account-btn').should('not.exist')
        })

        it('can view the help page without being redirected to login', () => {
            cy.visit('/help')

            cy.location('pathname', { timeout: 60000 }).should('eq', '/help')

            cy.contains('Help Page').should('be.visible')
        })
    })

    describe('authenticated users', () => {
        it('still see the account menu on the privacy policy page', () => {
            apiInterceptor.interceptGetUserDetails({})

            cy.visit('/privacy-policy')

            cy.location('pathname', { timeout: 60000 }).should('eq', '/privacy-policy')

            cy.getById('top-bar-account-btn').should('be.visible')
        })
    })
})
