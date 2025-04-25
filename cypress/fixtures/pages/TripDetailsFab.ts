export class TripDetailsFab {
    get fab() {
        return cy.getById('trip-details-fab')
    }

    get addSectionButton() {
        return cy.getById('add-section-button')
    }

    get addSectionModal() {
        return cy.getById('add-section-modal')
    }

    get addSectionModalInput() {
        return cy.getById('add-section-name-input')
    }

    get addSectionModalInputError() {
        return cy.getById('add-section-input-error')
    }

    get addSectionModalErrorToast() {
        return cy.get('[id="add-section-modal-error-toast"]')
    }
}
export const tripDetailsFab = new TripDetailsFab()