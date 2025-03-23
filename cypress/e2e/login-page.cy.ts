import { apiInterceptor } from '../api/ApiInterceptor'
import { loginPage } from '../fixtures/pages/LoginPage'
import { tripsViewPage } from '../fixtures/pages/TripsView'

describe('Login Page', () => {
    beforeEach(() => {
       // // eslint-disable-next-line cypress/no-unnecessary-waiting
        // cy.wait(4000) // for the server to load
        cy.visit('http://localhost:3000/login')

    })
    it('should contain all elements', () => {
        loginPage.title
            .should('be.visible')
            .should('contain.text', 'Welcome to ItineraryHub')

        loginPage.description
            .should('be.visible')
            .should('contain.text', 'Easily compare your next travel plans')

        loginPage.signInWithGoogleButton
            .should('be.visible')
            .should('be.enabled')

        loginPage.firstNameInputField.should('be.visible')
        loginPage.lastNameInputField.should('be.visible')

        loginPage.createGuestUserSubmitButton
            .should('be.visible')
            .should('be.enabled')
    })

    it('should redirect to dashboard on successfully guest account creation', () => {
        apiInterceptor.interceptGetUserDetails({ manualResolution: false, status: 401 })

        const { resolve: resolveCreateUser } = apiInterceptor.interceptCreateGuestUser({ manualResolution: true })
        const { resolve: resolveGetUserDetailsSuccess } = apiInterceptor.interceptGetUserDetails({ manualResolution: true })

        loginPage.firstNameInputField
            .should('be.visible')
            .type('John')

        loginPage.lastNameInputField
            .should('be.visible')
            .type('Doe')

        loginPage.createGuestUserSubmitButton
            .should('be.visible')
            .should('be.enabled')
            .click()

        loginPage.createGuestUserSubmitButton
            .should('not.be.enabled')
            .then(() => {
                resolveCreateUser?.()
                resolveGetUserDetailsSuccess?.()
            })

        cy.location('pathname', { timeout: 60000 })
            .should('include', '/dashboard')

        tripsViewPage.topBar.should('be.visible')
    })

    it('should show error toast on unsuccessful guest account creation', () => {
        const { resolve } = apiInterceptor.interceptCreateGuestUser({ status: 500, manualResolution: true })

        loginPage.firstNameInputField
            .should('be.visible')
            .type('John')

        loginPage.lastNameInputField
            .should('be.visible')
            .type('Doe')

        loginPage.createGuestUserSubmitButton
            .should('be.visible')
            .should('be.enabled')
            .click()

        loginPage.createGuestUserSubmitButton.should('be.disabled').then(() =>{
            resolve?.()
        })

        loginPage.errorToast
            .should('be.visible')
            .should('contain.text', 'Something went wrong! Unable to create a guest account.')

        loginPage.title.should('be.visible')
    })

    it('should call getUser and redirect to app when valid cookies exist', () => {
        apiInterceptor.interceptGetUserDetails({})

        cy.visit('http://localhost:3000')

        cy.location('pathname', { timeout: 60000 })
            .should('include', '/dashboard')

        tripsViewPage.topBar.should('be.visible')
    })

    it('should call getUser but not redirect to app when invalid cookies exist', () => {
        apiInterceptor.interceptGetUserDetails({ status: 401 })

        cy.visit('http://localhost:3000')

        cy.location('pathname', { timeout: 60000 })
            .should('include', '/login')

        loginPage.title.should('be.visible')
    })

    it('should check for constraint violations', () => {
        // no input
        loginPage.createGuestUserSubmitButton
            .should('be.visible')
            .should('be.enabled')
            .click()

        loginPage.firstNameFieldErrors
            .should('be.visible')
            .should('contain.text', 'First name is a required field')

        loginPage.lastNameFieldErrors
            .should('be.visible')
            .should('contain.text', 'Last name is a required field')

        loginPage.createGuestUserSubmitButton.should('be.disabled')

        // only first name
        loginPage.firstNameInputField.type('John')
        loginPage.title.click() // click anywhere else to trigger refresh of an error

        loginPage.firstNameFieldErrors.should('not.exist')

        loginPage.lastNameFieldErrors
            .should('be.visible')
            .should('contain.text', 'Last name is a required field')

        // min chars violation
        loginPage.firstNameInputField
            .clear()
            .type('Jo')

        loginPage.title.click()

        loginPage.firstNameFieldErrors
            .should('be.visible')
            .should('contain.text', 'First name must be at least 3 characters')

        loginPage.lastNameInputField
            .clear()
            .type('Do')

        loginPage.title.click()

        loginPage.lastNameFieldErrors
            .should('be.visible')
            .should('contain.text', 'Last name must be at least 3 characters')


        // max chars violation
        loginPage.firstNameInputField
            .clear()
            .type('ppdskGWhbNNACGPZYCenEDGMhGHnBeuPWXxkBKAwBQjjRJFfDwC') // 51 chars

        loginPage.title.click()

        loginPage.firstNameFieldErrors
            .should('be.visible')
            .should('contain.text', 'First name must be at most 50 characters')

        loginPage.lastNameInputField
            .clear()
            .type('ppdskGWhbNNACGPZYCenEDGMhGHnBeuPWXxkBKAwBQjjRJFfDwCppdskGWhbNNACGPZYCenEDGMhGHnBeuPWXxkBKAwBQjjRJFfDw') // 101 chars

        loginPage.title.click()

        loginPage.lastNameFieldErrors
            .should('be.visible')
            .should('contain.text', 'Last name must be at most 100 characters')

        // check for allowed chars
        loginPage.firstNameInputField
            .clear()
            .type('Joe5')

        loginPage.title.click()

        loginPage.firstNameFieldErrors
            .should('be.visible')
            .should('contain.text', 'Only letters, spaces, and apostrophes are allowed.')

        loginPage.firstNameInputField.clear().type('Joe%')

        loginPage.title.click()

        loginPage.firstNameFieldErrors
            .should('be.visible')
            .should('contain.text', 'Only letters, spaces, and apostrophes are allowed.')

        loginPage.firstNameInputField
            .clear()
            .type('Mary Jane')

        loginPage.firstNameFieldErrors.should('not.exist')
    })
})