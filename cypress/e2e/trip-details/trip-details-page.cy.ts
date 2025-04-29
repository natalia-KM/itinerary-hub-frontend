import { tripDetailsPage } from 'cypress/fixtures/pages/TripDetails'
import { tripsViewPage } from 'cypress/fixtures/pages/TripsView'
import { apiInterceptor } from 'cypress/api/ApiInterceptor'
import { TRIP_ID, TRIP_ID_2 } from 'testUtils/mockValues'
import { useGetTripResponses } from 'hooks/trips'

describe('Trip Details Page', () => {
    beforeEach(() => {
        apiInterceptor.interceptGetUserDetails({ manualResolution: false })
    })

    it('should redirect to trips view on click', () => {
        const { alias } = apiInterceptor.interceptGetTrip({})
        cy.visit(`http://localhost:3000/trip?tripId=${TRIP_ID}`)

        cy.wait(alias)

        apiInterceptor.interceptGetAllTrips({})
        tripDetailsPage.goToTripsLink
            .should('be.visible')
            .should('have.text', 'Trip List')
            .click()

        cy.location('pathname', { timeout: 60000 })
            .should('include', '/dashboard')

        tripsViewPage.addTripCard.should('be.visible')
    })


    it('should update date if it was not set previously', () => {
        const { alias } = apiInterceptor.interceptGetTrip({
            tripId: TRIP_ID_2,
            responseBody: useGetTripResponses[TRIP_ID_2]
        })
        cy.visit(`http://localhost:3000/trip?tripId=${TRIP_ID_2}`)
        cy.wait(alias)

        tripDetailsPage.endDateText
            .should('be.visible')
            .should('have.text', 'Set End Date')
            .click()

        tripDetailsPage.endDateText.should('not.exist')

        apiInterceptor.interceptUpdateTrip({ tripId: TRIP_ID_2 })

        tripDetailsPage.endDateInputField
            .should('be.visible')
            .clear()
            .type('30032025')

        tripDetailsPage.topBar.click()

        tripDetailsPage.endDateInputField.should('not.exist')

        tripDetailsPage.endDateText
            .should('be.visible')
            .should('contain.text', '30/03/2025')
    })

    it('should show loading state while loading data', () => {
        const { resolve } = apiInterceptor.interceptGetTrip({ manualResolution: true })
        cy.visit(`http://localhost:3000/trip?tripId=${TRIP_ID}`)

        tripDetailsPage.pageLoading
            .should('be.visible')
            .then(() => resolve?.())

        tripDetailsPage.tripNameText.should('be.visible')
    })

    it('should show error if request has failed', () => {
        apiInterceptor.interceptGetAllTrips({})

        const { alias } = apiInterceptor.interceptGetTrip({ status: 500 })
        cy.visit(`http://localhost:3000/trip?tripId=${TRIP_ID}`)

        cy.wait(alias)

        tripDetailsPage.errorPageMessage
            .should('be.visible')
            .should('have.text', 'Couldn\'t find your trip')

        tripDetailsPage.errorPageButton
            .should('be.visible')
            .should('have.text', 'Go to your trips')
            .click()

        cy.location('pathname', { timeout: 60000 })
            .should('include', '/dashboard')

        tripsViewPage.addTripCard.should('be.visible')
    })
})