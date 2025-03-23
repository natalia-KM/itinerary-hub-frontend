export class TripsView {
    get topBar() {
        return cy.getById('top-bar')
    }
}

export const tripsViewPage = new TripsView()