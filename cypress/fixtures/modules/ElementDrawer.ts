import { ElementStatus } from 'hooks/elements'

export class ElementDrawer {
    get elementDrawer() {
        return cy.getById('element-drawer')
    }

    get transportRadioBtn() {
        return cy.getById('transport-radio-btn')
    }

    get activityRadioBtn() {
        return cy.getById('activity-radio-btn')
    }

    get accommRadioBtn() {
        return cy.getById('accommodation-radio-btn')
    }

    get categoryInputField() {
        return cy.getById('category-input-field').find('input')
    }

    categoryListItem(option: string) {
        const testOptionId = option.replace('& ', '').replace(' ', '-')
        return cy.getById(`category-list-item-${testOptionId}`)
    }

    get categoryError() {
        return cy.getById('element-form-step-one-cat-error')
    }

    /***************************** TRANSPORT  ******************************/
    get originPlaceInput() {
        return cy.get('[id="transport-element-form-origin-place"]')
    }

    get originPlaceError() {
        return cy.getById('transport-element-form-origin-place-error')
    }

    get originDate() {
        return cy.get('[id="transport-element-form-start-date"]')
    }

    get originDateError() {
        return cy.getById('transport-element-form-start-date-error')
    }

    get originTime() {
        return cy.get('[id="transport-element-form-start-time"]')
    }

    get originTimeError() {
        return cy.getById('transport-element-form-start-time-error')
    }

    get destPlaceInput() {
        return cy.get('[id="transport-element-form-dest-place"]')
    }

    get destPlaceError() {
        return cy.getById('transport-element-form-dest-place-error')
    }

    get destDate() {
        return cy.get('[id="transport-element-form-end-date"]')
    }

    get destDateError() {
        return cy.getById('transport-element-form-end-date-error')
    }

    get destTime() {
        return cy.get('[id="transport-element-form-end-time"]')
    }

    get destTimeError() {
        return cy.getById('transport-element-form-end-time-error')
    }

    get providerInput() {
        return cy.get('[id="transport-element-form-provider"]')
    }

    /***************************** ACTIVITY  ******************************/

    get activityNameInput() {
        return cy.get('[id="activity-element-form-name"]')
    }

    get activityNameError() {
        return cy.getById('activity-element-form-name-error')
    }

    get activityLocationInput() {
        return cy.get('[id="activity-element-form-location"]')
    }

    get activityLocationError() {
        return cy.getById('activity-element-form-location-error')
    }

    get activityStartDateInput() {
        return cy.get('[id="activity-element-form-date"]')
    }

    get activityStartDateError() {
        return cy.getById('activity-element-form-date-error')
    }

    get activityStartTimeInput() {
        return cy.get('[id="activity-element-form-time"]')
    }

    get activityStartTimeError() {
        return cy.getById('activity-element-form-time-error')
    }

    get activityHoursInput() {
        return cy.get('[id="activity-element-form-hours"]')
    }

    get activityHoursError() {
        return cy.getById('activity-element-form-hours-error')
    }

    get activityMinutesInput() {
        return cy.get('[id="activity-element-form-minutes"]')
    }

    get activityMinutesError() {
        return cy.getById('activity-element-form-minutes-error')
    }

    /***************************** ACCOMMODATION ******************************/

    get accommPlace() {
        return cy.get('[id="accomm-element-form-place"]')
    }

    get accommPlaceError() {
        return cy.getById('accomm-element-form-place-error')
    }

    get accommLocation() {
        return cy.get('[id="accomm-element-form-location"]')
    }

    get accommLocationError() {
        return cy.getById('accomm-element-form-location-error')
    }

    get checkInDate() {
        return cy.get('[id="accomm-element-form-checkin-date"]')
    }

    get checkInDateError() {
        return cy.getById('accomm-element-form-checkin-date-error')
    }

    get checkInTime() {
        return cy.get('[id="accomm-element-form-checkin-time"]')
    }

    get checkInTimeError() {
        return cy.getById('accomm-element-form-checkin-time-error')
    }

    get checkOutDate() {
        return cy.get('[id="accomm-element-form-checkout-date"]')
    }

    get checkOutDateError() {
        return cy.getById('accomm-element-form-checkout-date-error')
    }

    get checkOutTime() {
        return cy.get('[id="accomm-element-form-checkout-time"]')
    }

    get checkOutTimeError() {
        return cy.getById('accomm-element-form-checkout-time-error')
    }

    /***************************** STEP TWO ******************************/

    get priceInput() {
        return cy.get('[id="element-form-step-two-price"]')
    }

    get linkInput() {
        return cy.get('[id="element-form-step-two-link"]')
    }

    get linkError() {
        return cy.getById('element-form-step-two-link-error')
    }

    get notesInput() {
        return cy.get('[id="element-form-step-two-notes"]')
    }

    get notesError() {
        return cy.getById('element-form-step-two-notes-error')
    }

    statusToggleItem(status: ElementStatus) {
        return cy.getById(`status-item-${status.toLowerCase()}`)
    }

    get passengersLabel() {
        return cy.getById('passengers-label')
    }

    passengerInList(passengerId: string) {
        return cy.getById(`passenger-${passengerId}`)
    }

    get createElementErrorToast() {
        return cy.get('[id="create-element-error-toast"]')
    }

    get updateElementErrorToast() {
        return cy.get('[id="update-element-error-toast"]')
    }
}

export const elementDrawer = new ElementDrawer()