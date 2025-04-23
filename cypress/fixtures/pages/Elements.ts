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
}

export const elements = new Elements()