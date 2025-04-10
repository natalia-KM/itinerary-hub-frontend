export class TripDetails {
    get topBar() {
        return cy.getById('top-bar')
    }

    get goToTripsLink() {
        return cy.getById('trip-details-go-back-link')
    }

    /************************* Trip Header ************************/

    get tripNameText() {
        return cy.getById('trip-view-name-text')
    }

    get tripNameInputField() {
        return cy.get('#trip-view-name-input')
    }

    get tripNameEditIcon() {
        return cy.getById('trip-view-name-edit-icon')
    }

    get startDateText() {
        return cy.getById('trip-view-start-date-display-text')
    }

    get startDatePlaceholderLabel() {
        return cy.getById('trip-view-start-date-label')
    }

    get startDateInputField() {
        return cy.get('#trip-view-start-date-input')
    }

    get endDateText() {
        return cy.getById('trip-view-end-date-display-text')
    }

    get endDatePlaceholderLabel() {
        return cy.getById('trip-view-end-date-label')
    }

    get endDateInputField() {
        return cy.get('#trip-view-end-date-input')
    }

    /************************* Sections ************************/

    sectionNameText(sectionId: string) {
        return cy.getById(`trip-view-section-${sectionId}-text`)
    }

    sectionNameInputField(sectionId: string) {
        return cy.get(`#trip-view-section-${sectionId}-input`)
    }

    sectionNameEditIcon(sectionId: string) {
        return cy.getById(`trip-view-section-${sectionId}-edit-icon`)
    }

    get sectionUpdateFail() {
        return cy.get('#failed-section-name-update-toast')
    }

    sectionMenuIcon(sectionId: string) {
        return cy.getById(`section-menu-icon-${sectionId}`)
    }

    get sectionMenu() {
        return cy.getById('section-menu')
    }

    get sectionMenuManageOptions() {
        return cy.getById('section-menu-manage-options-button')
    }

    /************************* Options ************************/

    allOptionTabs(sectionId: string) {
        return cy.getById(`option-tabs-${sectionId}`)
    }

    optionTab(optionId: string) {
        return cy.getById(`option-tab-${optionId}`)
    }

    get manageOptionsModal() {
        return cy.getById('manage-options-modal')
    }

    get manageOptionsList() {
        return cy.getById('manage-options-list')
    }

    optionListItem(optionId: string) {
        return cy.getById(`manage-options-${optionId}-item`)
    }

    optionListItemDragIcon(optionId: string) {
        return cy.getById(`manage-options-${optionId}-drag-icon`)
    }

    optionListItemText(optionId: string) {
        return cy.getById(`manage-options-${optionId}-text`)
    }

    optionListItemInputField(optionId: string) {
        return cy.get(`#manage-options-${optionId}-input`)
    }

    optionListItemEditIcon(optionId: string) {
        return cy.getById(`manage-options-${optionId}-edit-icon`)
    }

    optionListItemCheckIcon(optionId: string) {
        return cy.getById(`manage-options-${optionId}-check-icon`)
    }

    optionListItemDeleteIcon(optionId: string) {
        return cy.getById(`manage-options-${optionId}-delete-icon`)
    }

    get addOptionButton() {
        return cy.getById('manage-options-add-button')
    }

    get addOptionInput() {
        return cy.get('#add-new-option-input')
    }

    get addOptionInvalidInputError() {
        return cy.getById('new-option-invalid-input-error')
    }

    get confirmNewOptionIcon() {
        return cy.getById('confirm-new-option-icon')
    }

    get cancelNewOptionIcon() {
        return cy.getById('cancel-new-option-icon')
    }

    /************************* Error / Loading Page ************************/

    get pageLoading() {
        return cy.getById('trip-details-page-loading')
    }

    get errorPageMessage() {
        return cy.getById('error-page-message')
    }

    get errorPageButton() {
        return cy.getById('error-page-button')
    }


    /************************* Toasts ************************/

    get tripNameUpdateFailToast() {
        return cy.get('#failed-trip-name-update-toast')
    }

    get startDateInvalidInputToast() {
        return cy.get('#invalid-trip-start-date-update-toast')
    }

    get startDateUpdateFailToast() {
        return cy.get('#failed-trip-start-date-update-toast')
    }

    get endDateInvalidInputToast() {
        return cy.get('#invalid-trip-end-date-update-toast')
    }

    get endDateUpdateFailToast() {
        return cy.get('#failed-trip-end-date-update-toast')
    }

    get optionErrorToast() {
        return cy.get('#option-error-toast')
    }
}

export const tripDetailsPage = new TripDetails()