import { apiInterceptor } from 'cypress/api/ApiInterceptor'
import {
    ACCOMMODATION_1,
    ACTIVITY_1,
    PASSENGER_1,
    PASSENGER_2,
    S1_OPTION_1_ID,
    TRANSPORT_1,
    TRIP_ID
} from 'testUtils/mockValues'
import { tripDetailsPage } from 'cypress/fixtures/pages/TripDetails'
import { elementDrawer } from 'cypress/fixtures/modules/ElementDrawer'
import { accommCategories, activityCategories, transportCategories } from 'pages/TripDetails/ElementDrawer'
import { drawer } from 'cypress/fixtures/modules/Drawers'
import {
    AccommodationType,
    ElementStatus,
    ElementType,
    useGetAccommodationElementPairResponses,
    useGetActivityElementResponses,
    useGetTransportElementResponses
} from 'hooks/elements'
import { elements } from 'cypress/fixtures/pages/Elements'
import { topBar } from 'cypress/fixtures/pages/TopBar'
import { modals } from 'cypress/fixtures/modules/Modals'

describe('Element Actions', () => {
    beforeEach(() => {
        apiInterceptor.interceptGetUserDetails({ manualResolution: false })
        apiInterceptor.interceptGetSections({})
        apiInterceptor.interceptGetOptions({})
        apiInterceptor.interceptGetPassengers({})
        const { alias } = apiInterceptor.interceptGetTrip({})
        cy.visit(`/trip?tripId=${TRIP_ID}`)

        cy.wait(alias)

        topBar.cookieBannerButton.click()
    })

    describe('Edit Element', () => {
        beforeEach(() => {
            apiInterceptor.interceptGetElements({})

            elements.elementsList(S1_OPTION_1_ID)
                .should('be.visible')
                .children()
                .should('have.length', 4)
        })

        it('should successfully update transport element', () => {
            const { alias: updateElement } = apiInterceptor.interceptUpdateTransportElement({})
            const { alias: getElement } = apiInterceptor.interceptGetElement({ })

            elements.element(TRANSPORT_1).should('be.visible')
            elements.elementMenuButton(TRANSPORT_1).click()

            elements.elementMenu.should('be.visible')
            elements.editElementButton.click()

            cy.wait(getElement)

            elementDrawer.elementDrawer.should('be.visible')

            elementDrawer.transportRadioBtn
                .should('be.visible')
                .should('have.attr', 'aria-pressed', 'true')
                .should('be.disabled')

            elementDrawer.categoryInputField
                .should('be.visible')
                .should('have.value', 'Flight')
                .click()

            elementDrawer.categoryListItem(transportCategories[1])
                .should('be.visible')
                .should('have.text', 'Train')
                .click()

            elementDrawer.originPlaceInput
                .should('have.value', 'London Heathrow Airport (LHR)')
                .clear()
                .type('London')

            elementDrawer.originDate
                .should('have.value', '10/06/2025')
                .clear()
                .type('23042025')

            elementDrawer.originTime
                .should('have.value', '08:45')
                .clear()
                .type('1000')

            elementDrawer.destPlaceInput
                .should('have.value', 'John F. Kennedy Airport (JFK)')
                .clear()
                .type('JFK')

            elementDrawer.destDate
                .should('have.value', '10/06/2025')
                .clear()
                .type('23042025')

            elementDrawer.destTime
                .should('have.value', '11:30')
                .clear()
                .type('2000')

            elementDrawer.providerInput
                .should('have.value', 'British Airways')
                .clear()
                .type('WizzAir')

            drawer.confirmButton.click()

            elementDrawer.priceInput
                .should('have.value', '420')
                .clear()
                .type('500')

            elementDrawer.linkInput
                .should('have.value', 'https://britishairways.com/booking/123')
                .clear()
                .type('https://wizzair.com/booking/123')

            elementDrawer.notesInput
                .should('have.value', 'Check-in 2 hours before departure.')
                .clear()

            elementDrawer.statusToggleItem(ElementStatus.PENDING)
                .should('have.attr', 'aria-pressed', 'true')

            elementDrawer.statusToggleItem(ElementStatus.BOOKED).click()

            elementDrawer.passengersLabel.should('have.text', 'Passengers')
            elementDrawer.passengerInList(PASSENGER_1)
                .should('be.visible')
                .click()

            const { alias: refreshElement } = apiInterceptor.interceptGetTransportElement({
                responseBody: {
                    ...useGetTransportElementResponses[TRANSPORT_1],
                    originPlace: 'London' // just to check if the value was updated
                }
            })

            drawer.confirmButton.click()

            cy.wait(updateElement).then((intercept) => {
                expect(intercept.request.body).to.deep.equal({
                    baseElementRequest: {
                        elementType: ElementType.TRANSPORT,
                        elementCategory: 'Train',
                        link: 'https://wizzair.com/booking/123',
                        price: 500,
                        notes: '',
                        status: 'BOOKED',
                        passengerIds: [PASSENGER_1]
                    },
                    originPlace: 'London',
                    destinationPlace: 'JFK',
                    originDateTime: '2025-04-23T10:00:00',
                    destinationDateTime: '2025-04-23T20:00:00',
                    provider: 'WizzAir'
                })
            })

            cy.wait(refreshElement)

            tripDetailsPage.optionTab(S1_OPTION_1_ID)
                .should('be.visible')

            elements.transportOriginPlace(TRANSPORT_1).should('have.text', 'London')
        })

        it('should successfully update activity element', () => {
            const { alias: updateElement } = apiInterceptor.interceptUpdateActivityElement({})
            const { alias: getElement } = apiInterceptor.interceptGetElement({
                elementId: ACTIVITY_1,
                responseBody: [useGetActivityElementResponses[ACTIVITY_1]]
            })

            elements.element(ACTIVITY_1).should('be.visible')
            elements.elementMenuButton(ACTIVITY_1).click()

            elements.elementMenu.should('be.visible')
            elements.editElementButton.click()

            cy.wait(getElement)

            elementDrawer.elementDrawer.should('be.visible')

            elementDrawer.activityRadioBtn
                .should('be.visible')
                .should('have.attr', 'aria-pressed', 'true')
                .should('be.disabled')

            elementDrawer.categoryInputField
                .should('be.visible')
                .should('have.value', 'Water Activities')
                .click()
            elementDrawer.categoryListItem(activityCategories[2])
                .should('be.visible')
                .should('have.text', 'Nature & Outdoors')
                .click()

            elementDrawer.activityNameInput
                .should('have.value', 'Snorkeling Adventure')
                .clear()
                .type('Sphere Restaurant')
            elementDrawer.activityLocationInput
                .should('have.value', 'Great Barrier Reef, Australia')
                .clear()
                .type('18 Rue La Boetie, 75008 Paris')

            elementDrawer.activityStartDateInput
                .should('have.value', '01/05/2025')
                .clear()
                .type('23042025') // 23/04/2025
            elementDrawer.activityStartTimeInput
                .should('have.value', '09:00')
                .clear()
                .type('1400') // 14:00

            elementDrawer.activityHoursInput.should('have.value', '2').clear().type('0')
            elementDrawer.activityMinutesInput
                .should('have.value', '0')
                .type('50')

            drawer.confirmButton.click()

            elementDrawer.statusToggleItem(ElementStatus.BOOKED)
                .should('have.attr', 'aria-pressed', 'true')

            const { alias: refreshElement } = apiInterceptor.interceptGetActivityElement({
                elementId: ACTIVITY_1,
                responseBody: {
                    ...useGetActivityElementResponses[ACTIVITY_1],
                    activityName: 'Sphere Restaurant' // just to check if the value was updated
                }
            })

            drawer.confirmButton.click()

            cy.wait(updateElement).then((intercept) => {
                expect(intercept.request.body).to.deep.equal({
                    baseElementRequest: {
                        elementType: ElementType.ACTIVITY,
                        elementCategory: 'Nature & Outdoors',
                        link: 'https://example.com/snorkeling-tour',
                        price: 75,
                        notes: 'Bring your own sunscreen.',
                        status: 'BOOKED',
                        passengerIds: [PASSENGER_1, PASSENGER_2]
                    },
                    activityName: 'Sphere Restaurant',
                    location: '18 Rue La Boetie, 75008 Paris',
                    startsAt: '2025-04-23T14:00:00',
                    duration: 50
                })
            })

            cy.wait(refreshElement)

            tripDetailsPage.optionTab(S1_OPTION_1_ID)
                .should('be.visible')

            elements.activityName(ACTIVITY_1).should('have.text', 'Sphere Restaurant')
        })

        it('should successfully update accommodation element', () => {
            const checkInElementId = `${ACCOMMODATION_1}-check-in`

            const { alias: updateElement } = apiInterceptor.interceptUpdateAccommodationElementPair({})
            const { alias: getElement } = apiInterceptor.interceptGetElement({
                elementId: ACCOMMODATION_1,
                responseBody: useGetAccommodationElementPairResponses[ACCOMMODATION_1]
            })

            elements.element(checkInElementId).should('be.visible')
            elements.elementMenuButton(checkInElementId).click()

            elements.elementMenu.should('be.visible')
            elements.editElementButton.click()

            cy.wait(getElement)

            elementDrawer.elementDrawer.should('be.visible')
            elementDrawer.accommRadioBtn.should('have.attr', 'aria-pressed', 'true')

            elementDrawer.categoryInputField.should('have.value', 'Hotel').click()
            elementDrawer.categoryListItem(accommCategories[1])
                .should('be.visible')
                .should('have.text', 'AirBnb')
                .click()

            elementDrawer.accommPlace
                .should('have.value', 'Cozy Mountain Lodge')
                .clear()
                .type('Four Seasons Hotel')

            elementDrawer.accommLocation
                .should('have.value', 'Aspen, Colorado')
                .clear()
                .type('31 Av. George V, 75008 Paris')

            elementDrawer.checkInDate
                .should('have.value', '20/04/2025')
                .clear()
                .type('23042025') // 23/04/2025
            elementDrawer.checkInTime
                .should('have.value', '15:00')
                .clear()
                .type('0900') // 09:00

            elementDrawer.checkOutDate
                .should('have.value', '23/04/2025')
                .clear()
                .type('26042025') // 26/04/2025
            elementDrawer.checkOutTime
                .should('have.value', '17:00')
                .clear()
                .type('1630') // 16:30

            drawer.confirmButton.click()

            elementDrawer.linkInput
                .should('have.value', 'https://example.com/hotel')
                .clear()

            elementDrawer.notesInput
                .should('have.value', 'Check-in after 3 PM')
                .clear()

            const { alias: refreshAccommodation } = apiInterceptor.interceptGetAccommodationElement({
                elementId: ACCOMMODATION_1,
                responseBody: {
                    ...useGetAccommodationElementPairResponses[ACCOMMODATION_1][0],
                    place: 'Four Seasons Hotel'
                }
            })

            apiInterceptor.interceptGetAccommodationElement({
                elementId: ACCOMMODATION_1,
                accommType: AccommodationType.CHECK_OUT,
                responseBody: {
                    ...useGetAccommodationElementPairResponses[ACCOMMODATION_1][1],
                    place: 'Four Seasons Hotel'
                }
            })

            drawer.confirmButton.click()

            cy.wait(updateElement).then((intercept) => {
                expect(intercept.request.body).to.deep.equal({
                    baseElementRequest: {
                        elementType: ElementType.ACCOMMODATION,
                        elementCategory: 'AirBnb',
                        price: 199.99,
                        link: '',
                        notes: '',
                        passengerIds: [],
                        status: 'PENDING'
                    },
                    place: 'Four Seasons Hotel',
                    location: '31 Av. George V, 75008 Paris',
                    checkIn: {
                        dateTime: '2025-04-23T09:00:00'
                    },
                    checkOut: {
                        dateTime: '2025-04-26T16:30:00'
                    }
                })
            })

            cy.wait(refreshAccommodation)
            cy.wait(refreshAccommodation)

            tripDetailsPage.optionTab(S1_OPTION_1_ID)
                .should('be.visible')

            elements.accommPlace(checkInElementId).should('have.text', 'Four Seasons Hotel')
            elements.accommPlace(`${ACCOMMODATION_1}-check-out`).should('have.text', 'Four Seasons Hotel')
        })

        it('should show toast on failed request', () => {
            apiInterceptor.interceptGetElements({})
            const { alias } = apiInterceptor.interceptUpdateTransportElement({ status: 500 })
            const { alias: getElement } = apiInterceptor.interceptGetElement({ })

            elements.element(TRANSPORT_1).should('be.visible')
            elements.elementMenuButton(TRANSPORT_1).click()

            elements.elementMenu.should('be.visible')
            elements.editElementButton.click()

            cy.wait(getElement)

            elementDrawer.elementDrawer.should('be.visible')

            elementDrawer.transportRadioBtn
                .should('be.visible')
                .should('have.attr', 'aria-pressed', 'true')
                .should('be.disabled')

            elementDrawer.originPlaceInput
                .should('have.value', 'London Heathrow Airport (LHR)')
                .clear()
                .type('London')

            drawer.confirmButton.click()
            elementDrawer.passengersLabel.should('have.text', 'Passengers')

            drawer.confirmButton.click()
            cy.wait(alias)

            elementDrawer.updateElementErrorToast
                .should('be.visible')
                .should('have.text', 'Couldn\'t update an element. Try again later.')
        })
    })

    describe('Copy link', () => {

        it('should copy link', () => {
            cy.mockClipboard('https://britishairways.com/booking/123')

            elements.element(TRANSPORT_1).should('be.visible')
            elements.elementMenuButton(TRANSPORT_1).click()

            elements.elementMenu.should('be.visible')
            elements.copyElementButton.click()

            elements.copyLinkModal.should('be.visible')

            elements.copyLinkModalInput
                .should('be.visible')
                .should('have.value', 'https://britishairways.com/booking/123')

            elements.copyLinkModalIcon.click()
            elements.copyLinkToast
                .should('be.visible')
                .should('have.text', 'Link copied to clipboard')

            cy.window().then((win) => win.navigator.clipboard.readText())
                .should('equal', 'https://britishairways.com/booking/123')
        })

        it('should show toast on fail', () => {
            cy.rejectClipboard()

            elements.element(TRANSPORT_1).should('be.visible')
            elements.elementMenuButton(TRANSPORT_1).click()

            elements.elementMenu.should('be.visible')
            elements.copyElementButton.click()

            elements.copyLinkModal.should('be.visible')

            elements.copyLinkModalInput
                .should('be.visible')
                .should('have.value', 'https://britishairways.com/booking/123')

            elements.copyLinkModalIcon.click()
            elements.copyLinkToast
                .should('be.visible')
                .should('have.text', 'Couldn\'t copy link. Try again later.')
        })
    })

    describe('Delete Element', () => {
        it('should delete element', () => {
            apiInterceptor.interceptGetElements({
                responseBody: [
                    useGetAccommodationElementPairResponses[ACCOMMODATION_1][0],
                    useGetActivityElementResponses[ACTIVITY_1],
                    useGetAccommodationElementPairResponses[ACCOMMODATION_1][1]
                ]
            })
            apiInterceptor.interceptDeleteElement({})

            elements.element(TRANSPORT_1).should('be.visible')
            elements.elementMenuButton(TRANSPORT_1).click()

            elements.elementMenu.should('be.visible')
            elements.deleteElementButton.click()

            elements.deleteElementModal.should('be.visible')
            modals.modalConfirmButton.click()
            elements.element(TRANSPORT_1).should('not.exist')
        })

        it('should show toast on failed request', () => {
            apiInterceptor.interceptGetElements({})
            apiInterceptor.interceptDeleteElement({ status: 500 })

            elements.element(TRANSPORT_1).should('be.visible')
            elements.elementMenuButton(TRANSPORT_1).click()

            elements.elementMenu.should('be.visible')
            elements.deleteElementButton.click()

            elements.deleteElementModal.should('be.visible')
            modals.modalConfirmButton.click()

            elements.deleteElementErrorToast
                .should('be.visible')
                .should('have.text', 'Couldn\'t delete element. Try again later')
        })

        it('should close modal on cancel click', () => {
            elements.element(TRANSPORT_1).should('be.visible')
            elements.elementMenuButton(TRANSPORT_1).click()

            elements.elementMenu.should('be.visible')
            elements.deleteElementButton.click()

            elements.deleteElementModal.should('be.visible')
            modals.modalCancelButton.click()

            elements.deleteElementModal.should('not.exist')
        })
    })
})
