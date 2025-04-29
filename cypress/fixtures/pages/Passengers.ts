export class Passengers {
    get closedBar() {
        return cy.getById('passengers-closed-bar')
    }

    get header() {
        return cy.getById('passengers-header')
    }

    get closeEditModeIcon() {
        return cy.getById('passengers-close-edit-mode-icon')
    }

    get enableEditModeIcon() {
        return cy.getById('passengers-edit-mode-icon')
    }

    get addPassengerIcon() {
        return cy.getById('passengers-add-new-button')
    }

    passengerFullName(passengerId: string) {
        return cy.getById(`passengers-${passengerId}-full-name`)
    }

    passengerModifyIcon(passengerId: string) {
        return cy.getById(`passengers-${passengerId}-modify-icon`)
    }

    passengerDeleteIcon(passengerId: string) {
        return cy.getById(`passengers-${passengerId}-delete-icon`)
    }

    /*********************** FORMS ****************************/

    get editPassengerForm() {
        return cy.getById('passengers-modify-form')
    }

    get editPassengerFirstName() {
        return cy.getById('passengers-edit-first-name')
    }

    get editPassengerLastName() {
        return cy.getById('passengers-edit-last-name')
    }

    get addPassengerForm() {
        return cy.getById('passengers-add-form')
    }

    get addPassengerFirstName() {
        return cy.getById('passengers-add-first-name')
    }

    get addPassengerLastName() {
        return cy.getById('passengers-add-last-name')
    }

    get passengerFormInputError() {
        return cy.getById('passenger-form-input-error')
    }

    get passengerFormCancelIcon() {
        return cy.getById('passengers-form-cancel-icon')
    }

    get passengerFormConfirmIcon() {
        return cy.getById('passengers-form-confirm-icon')
    }

    get addPassengerErrorToast() {
        return cy.get('#passenger-form-error-toast')
    }

    get confirmDeletePassengerModal() {
        return cy.getById('delete-passenger-modal')
    }

    get deletePassengerErrorToast() {
        return cy.get('#delete-passenger-error-toast')
    }
}

export const passengerDrawer = new Passengers()