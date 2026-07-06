import { topBar } from 'cypress/fixtures/pages/TopBar'
import { apiInterceptor } from 'cypress/api/ApiInterceptor'
import { useGetUserDetailsResponses } from 'hooks/useGetUserDetails'
import { modals } from 'cypress/fixtures/modules/Modals'

describe('Top Bar', () => {
    beforeEach(() => {
        apiInterceptor.interceptGetUserDetails({ manualResolution: false })
        apiInterceptor.interceptGetAllTrips({})
        apiInterceptor.interceptGetPassengers({})
    })

    it('should have all elements visible', () => {
        cy.visit('/dashboard')

        topBar.topBar.should('be.visible')

        topBar.logo.should('be.visible')
        topBar.helpButton.should('be.visible')
        topBar.accountButton.should('be.visible')

        topBar.homeButton.should('not.exist') // only visible on Help Page
    })


    it('should show help menu on help icon click', () => {
        cy.visit('/dashboard')

        topBar.topBar.should('be.visible')
        topBar.accountButton.should('be.visible')

        topBar.helpButton.should('be.visible').click()

        topBar.helpMenu.should('be.visible')
        topBar.helpRedirectButton
            .should('be.visible')
    })

    it('should redirect to home on logo click', () => {
        cy.visit('/help')

        topBar.logo
            .should('be.visible')
            .click()

        cy.location('pathname', { timeout: 60000 })
            .should('include', '/dashboard')

        topBar.helpButton.should('be.visible')
    })

    it('should redirect to home on home btn click', () => {
        cy.visit('/help')

        topBar.homeButton.should('be.visible').click()

        cy.location('pathname', { timeout: 60000 })
            .should('include', '/dashboard')

        topBar.helpButton.should('be.visible')
        topBar.homeButton.should('not.exist')
    })

    describe('Account menu', () => {
        beforeEach(() => {
            apiInterceptor.interceptGetUserDetails({ manualResolution: false })
            cy.visit('/dashboard')

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

    describe('Account Menu - User Details', () => {
        const userDetails = useGetUserDetailsResponses.Guest

        beforeEach(() => {
            apiInterceptor.interceptGetUserDetails({})
            cy.visit('/dashboard')

            topBar.topBar.should('be.visible')

            topBar.accountButton
                .should('be.visible')
                .click()

            topBar.accountMenu.should('be.visible')

            topBar.userDetailsButton
                .should('be.visible')
                .click()

            topBar.userDetailsModal.should('be.visible')
        })

        it('should show all information', () => {
            topBar.firstNameCellProperty.should('have.text', 'First Name')
            topBar.lastNameCellProperty.should('have.text', 'Last Name')
            topBar.createdAtCellProperty.should('have.text', 'Created At')
            topBar.currencyCellProperty.should('have.text', 'Currency')

            topBar.firstNameCellValue.should('have.text', userDetails.firstName)
            topBar.lastNameCellValue.should('have.text', userDetails.lastName)
            topBar.createdAtCellValue.should('have.text', '10/03/2025')
            topBar.currencyCellValue.should('have.text', 'USD')
        })

        it('should update first name successfully', () => {
            const newFirstName = 'Tom'

            const { alias } = apiInterceptor.interceptUpdateUserDetails({})
            apiInterceptor.interceptGetUserDetails({
                responseBody: {
                    ...useGetUserDetailsResponses.Guest,
                    firstName: newFirstName
                }
            })

            topBar.firstNameCellValue.click()
            topBar.firstNameCellInput
                .should('be.visible')
                .invoke('val', '') //clear
                .type(newFirstName)
                .type('{enter}') // check it updates the name by pressing enter

            cy.wait(alias).then((interception) => {
                expect(interception.request.body).to.deep.equal({
                    firstName: newFirstName
                })
            })

            topBar.firstNameCellInput.should('not.exist')
            topBar.firstNameCellValue
                .should('be.visible')
                .should('have.text', newFirstName)
        })

        it('should update last name successfully', () => {
            const newLastName = 'Smith'

            const { alias } = apiInterceptor.interceptUpdateUserDetails({})
            apiInterceptor.interceptGetUserDetails({
                responseBody: {
                    ...useGetUserDetailsResponses.Guest,
                    lastName: newLastName
                }
            })

            topBar.lastNameCellValue.click()
            topBar.lastNameCellInput
                .should('be.visible')
                .invoke('val', '') //clear
                .type(newLastName)

            topBar.lastNameCellProperty.click() // check it updates the name by clicking outside

            cy.wait(alias).then((interception) => {
                expect(interception.request.body).to.deep.equal({
                    lastName: newLastName
                })
            })

            topBar.lastNameCellInput.should('not.exist')
            topBar.lastNameCellValue
                .should('be.visible')
                .should('have.text', newLastName)
        })

        it('should not update name if empty', () => {
            topBar.firstNameCellValue.click()
            topBar.firstNameCellInput
                .should('be.visible')
                .invoke('val', '') //clear
                .type('{enter}')

            topBar.firstNameCellInput.should('not.exist')
            topBar.firstNameCellValue
                .should('be.visible')
                .should('have.text', userDetails.firstName)
        })

        it('should update currency successfully', () => {
            const newCurrency = 'AUD'

            const { alias } = apiInterceptor.interceptUpdateUserDetails({})
            apiInterceptor.interceptGetUserDetails({
                responseBody: {
                    ...useGetUserDetailsResponses.Guest,
                    currency: newCurrency
                }
            })

            topBar.currencyCellValue.click()
            topBar.currencySelect.click()
            topBar.currencySelectItem(newCurrency)
                .should('be.visible')
                .should('contain.text', 'Australian Dollar')
                .should('contain.text', '$')
                .should('contain.text', 'AUD')
                .click()

            cy.wait(alias).then((interception) => {
                expect(interception.request.body).to.deep.equal({
                    currency: newCurrency
                })
            })

            topBar.currencySelect.should('not.exist')
            topBar.currencyCellValue
                .should('be.visible')
                .should('have.text', newCurrency)
        })

        it('should show error toast on failed first name update', () => {
            apiInterceptor.interceptUpdateUserDetails({ status: 500 })

            topBar.firstNameCellValue.click()
            topBar.firstNameCellInput
                .should('be.visible')
                .invoke('val', '') //clear
                .clear({ force: true })
                .type('Tom')
                .type('{enter}')

            topBar.firstNameCellInput.should('not.exist')
            topBar.firstNameCellValue
                .should('be.visible')
                .should('have.text', userDetails.firstName)

            topBar.userUpdateErrorToast
                .should('be.visible')
                .should('have.text', 'Couldn\'t update the name. Try again later')
        })

        it('should show error toast on failed last name update', () => {
            apiInterceptor.interceptUpdateUserDetails({ status: 500 })

            topBar.lastNameCellValue.click()
            topBar.lastNameCellInput
                .should('be.visible')
                .clear()
                .type('Smith')
                .type('{enter}')

            topBar.lastNameCellInput.should('not.exist')
            topBar.lastNameCellValue
                .should('be.visible')
                .should('have.text', userDetails.lastName)

            topBar.userUpdateErrorToast
                .should('be.visible')
                .should('have.text', 'Couldn\'t update the name. Try again later')
        })

        it('should show error toast on failed currency update', () => {
            apiInterceptor.interceptUpdateUserDetails({ status: 500 })

            topBar.currencyCellValue.click()
            topBar.currencySelect.click()
            topBar.currencySelectItem('GBP').click()

            topBar.currencySelect.should('not.exist')
            topBar.currencyCellValue
                .should('be.visible')
                .should('have.text', 'USD')

            topBar.userUpdateErrorToast
                .should('be.visible')
                .should('have.text', 'Couldn\'t update the currency. Try again later')
        })

        it('should close modal on OK click', () => {
            modals.modalConfirmButton.click()
            topBar.userDetailsModal.should('not.exist')
        })
    })

    describe('Account Menu - Google User', () => {

        beforeEach(() => {
            apiInterceptor.interceptGetUserDetails({
                responseBody: useGetUserDetailsResponses.Google,
                manualResolution: false
            })
            cy.visit('/dashboard')

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