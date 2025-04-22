export class TripsView {
    get topBar() {
        return cy.getById('top-bar')
    }

    get tripsViewLoading() {
        return cy.getById('trips-view-loading')
    }

    get tripsViewFailErrorToast() {
        return cy.get('[id="get-all-trips-error-toast"]')
    }

    get addTripCard() {
        return cy.getById('add-trip-card')
    }

    get createTripDrawer() {
        return cy.getById('create-trip-drawer')
    }

    /****** TRIP FORMS *******/

    get tripFormNameField() {
        return cy.get('#trip-form-trip-name')
    }

    get tripFormNameFieldErrors() {
        return cy.getById('trip-form-trip-name-error')
    }

    get tripFormStartDateField() {
        return cy.get('#trip-form-start-date')
    }

    get tripFormEndDateField() {
        return cy.get('#trip-form-end-date')
    }

    get tripFormEndDateFieldErrors() {
        return cy.getById('trip-form-end-date-error')
    }

    get tripFormImagePicker() {
        return cy.getById('trip-form-image-picker')
    }

    get createTripSuccessToast() {
        return cy.get('[id="create-trip-success-toast"]')
    }

    get createTripErrorToast() {
        return cy.get('[id="create-trip-error-toast"]')
    }

    /****** TRIP CARD *******/

    tripCard(tripIndex: number) {
        return cy.getById(`trip-view-card-${tripIndex}`)
    }

    tripCardPhoto(tripIndex: number) {
        return cy.getById(`trip-view-card-${tripIndex}-image`)
    }

    tripCardTooltip(tripIndex: number) {
        return cy.get(`[id="trip-view-card-${tripIndex}-tooltip"]`)
    }

    tripCardTripName(tripIndex: number) {
        return cy.getById(`trip-view-card-${tripIndex}-trip-name`)
    }

    tripCardDates(tripIndex: number) {
        return cy.getById(`trip-view-card-${tripIndex}-dates`)
    }

    tripCardActionMenuButton(tripIndex: number) {
        return cy.getById(`trip-view-card-${tripIndex}-action-menu-button`)
    }

    get actionPanel() {
        return cy.getById('trip-card-action-panel')
    }

    get actionPanelEditTripButton() {
        return cy.getById('trip-card-action-panel-edit-trip-btn')
    }

    get actionPanelDeleteTripButton() {
        return cy.getById('trip-card-action-panel-delete-trip-btn')
    }

    get editTripDrawer() {
        return cy.getById('edit-trip-drawer')
    }

    get updateTripSuccessToast() {
        return cy.get('[id="update-trip-success-toast"]')
    }

    get updateTripErrorToast() {
        return cy.get('[id="update-trip-error-toast"]')
    }

    get deleteTripSuccessToast() {
        return cy.get('[id="delete-trip-success-toast"]')
    }

    get deleteTripErrorToast() {
        return cy.get('[id="delete-trip-error-toast"]')
    }

    get tripNotModifiedToast() {
        return cy.get('[id="no-updates-edit-trip-form"]')
    }
}

export const tripsViewPage = new TripsView()