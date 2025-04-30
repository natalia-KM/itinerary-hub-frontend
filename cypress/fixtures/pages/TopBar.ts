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

    get userDetailsButton() {
        return cy.getById('top-bar-account-menu-user-details')
    }

    get userDetailsModal() {
        return cy.getById('account-info-modal')
    }

    /******************** PROPERTIES ******************/
    get firstNameCellProperty() {
        return cy.getById('first-name-label-cell')
    }

    get lastNameCellProperty() {
        return cy.getById('last-name-label-cell')
    }

    get createdAtCellProperty() {
        return cy.getById('created-at-label-cell')
    }

    get currencyCellProperty() {
        return cy.getById('currency-label-cell')
    }

    /******************** VALUES ******************/
    get firstNameCellValue() {
        return cy.getById('first-name-editable-text')
    }

    get lastNameCellValue() {
        return cy.getById('last-name-editable-text')
    }

    get createdAtCellValue() {
        return cy.getById('created-at-cell-value')
    }

    get currencyCellValue() {
        return cy.getById('currency-cell-value')
    }

    /******************** EDITABLE ******************/
    get firstNameCellInput() {
        return cy.getById('first-name-editable-input')
    }

    get lastNameCellInput() {
        return cy.getById('last-name-editable-input')
    }

    get currencySelect() {
        return cy.get('#currency-select')
    }

    currencySelectItem(currencyCode: string) {
        return cy.getById(`${currencyCode}-currency-item`)
    }

    get userUpdateErrorToast() {
        return cy.get('#update-user-error-toast')
    }
}

export const topBar = new TopBar()