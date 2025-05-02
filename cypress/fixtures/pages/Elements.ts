export class Elements {

    elementsList(optionId: string) {
        return cy.getById(`elements-list-${optionId}`)
    }

    element(elementId: string) {
        return cy.getById(`element-${elementId}`)
    }

    categoryBadgeIcon(elementId: string, elementCategory: string) {
        const testOptionId = elementCategory.replace('& ', '').replace(' ', '-').toLowerCase()
        return this.element(elementId).find(`[data-testid="${testOptionId}-category-badge-icon"]`)
    }

    categoryBadgeTooltip(elementCategory: string) {
        const testOptionId = elementCategory.replace('& ', '').replace(' ', '-').toLowerCase()
        return cy.get(`[id="${testOptionId}-category-badge-tooltip"]`)
    }

    elementMenuButton(elementId: string) {
        return cy.getById(`${elementId}-element-menu-button`)
    }

    get elementMenu() {
        return cy.getById('element-menu')
    }

    editElementButton() {
        return cy.getById('edit-element-button')
    }

    get deleteElementButton() {
        return cy.getById('delete-element-button')
    }
    get deleteElementModal() {
        return cy.getById('delete-element-modal')
    }

    get deleteElementErrorToast() {
        return cy.get('#delete-element-error-toast')
    }

    price(elementId: string) {
        return cy.getById(`${elementId}-price`)
    }

    customColumn(elementId: string) {
        return cy.getById(`${elementId}-custom`)
    }

    notes(elementId: string) {
        return cy.getById(`${elementId}-notes`)
    }

    passengerAvatar(elementId: string, passengerIndex: number) {
        return cy.getById(`${elementId}-passenger-${passengerIndex}-avatar`)
    }

    transportOriginDate(elementId: string) {
        return cy.getById(`tr-${elementId}-origin-date`)
    }

    transportOriginTime(elementId: string) {
        return cy.getById(`tr-${elementId}-origin-time`)
    }

    transportOriginPlace(elementId: string) {
        return cy.getById(`tr-${elementId}-origin-place`)
    }

    transportDestDate(elementId: string) {
        return cy.getById(`tr-${elementId}-dest-date`)
    }

    transportDestTime(elementId: string) {
        return cy.getById(`tr-${elementId}-dest-time`)
    }

    transportDestPlace(elementId: string) {
        return cy.getById(`tr-${elementId}-dest-place`)
    }

    transportDuration(elementId: string) {
        return cy.getById(`tr-${elementId}-duration`)
    }

    activityStartsAtDate(elementId: string) {
        return cy.getById(`act-${elementId}-starts-at-date`)
    }

    activityLocation(elementId: string) {
        return cy.getById(`act-${elementId}-location`)
    }

    activityStartsAtTime(elementId: string) {
        return cy.getById(`act-${elementId}-starts-at-time`)
    }

    activityEndsAtTime(elementId: string) {
        return cy.getById(`act-${elementId}-ends-at-time`)
    }

    activityName(elementId: string) {
        return cy.getById(`act-${elementId}-activity-name`)
    }

    accommDate(elementId: string) {
        return cy.getById(`acc-${elementId}-date`)
    }

    accommPlace(elementId: string) {
        return cy.getById(`acc-${elementId}-place`)
    }

    accommLocation(elementId: string) {
        return cy.getById(`acc-${elementId}-location`)
    }

    accommTime(elementId: string) {
        return cy.getById(`acc-${elementId}-time`)
    }
}

export const elements = new Elements()