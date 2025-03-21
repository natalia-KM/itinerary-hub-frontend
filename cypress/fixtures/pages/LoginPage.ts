export class LoginPage {
    get title() {
        return cy.getById('login-title')
    }

    get description() {
        return cy.getById('login-desc')
    }

    get signInWithGoogleButton() {
        return cy.getById('sign-in-with-google-button')
    }

    get firstNameInputField() {
        return cy.getById('login-page-firstname').find('input')
    }

    get firstNameFieldErrors() {
        return cy.getById('login-page-firstname-error')
    }

    get lastNameInputField() {
        return cy.getById('login-page-lastname').find('input')
    }

    get lastNameFieldErrors() {
        return cy.getById('login-page-lastname-error')
    }

    get createGuestUserSubmitButton() {
        return cy.getById('login-page-submit-button')
    }

    get errorToast() {
        return cy.get('[id="create-guest-error-toast"]')
    }
}

export const loginPage = new LoginPage()