import { tripDetailsPage } from 'cypress/fixtures/pages/TripDetails'
import { tripsViewPage } from 'cypress/fixtures/pages/TripsView'
import { apiInterceptor } from 'cypress/api/ApiInterceptor'
import { S1_OPTION_2_ID, S2_OPTION_1_ID, TRIP_ID, TRIP_ID_2 } from 'testUtils/mockValues'
import { useGetTripResponses } from 'hooks/trips'
import { tripDetailsFab } from 'cypress/fixtures/pages/TripDetailsFab'
import { SelectedOptionsMap } from 'provider/TripStateProvider/TripStateContext'

describe('Trip Details Page', () => {
    beforeEach(() => {
        apiInterceptor.interceptGetUserDetails({ manualResolution: false })
        apiInterceptor.interceptGetSections({})
        apiInterceptor.interceptGetPassengers({})
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

    it('should redirect to print page and open print window on download PDF', () => {
        const { alias } = apiInterceptor.interceptGetTrip({})
        cy.visit(`http://localhost:3000/trip?tripId=${TRIP_ID}`, {
            onBeforeLoad(win) {
                cy.stub(win, 'open').as('tripPrintPage')
            }
        })
        cy.wait(alias)

        tripDetailsFab.fab
            .should('be.visible')
            .click({ force: true })

        tripDetailsFab.downloadItineraryButton
            .should('be.visible')
            .click()

        cy.get('@tripPrintPage').should(
            'have.been.calledOnceWith',
            `/trip/print?tripId=${TRIP_ID}`
        )
    })

    it('should load trip data and trigger print dialog on print page', () => {
        const { alias } = apiInterceptor.interceptGetTrip({})

        const selectedOptions: SelectedOptionsMap = {
            SECTION_1_ID: S1_OPTION_2_ID,
            SECTION_2_ID: S2_OPTION_1_ID
        }

        cy.visit(`http://localhost:3000/trip/print?tripId=${TRIP_ID}`, {
            onBeforeLoad(win) {
                win.sessionStorage.setItem('selectedOptions', JSON.stringify(selectedOptions))
                cy.stub(win, 'print').as('print')
            },
        })

        cy.wait(alias)

        cy.get('@print').should('have.been.called')
    })

})