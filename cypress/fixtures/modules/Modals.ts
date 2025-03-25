export class Modals {
    get confirmDeleteModal() {
        return cy.getById('confirm-delete-modal')
    }

    get modalWarningIcon() {
        return cy.getById('confirm-delete-modal-warning-icon')
    }

    get modalText() {
        return cy.getById('confirm-delete-modal-text')
    }

    get modalCancelButton() {
        return cy.getById('modal-cancel-button')
    }

    get modalConfirmButton() {
        return cy.getById('modal-confirm-button')
    }
}
export const modals = new Modals()