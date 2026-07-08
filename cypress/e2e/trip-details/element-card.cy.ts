import { elements } from 'cypress/fixtures/pages/Elements'
import { ACCOMMODATION_1, ACTIVITY_1, TRANSPORT_1, TRIP_ID } from 'testUtils/mockValues'
import { apiInterceptor } from 'cypress/api/ApiInterceptor'

describe('Element Card', () => {

    beforeEach(() => {
        apiInterceptor.interceptGetUserDetails({ manualResolution: false })
        apiInterceptor.interceptGetSections({})
        apiInterceptor.interceptGetOptions({})
        apiInterceptor.interceptGetPassengers({})
        const { alias } = apiInterceptor.interceptGetTrip({})
        cy.visit(`/trip?tripId=${TRIP_ID}`)

        cy.wait(alias)
    })

    it('should include all info for transport element', () => {
        elements.element(TRANSPORT_1).should('be.visible')
        elements.transportOriginPlace(TRANSPORT_1).should('have.text', 'London Heathrow Airport (LHR)')
        elements.transportOriginDate(TRANSPORT_1).should('have.text', '10/06/2025')
        elements.transportOriginTime(TRANSPORT_1).should('have.text', '08:45')

        elements.transportDestPlace(TRANSPORT_1).should('have.text', 'John F. Kennedy Airport (JFK)')
        elements.transportDestDate(TRANSPORT_1).should('have.text', '10/06/2025')
        elements.transportDestTime(TRANSPORT_1).should('have.text', '11:30')

        elements.price(TRANSPORT_1).should('have.text', '$ 420')
        elements.customColumn(TRANSPORT_1).should('have.text', 'British Airways')
        elements.notes(TRANSPORT_1).should('have.text', 'Check-in 2 hours before departure.')
    })

    it('should include all info for activity element', () => {
        elements.element(ACTIVITY_1).should('be.visible')
        elements.activityName(ACTIVITY_1).should('have.text', 'Snorkeling Adventure')
        elements.activityLocation(ACTIVITY_1).should('have.text', 'Great Barrier Reef, Australia')

        elements.activityStartsAtDate(ACTIVITY_1).should('have.text', '01/05/2025')
        elements.activityStartsAtTime(ACTIVITY_1).should('have.text', '09:00')
        elements.activityEndsAtTime(ACTIVITY_1).should('have.text', '11:00')

        elements.price(ACTIVITY_1).should('have.text', '$ 75')
        elements.customColumn(ACTIVITY_1).should('have.text', '2h 0m')
        elements.notes(ACTIVITY_1).should('have.text', 'Bring your own sunscreen.')

        elements.passengerAvatar(ACTIVITY_1, 0)
            .should('be.visible')
            .should('have.text', 'JD')

        elements.passengerAvatar(ACTIVITY_1, 1)
            .should('be.visible')
            .should('have.text', 'AS')
    })

    it('should include all info for accommodation element', () => {
        const checkInElementId = `${ACCOMMODATION_1}-check-in`

        elements.element(checkInElementId).should('be.visible')
        elements.accommPlace(checkInElementId).should('have.text', 'Cozy Mountain Lodge')
        elements.accommLocation(checkInElementId).should('have.text', 'Aspen, Colorado')

        elements.accommDate(checkInElementId).should('have.text', '20/04/2025')
        elements.accommTime(checkInElementId).should('have.text', '15:00')

        elements.price(checkInElementId).should('have.text', '$ 199.99')
        elements.notes(checkInElementId).should('have.text', 'Check-in after 3 PM')

        const checkOutElementId = `${ACCOMMODATION_1}-check-out`

        elements.element(checkOutElementId).should('be.visible')
        elements.accommPlace(checkOutElementId).should('have.text', 'Cozy Mountain Lodge')
        elements.accommLocation(checkOutElementId).should('have.text', 'Aspen, Colorado')

        elements.accommDate(checkOutElementId).should('have.text', '23/04/2025')
        elements.accommTime(checkOutElementId).should('have.text', '17:00')

        elements.price(checkOutElementId).should('have.text', '$ 199.99')
        elements.notes(checkOutElementId).should('have.text', 'Check-in after 3 PM')
    })
})