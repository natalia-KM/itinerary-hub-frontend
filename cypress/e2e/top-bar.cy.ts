import { topBar } from '../fixtures/pages/TopBar'
import { apiInterceptor } from '../api/ApiInterceptor'
import { useGetUserDetailsResponses } from 'hooks/useGetUserDetails'
import { modals } from '../fixtures/modules/Modals'

describe('Top Bar', () => {

    beforeEach(() => {
        apiInterceptor.interceptGetUserDetails({ manualResolution: false })
        apiInterceptor.interceptGetAllTrips({})
    })

    it('should have all elements visible', () => {
        cy.visit('http://localhost:3000/dashboard')

        topBar.topBar.should('be.visible')

        topBar.logo.should('be.visible')
        topBar.helpButton.should('be.visible')
        topBar.accountButton.should('be.visible')

        topBar.homeButton.should('not.exist') // only visible on Help Page
    })


    it('should show help menu on help icon click', () => {
        cy.visit('http://localhost:3000/dashboard')

        topBar.topBar.should('be.visible')
        topBar.accountButton.should('be.visible')

        topBar.helpButton.should('be.visible').click()

        topBar.helpMenu.should('be.visible')
        topBar.helpRedirectButton
            .should('be.visible')
    })

    it('should redirect to home on logo click', () => {
        cy.visit('http://localhost:3000/help')

        topBar.logo
            .should('be.visible')
            .click()

        cy.location('pathname', { timeout: 60000 })
            .should('include', '/dashboard')

        topBar.helpButton.should('be.visible')
    })

    it('should redirect to home on home btn click', () => {
        cy.visit('http://localhost:3000/help')

        topBar.homeButton.should('be.visible').click()

        cy.location('pathname', { timeout: 60000 })
            .should('include', '/dashboard')

        topBar.helpButton.should('be.visible')
        topBar.homeButton.should('not.exist')
    })

    describe('Account menu', () => {
        beforeEach(() => {
            apiInterceptor.interceptGetUserDetails({ manualResolution: false })
            cy.visit('http://localhost:3000/dashboard')

            topBar.topBar.should('be.visible')

            topBar.accountButton
                .should('be.visible')
                .click()

            topBar.accountMenu.should('be.visible')
        })

        it('should show menu for guest account', () => {
            topBar.avatar
                .should('be.visible')
                .should('contain.text', 'JD')

            topBar.userFullName
                .should('be.visible')
                .should('contain.text', 'John Doe')

            topBar.guestBadge.should('be.visible')

            topBar.linkGoogleAccButton.should('be.visible')
            topBar.deleteAccountButton.should('be.visible')

            topBar.logoutButton.should('not.exist')
        })

        it('should allow to delete an account after confirmation', () => {
            apiInterceptor.interceptDeleteAccount({})

            topBar.deleteAccountButton
                .should('be.visible')
                .click()

            modals.confirmDeleteModal.should('be.visible')
            modals.modalWarningIcon.should('be.visible')

            modals.modalText
                .should('be.visible')
                .should('contain.text', 'Are you sure you want to delete this account?')
                .should('contain.text', 'This action cannot be undone.')

            modals.modalConfirmButton
                .should('be.visible')
                .click()

            cy.location('pathname', { timeout: 60000 })
                .should('include', '/login')
        })

        it('should close confirmation modal on Close', () => {
            topBar.deleteAccountButton
                .should('be.visible')
                .click()

            modals.confirmDeleteModal.should('be.visible')
            modals.modalWarningIcon.should('be.visible')

            modals.modalText.should('be.visible')

            modals.modalCancelButton
                .should('be.visible')
                .click()

            modals.confirmDeleteModal.should('not.exist')

            cy.location('pathname', { timeout: 60000 })
                .should('include', '/dashboard')
        })
    })

    describe('Account Menu - Google User', () => {

        beforeEach(() => {
            apiInterceptor.interceptGetUserDetails({
                responseBody: useGetUserDetailsResponses.Google,
                manualResolution: false
            })
            cy.visit('http://localhost:3000/dashboard')

            topBar.topBar.should('be.visible')

            topBar.accountButton
                .should('be.visible')
                .click()

            topBar.accountMenu.should('be.visible')

        })

        it('should show menu for Google account', () => {
            topBar.avatar
                .should('be.visible')
                .should('contain.text', 'AD')

            topBar.userFullName
                .should('be.visible')
                .should('contain.text', 'Anna Delve')

            topBar.guestBadge.should('not.exist')
            topBar.linkGoogleAccButton.should('not.exist')

            topBar.logoutButton.should('be.visible')
            topBar.deleteAccountButton.should('be.visible')
        })

        it('should allow to logout with Google account', () => {
            apiInterceptor.interceptLogout({})

            topBar.logoutButton
                .should('be.visible')
                .click()

            cy.location('pathname', { timeout: 60000 })
                .should('include', '/login')
        })

    })
})