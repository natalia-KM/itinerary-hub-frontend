export class TripDetailsFab {
    get fab() {
        return cy.getById('trip-details-fab')
    }

    get addSectionButton() {
        return cy.getById('add-section-button')
    }

    get downloadItineraryButton() {
        return cy.getById('download-itinerary-button')
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
    
    /****************      ADD SECTION MODAL    ********************/
    
    get manageSectionsButton() {
        return cy.getById('manage-sections-button')
    }
    
    get manageSectionsModal() {
        return cy.getById('manage-sections-modal')
    }
    
    get manageSectionsModalList() {
        return cy.getById('manage-sections-list')
    }
    
    sectionListItem(sectionId: string) {
        return cy.getById(`manage-sections-${sectionId}-item`)
    }

    sectionItemDragHandle(sectionId: string) {
        return cy.getById(`manage-sections-${sectionId}-drag-icon`)
    }

    sectionNameEditInput(sectionId: string) {
        return cy.get(`#manage-sections-${sectionId}-input`)
    }
    
    sectionItemEditIcon(sectionId: string) {
        return cy.getById(`manage-sections-${sectionId}-edit-icon`)
    }
    
    sectionItemCheckIcon(sectionId: string) {
        return cy.getById(`manage-sections-${sectionId}-check-icon`)
    }
    
    sectionItemDeleteIcon(sectionId: string) {
        return cy.getById(`manage-sections-${sectionId}-delete-icon`)
    }
    
    get addNewSectionButton() {
        return cy.getById('manage-sections-add-button')
    }
    
    get addNewSectionInputField() {
        return cy.get('#add-new-section-input')
    }
    
    get confirmNewSectionButton() {
        return cy.getById('confirm-new-section-icon')
    }
}
export const tripDetailsFab = new TripDetailsFab()