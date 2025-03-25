export class TopBar {

    get topBar() {
        return cy.getById('top-bar')
    }

    get logo() {
        return cy.getById('top-bar-logo')
    }

    get homeButton() {
        return cy.getById('top-bar-home-btn')
    }

    get helpButton() {
        return cy.getById('top-bar-help-btn')
    }

    get accountButton() {
        return cy.getById('top-bar-account-btn')
    }

    get helpMenu() {
        return cy.getById('top-bar-help-menu')
    }

    get helpRedirectButton() {
        return cy.getById('top-bar-help-redirect-btn')
    }

    get accountMenu() {
        return cy.getById('top-bar-account-menu')
    }

    get avatar() {
        return cy.getById('user-avatar')
    }

    get userFullName() {
        return cy.getById('top-bar-account-menu-name')
    }

    get guestBadge() {
        return cy.getById('top-bar-account-menu-guest-badge')
    }

    get linkGoogleAccButton() {
        return cy.getById('top-bar-account-menu-link-google-account')
    }

    get logoutButton() {
        return cy.getById('top-bar-account-menu-logout')
    }

    get deleteAccountButton() {
        return cy.getById('top-bar-account-menu-delete-account-button')
    }
}

export const topBar = new TopBar()