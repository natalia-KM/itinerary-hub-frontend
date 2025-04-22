export class Drawers {
    get confirmButton() {
        return cy.getById('drawer-confirm-button')
    }

    get cancelButton() {
        return cy.getById('drawer-cancel-button')
    }
}

export const drawer = new Drawers()