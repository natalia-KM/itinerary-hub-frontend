export class TripsView {
    get title() {
        return cy.getById('dashboard-title')
    }
}

export const tripsViewPage = new TripsView()