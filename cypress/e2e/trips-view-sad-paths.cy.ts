import { apiInterceptor } from '../api/ApiInterceptor'
import { tripsViewPage } from '../fixtures/pages/TripsView'
import { useGetAllTripsResponses } from 'hooks/useGetAllTrips/useGetAllTrips.responses'
import { modals } from '../fixtures/modules/Modals'

describe('Trips View - Sad Paths', () => {
    beforeEach(() => {
        apiInterceptor.interceptGetUserDetails({ manualResolution: false })
    })

    it('should not show any trips and display a toast on getTrips request error' ,() => {
        apiInterceptor.interceptGetAllTrips({ status: 500 })

        cy.visit('http://localhost:3000/dashboard')

        tripsViewPage.tripsViewFailErrorToast
            .should('be.visible')
            .should('have.text','There was an error getting your trips')

        tripsViewPage.addTripCard
            .should('be.visible')

        tripsViewPage.tripCard(0).should('not.exist')
    })

    describe('Add/Edit/Delete Trip', () => {
        beforeEach(() => {
            apiInterceptor.interceptGetAllTrips({ responseBody: useGetAllTripsResponses.oneTrip })
            cy.visit('http://localhost:3000/dashboard')
        })

        it('should validate trip name and not allow to confirm if the input is incorrect', () => {
            tripsViewPage.addTripCard
                .should('be.visible')
                .click()

            tripsViewPage.createTripDrawer.should('be.visible')

            tripsViewPage.tripFormSubmitButton.click()

            tripsViewPage.tripFormNameFieldErrors
                .should('be.visible')
                .should('contain.text', 'Trip name is a required field')

            tripsViewPage.tripFormSubmitButton.should('be.disabled')

            tripsViewPage.tripFormNameField
                .should('be.visible')
                .type('Pl')

            tripsViewPage.tripFormNameFieldErrors
                .should('be.visible')
                .should('contain.text', 'Trip name must be at least 3 characters')

            tripsViewPage.tripFormNameField
                .clear()
                .type('ppdskGWhbNNACGPZYCenEDGMhGHnBeuPWXxkBKAwBQjjRJFfDwC') // 51 chars

            tripsViewPage.tripFormNameFieldErrors
                .should('be.visible')
                .should('contain.text', 'Trip name must be at most 50 characters')

            tripsViewPage.tripFormNameField
                .clear()
                .type('Trip%')

            tripsViewPage.tripFormNameFieldErrors
                .should('be.visible')
                .should('contain.text', 'Only letters, spaces, and apostrophes are allowed.')

            tripsViewPage.tripFormSubmitButton.should('be.disabled')
        })

        it('should validate dates and not allow to confirm if the input is incorrect', () => {
            tripsViewPage.addTripCard
                .should('be.visible')
                .click()

            tripsViewPage.createTripDrawer.should('be.visible')

            tripsViewPage.tripFormNameField.type('London Trip')

            tripsViewPage.tripFormEndDateField
                .type('24052025') // 24 05 2025

            tripsViewPage.tripFormSubmitButton.click()

            tripsViewPage.tripFormEndDateFieldErrors
                .should('be.visible')
                .should('contain.text', 'To add an end date, add a start date first')

            tripsViewPage.tripFormSubmitButton.should('be.disabled')

            tripsViewPage.tripFormStartDateField
                .type('25052025') // 25 05 2025

            tripsViewPage.tripFormEndDateField
                .clear()
                .type('23052025') // 23 05 2025

            tripsViewPage.tripFormEndDateFieldErrors
                .should('be.visible')
                .should('contain.text', 'End date must be after start date')

            tripsViewPage.tripFormEndDateField
                .clear() // only clears the year?
                .type('2026')

            tripsViewPage.tripFormEndDateFieldErrors
                .should('not.exist')

            tripsViewPage.tripFormSubmitButton.should('be.enabled')
        })


        it('should show error toast on failed creation', () => {
            tripsViewPage.addTripCard
                .should('be.visible')
                .click()

            tripsViewPage.createTripDrawer.should('be.visible')
            tripsViewPage.tripFormNameField.type('London Trip')

            apiInterceptor.interceptCreateTrip({ status: 500 })

            tripsViewPage.tripFormSubmitButton.click()

            tripsViewPage.createTripErrorToast
                .should('be.visible')
                .should('contain.text', 'There was an error creating your trip.')

            tripsViewPage.tripCard(0).should('be.visible')
            tripsViewPage.tripCard(1).should('not.exist') // no trip created
        })

        it('should show error toast on failed update', () => {
            tripsViewPage.tripCard(0).should('be.visible')

            tripsViewPage.tripCardTripName(0)
                .should('contain.text', 'Paris Trip')

            tripsViewPage.tripCardActionMenuButton(0)
                .should('be.visible')
                .click()

            tripsViewPage.actionPanel.should('be.visible')

            tripsViewPage.actionPanelEditTripButton
                .should('be.visible')
                .click()

            tripsViewPage.editTripDrawer.should('be.visible')

            tripsViewPage.tripFormNameField.clear().type('Madrid Trip')

            apiInterceptor.interceptUpdateTrip({ status: 500 })

            tripsViewPage.tripFormSubmitButton
                .should('be.visible')
                .click()

            tripsViewPage.updateTripErrorToast
                .should('be.visible')
                .should('contain.text', 'There was an error updating your trip.')

            tripsViewPage.tripCardTripName(0)
                .should('contain.text', 'Paris Trip')
        })

        it('should show error toast on failed deletion', () => {
            tripsViewPage.tripCard(0).should('be.visible')

            tripsViewPage.tripCardActionMenuButton(0)
                .should('be.visible')
                .click()

            tripsViewPage.actionPanel.should('be.visible')

            tripsViewPage.actionPanelDeleteTripButton
                .should('be.visible')
                .click()

            modals.confirmDeleteModal.should('be.visible')

            apiInterceptor.interceptDeleteTrip({ status: 500 })

            modals.modalConfirmButton
                .should('be.visible')
                .click()

            tripsViewPage.deleteTripErrorToast
                .should('be.visible')
                .should('contain.text', 'There was an error deleting your trip.')

            modals.confirmDeleteModal.should('not.exist')
            tripsViewPage.tripCard(0).should('be.visible')
        })
    })
})