import { apiInterceptor } from '../api/ApiInterceptor'
import { tripsViewPage } from '../fixtures/pages/TripsView'
import { useGetAllTripsResponses } from 'hooks/trips/useGetAllTrips/useGetAllTrips.responses'
import { TRIP_ID, TRIP_ID_2 } from 'testUtils/mockValues'
import { modals } from '../fixtures/modules/Modals'

describe('Trips View - Happy Paths', () => {

    beforeEach(() => {
        apiInterceptor.interceptGetUserDetails({ manualResolution: false })
        apiInterceptor.interceptGetAllTrips({})

        cy.visit('http://localhost:3000/dashboard')
    })

    it('should show loading backdrop when loading trips', () => {
        const { resolve } = apiInterceptor.interceptGetAllTrips({ manualResolution: true })

        cy.visit('http://localhost:3000/dashboard')

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(2000)

        tripsViewPage.tripsViewLoading
            .should('be.visible')
            .then(() => {
                resolve?.()
            })

        tripsViewPage.tripsViewLoading.should('not.exist')
    })

    it('should show all the trips in the account' ,() => {
        tripsViewPage.topBar.should('be.visible')

        tripsViewPage.addTripCard
            .should('be.visible')
            .should('contain.text', 'Add new trip')

        tripsViewPage.tripCard(0).should('be.visible')
        tripsViewPage.tripCardPhoto(0)
            .should('be.visible')
            .should('have.attr', 'src')
            .should('include', 'trip-1')

        tripsViewPage.tripCardTripName(0)
            .should('be.visible')
            .should('contain.text', 'Paris Trip')

        tripsViewPage.tripCardDates(0)
            .should('be.visible')
            .should('contain.text', '24/03/2025 - 28/03/2025')

        tripsViewPage.tripCardTripName(0)
            .trigger('mouseover')

        tripsViewPage.tripCardTooltip(0)
            .should('be.visible')
            .should('contain.text', 'Click to open this itinerary')

        tripsViewPage.tripCard(1).should('be.visible')
        tripsViewPage.tripCardPhoto(1)
            .should('be.visible')
            .should('have.attr', 'src')
            .should('include', 'default')

        tripsViewPage.tripCardTripName(1)
            .should('be.visible')
            .should('contain.text', 'London Trip')

        tripsViewPage.tripCardDates(1)
            .should('not.exist')
    })

    it('should show not show any trips in the account if none found' ,() => {
        apiInterceptor.interceptGetAllTrips({
            responseBody: []
        })

        cy.visit('http://localhost:3000/dashboard')

        tripsViewPage.addTripCard
            .should('be.visible')
            .should('contain.text', 'Add new trip')

        tripsViewPage.tripCard(0).should('not.exist')
    })

    describe('Add Trip', () => {
        it('should show the trip in the list after successful creation' ,() => {
            tripsViewPage.addTripCard
                .should('be.visible')
                .click()

            tripsViewPage.createTripDrawer.should('be.visible')

            tripsViewPage.tripFormNameField
                .should('be.visible')
                .type('Japan Trip')

            tripsViewPage.tripFormStartDateField
                .should('be.visible')
                .type('23042025') // 23 04 2025

            tripsViewPage.tripFormEndDateField
                .should('be.visible')
                .type('29042025') // 29 04 2025

            tripsViewPage.tripFormStartDateField
                .should('have.value', '23/04/2025')

            tripsViewPage.tripFormEndDateField
                .should('have.value', '29/04/2025')

            tripsViewPage.tripFormImagePicker
                .should('be.visible')
                .children()
                .should('have.length', 9)

            cy.getById('trip-6')
                .should('be.visible')
                .click()

            const updatedTrips = [
                ...useGetAllTripsResponses.multipleTrips,
                {
                    tripId: 'f7f403dc-3ba0-490a-a503-4cb2ec36e4da',
                    tripName: 'Japan Trip',
                    createdAt: '2025-03-10T00:00:00',
                    imageRef: 'trip-6',
                    startDate: '2025-04-23T00:00:00',
                    endDate: '2025-04-29T00:00:00'
                }
            ]
            const  { alias, resolve } = apiInterceptor.interceptCreateTrip({ manualResolution: true })
            apiInterceptor.interceptGetAllTrips({ responseBody: updatedTrips })

            tripsViewPage.tripFormSubmitButton
                .should('be.visible')
                .click()

            tripsViewPage.tripFormSubmitButton
                .should('be.disabled')
                .then(() => {
                    resolve?.()
                })

            cy.wait(alias).then((interception) => {
                expect(interception.request.body).to.deep.equal({
                    tripName: 'Japan Trip',
                    imageRef: 'trip-6',
                    startDate: '2025-04-23T00:00:00',
                    endDate: '2025-04-29T00:00:00'
                })
            })

            tripsViewPage.createTripSuccessToast
                .should('be.visible')
                .should('contain.text', 'Japan Trip created!')

            tripsViewPage.tripCard(0)
                .should('be.visible')

            tripsViewPage.tripCardTripName(2)
                .should('contain.text', 'Japan Trip')
        })

        it('should allow for empty fields in the form' ,() => {
            tripsViewPage.addTripCard
                .should('be.visible')
                .click()

            tripsViewPage.createTripDrawer.should('be.visible')

            tripsViewPage.tripFormNameField
                .should('be.visible')
                .type('Poland Trip')


            const updatedTrips = [
                ...useGetAllTripsResponses.multipleTrips,
                {
                    tripId: 'f7f403dc-3ba0-490a-a503-4cb2ec36e4da',
                    tripName: 'Poland Trip',
                    createdAt: '2025-03-10T00:00:00',
                    imageRef: 'default',
                    startDate: undefined,
                    endDate: undefined
                }
            ]
            const  { alias } = apiInterceptor.interceptCreateTrip({ manualResolution: false })
            apiInterceptor.interceptGetAllTrips({ responseBody: updatedTrips })

            tripsViewPage.tripFormSubmitButton
                .should('be.visible')
                .click()

            cy.wait(alias).then((interception) => {
                expect(interception.request.body).to.deep.equal({
                    tripName: 'Poland Trip',
                    imageRef: 'default'
                })
            })

            tripsViewPage.createTripSuccessToast
                .should('be.visible')
                .should('contain.text', 'Poland Trip created!')

            tripsViewPage.tripCard(0)
                .should('be.visible')

            tripsViewPage.tripCardTripName(2)
                .should('contain.text', 'Poland Trip')
        })

        it('should close the drawer on cancel' ,() => {
            tripsViewPage.addTripCard
                .should('be.visible')
                .click()

            tripsViewPage.createTripDrawer.should('be.visible')

            tripsViewPage.tripFormCancelButton
                .should('be.visible')
                .click()

            tripsViewPage.createTripDrawer.should('not.exist')
        })
    })

    describe('Action Menu - Edit & Delete Trip', () => {
        it('should open menu and close it on outside click', () => {
            tripsViewPage.tripCard(0).should('be.visible')

            tripsViewPage.tripCardActionMenuButton(0)
                .should('be.visible')
                .click()

            tripsViewPage.actionPanel.should('be.visible')
            tripsViewPage.actionPanelEditTripButton.should('be.visible')
            tripsViewPage.actionPanelEditTripButton.should('be.visible')

            tripsViewPage.topBar.click()
            tripsViewPage.actionPanel.should('not.exist')
        })

        it('should show the trip in the list after editing it' ,() => {
            apiInterceptor.interceptGetAllTrips({ responseBody: useGetAllTripsResponses.oneTrip })
            cy.visit('http://localhost:3000/dashboard')

            tripsViewPage.tripCard(0).should('be.visible')

            tripsViewPage.tripCardActionMenuButton(0)
                .should('be.visible')
                .click()

            tripsViewPage.actionPanel.should('be.visible')

            tripsViewPage.actionPanelEditTripButton
                .should('be.visible')
                .click()

            tripsViewPage.editTripDrawer.should('be.visible')

            tripsViewPage.tripFormNameField
                .should('be.visible')
                .should('have.value', 'Paris Trip')

            tripsViewPage.tripFormNameField.clear().type('Madrid Trip')

            tripsViewPage.tripFormStartDateField
                .should('have.value', '24/03/2025')

            tripsViewPage.tripFormEndDateField
                .should('have.value', '28/03/2025')

            tripsViewPage.tripFormImagePicker
                .should('be.visible')
                .children()
                .should('have.length', 9)

            cy.getById('trip-2')
                .should('be.visible')
                .click()

            const updatedTrips = [
                {
                    tripId: TRIP_ID,
                    tripName: 'Madrid Trip',
                    createdAt: '2025-03-22T00:00:00',
                    imageRef: 'trip-6',
                    startDate: '2025-03-24T00:00:00',
                    endDate: '2025-03-28T00:00:00'
                }
            ]
            const  { alias, resolve } = apiInterceptor.interceptUpdateTrip({ manualResolution: true })
            apiInterceptor.interceptGetAllTrips({ responseBody: updatedTrips })

            tripsViewPage.tripFormSubmitButton
                .should('be.visible')
                .click()

            tripsViewPage.tripFormSubmitButton
                .should('be.disabled')
                .then(() => {
                    resolve?.()
                })

            cy.wait(alias).then((interception) => {
                expect(interception.request.body).to.deep.equal({
                    imageRef: 'trip-2',
                    tripName: 'Madrid Trip'
                })
            })

            tripsViewPage.updateTripSuccessToast
                .should('be.visible')
                .should('contain.text', 'Madrid Trip updated.')

            tripsViewPage.tripCard(0)
                .should('be.visible')

            tripsViewPage.tripCardTripName(0)
                .should('contain.text', 'Madrid Trip')
        })

        it('should not update a trip if form values were not changed', () => {
            tripsViewPage.tripCard(0).should('be.visible')

            tripsViewPage.tripCardActionMenuButton(0)
                .should('be.visible')
                .click()

            tripsViewPage.actionPanel.should('be.visible')

            tripsViewPage.actionPanelEditTripButton
                .should('be.visible')
                .click()

            tripsViewPage.editTripDrawer.should('be.visible')

            tripsViewPage.tripFormSubmitButton.click()

            tripsViewPage.editTripDrawer.should('not.exist')
            tripsViewPage.tripNotModifiedToast
                .should('be.visible')
                .should('have.text', 'Nothing to update!')
        })

        it('should successfully edit a trip with initial null values' ,() => {
            apiInterceptor.interceptGetAllTrips({ responseBody: useGetAllTripsResponses.withNullValues })
            cy.visit('http://localhost:3000/dashboard')

            tripsViewPage.tripCard(0).should('be.visible')

            tripsViewPage.tripCardActionMenuButton(0)
                .should('be.visible')
                .click()

            tripsViewPage.actionPanel.should('be.visible')

            tripsViewPage.actionPanelEditTripButton
                .should('be.visible')
                .click()

            tripsViewPage.editTripDrawer.should('be.visible')

            tripsViewPage.tripFormNameField
                .should('be.visible')
                .should('have.value', 'London Trip')

            tripsViewPage.tripFormStartDateField
                .should('have.value', '')
                .clear()
                .type('25052025') // 25 05 2025

            tripsViewPage.tripFormEndDateField
                .should('have.value', '')


            const updatedTrips = [
                {
                    tripId: TRIP_ID,
                    tripName: 'London Trip',
                    createdAt: '2025-03-22T00:00:00',
                    imageRef: 'default',
                    startDate: '2025-05-25T00:00:00',
                    endDate: undefined
                }
            ]
            const  { alias, resolve } = apiInterceptor.interceptUpdateTrip({ manualResolution: true })
            apiInterceptor.interceptGetAllTrips({ responseBody: updatedTrips })

            tripsViewPage.tripFormSubmitButton
                .should('be.visible')
                .click()

            tripsViewPage.tripFormSubmitButton
                .should('be.disabled')
                .then(() => {
                    resolve?.()
                })

            cy.wait(alias).then((interception) => {
                expect(interception.request.body).to.deep.equal({
                    startDate: '2025-05-25T00:00:00'
                })
            })

            tripsViewPage.updateTripSuccessToast
                .should('be.visible')
                .should('contain.text', 'London Trip updated.')

            tripsViewPage.tripCard(0)
                .should('be.visible')

            tripsViewPage.tripCardTripName(0)
                .should('contain.text', 'London Trip')

            tripsViewPage
                .tripCardDates(0)
                .should('have.text', '25/05/2025') // no end date
        })

        it('should refresh trip view after trip deletion', () => {
            tripsViewPage.tripCard(1).should('be.visible')

            tripsViewPage.tripCardActionMenuButton(1)
                .should('be.visible')
                .click()

            tripsViewPage.actionPanel.should('be.visible')

            tripsViewPage.actionPanelDeleteTripButton
                .should('be.visible')
                .click()

            modals.confirmDeleteModal.should('be.visible')
            modals.modalWarningIcon.should('be.visible')

            modals.modalText
                .should('be.visible')
                .should('contain.text', 'Are you sure you want to delete London Trip?')
                .should('contain.text', 'This action cannot be undone.')

            apiInterceptor.interceptDeleteTrip({ tripId: TRIP_ID_2 })
            apiInterceptor.interceptGetAllTrips({ responseBody: useGetAllTripsResponses.oneTrip })

            modals.modalConfirmButton
                .should('be.visible')
                .click()

            tripsViewPage.deleteTripSuccessToast
                .should('be.visible')
                .should('contain.text', 'Trip successfully deleted.')

            modals.confirmDeleteModal.should('not.exist')
            tripsViewPage.tripCard(1).should('not.exist')
        })

        it('should not delete trip and close modal on Cancel click', () => {
            tripsViewPage.tripCard(1).should('be.visible')

            tripsViewPage.tripCardActionMenuButton(1)
                .should('be.visible')
                .click()

            tripsViewPage.actionPanel.should('be.visible')

            tripsViewPage.actionPanelDeleteTripButton
                .should('be.visible')
                .click()

            modals.confirmDeleteModal.should('be.visible')

            modals.modalCancelButton
                .should('be.visible')
                .click()

            modals.confirmDeleteModal.should('not.exist')
            tripsViewPage.tripCard(1).should('be.visible')
        })

    })
})