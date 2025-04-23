import { apiInterceptor } from 'cypress/api/ApiInterceptor'
import {
    ACCOMMODATION_1,
    ACCOMMODATION_2,
    ACTIVITY_1,
    ACTIVITY_2,
    PASSENGER_1,
    PASSENGER_4,
    PASSENGER_5,
    S1_OPTION_1_ID,
    S1_OPTION_2_ID,
    SECTION_1_ID,
    TRANSPORT_1,
    TRANSPORT_2,
    TRANSPORT_4,
    TRIP_ID
} from 'testUtils/mockValues'
import { tripDetailsPage } from 'cypress/fixtures/pages/TripDetails'
import { elementDrawer } from 'cypress/fixtures/modules/ElementDrawer'
import { accommCategories, activityCategories, transportCategories } from 'pages/TripDetails/AddElementDrawer'
import { drawer } from 'cypress/fixtures/modules/Drawers'
import {
    ElementStatus,
    ElementType,
    useGetAccommodationElementPairResponses,
    useGetActivityElementResponses,
    useGetTransportElementResponses
} from 'hooks/elements'
import { elements } from 'cypress/fixtures/pages/Elements'

describe('Add Element', () => {
    beforeEach(() => {
        apiInterceptor.interceptGetUserDetails({ manualResolution: false })
        apiInterceptor.interceptGetOptions({})
        apiInterceptor.interceptGetPassengers({})
        const { alias } = apiInterceptor.interceptGetTrip({})
        cy.visit(`http://localhost:3000/trip?tripId=${TRIP_ID}`)

        cy.wait(alias)
    })

    describe('Happy paths', () => {
        beforeEach(() => {
            apiInterceptor.interceptGetElements({})

            elements.elementsList(S1_OPTION_1_ID)
                .should('be.visible')
                .children()
                .should('have.length', 4)

            tripDetailsPage.sectionMenuIcon(SECTION_1_ID)
                .should('be.visible')
                .click()

            tripDetailsPage.sectionMenu.should('be.visible')
            tripDetailsPage.sectionMenuAddElement
                .should('be.visible')
                .click()

            elementDrawer.elementDrawer.should('be.visible')
        })

        it('should successfully add transport element', () => {
            const { alias } = apiInterceptor.interceptCreateTransportElement({})

            elementDrawer.transportRadioBtn
                .should('be.visible')
                .should('have.attr', 'aria-pressed', 'true')

            elementDrawer.categoryInputField.should('be.visible').click()
            elementDrawer.categoryListItem(transportCategories[0])
                .should('be.visible')
                .should('have.text', 'Flight')
                .click()

            elementDrawer.originPlaceInput.type('London')
            elementDrawer.originDate.type('23042025') // 23/04/2025
            elementDrawer.originTime.type('1200') // 12:00

            elementDrawer.destPlaceInput.type('Paris')
            elementDrawer.destDate.type('23042025') // 23/04/2025
            elementDrawer.destTime.type('1400') // 14:00

            elementDrawer.providerInput.type('British Airways')

            drawer.confirmButton.click()

            elementDrawer.priceInput.type('23.45')
            elementDrawer.linkInput.type('booking.com')
            elementDrawer.notesInput.type('My notes')

            elementDrawer.statusToggleItem(ElementStatus.PENDING)
                .should('be.visible')
                .click()

            elementDrawer.passengersLabel.should('have.text', 'Passengers')
            elementDrawer.passengerInList(PASSENGER_1)
                .should('be.visible')
                .click()

            elementDrawer.passengerInList(PASSENGER_4)
                .should('be.visible')
                .click()

            apiInterceptor.interceptGetElements({
                responseBody: [
                    useGetTransportElementResponses[TRANSPORT_1],
                    useGetAccommodationElementPairResponses[ACCOMMODATION_1][0],
                    useGetActivityElementResponses[ACTIVITY_1],
                    useGetAccommodationElementPairResponses[ACCOMMODATION_1][1],
                    useGetTransportElementResponses[TRANSPORT_2], // Different from the one created below; used to test refresh behavior
                ]
            })

            drawer.confirmButton.click()

            cy.wait(alias).then((intercept) => {
                expect(intercept.request.body).to.deep.equal({
                    baseElementRequest: {
                        elementType: ElementType.TRANSPORT,
                        elementCategory: 'Flight',
                        link: 'booking.com',
                        price: 23.45,
                        notes: 'My notes',
                        status: 'PENDING',
                        passengerIds: [PASSENGER_1, PASSENGER_4]
                    },
                    originPlace: 'London',
                    destinationPlace: 'Paris',
                    originDateTime: '2025-04-23T12:00:00',
                    destinationDateTime: '2025-04-23T14:00:00',
                    provider: 'British Airways',
                    order: 5 // there are already 4 elements in the 1st option
                })
            })

            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(2000)

            tripDetailsPage.optionTab(S1_OPTION_1_ID)
                .should('be.visible')

            elements.elementsList(S1_OPTION_1_ID)
                .should('be.visible')
                .children()
                .should('have.length', 5)
        })

        it('should successfully add activity element', () => {
            const { alias } = apiInterceptor.interceptCreateActivityElement({})

            elementDrawer.activityRadioBtn
                .should('be.visible')
                .click()

            elementDrawer.activityRadioBtn.should('have.attr', 'aria-pressed', 'true')

            elementDrawer.categoryInputField.should('be.visible').click()
            elementDrawer.categoryListItem(activityCategories[1])
                .should('be.visible')
                .should('have.text', 'Food & Drink')
                .click()

            elementDrawer.activityNameInput.type('Sphere Restaurant')
            elementDrawer.activityLocationInput.type('18 Rue La Boetie, 75008 Paris')

            elementDrawer.activityStartDateInput.type('23042025') // 23/04/2025
            elementDrawer.activityStartTimeInput.type('1400') // 14:00

            elementDrawer.activityHoursInput.type('2')
            elementDrawer.activityMinutesInput.type('30')

            drawer.confirmButton.click()

            elementDrawer.statusToggleItem(ElementStatus.BOOKED)
                .should('be.visible')
                .click()

            elementDrawer.passengersLabel.should('have.text', 'Guests')
            elementDrawer.passengerInList(PASSENGER_5)
                .should('be.visible')
                .click()

            apiInterceptor.interceptGetElements({
                responseBody: [
                    useGetTransportElementResponses[TRANSPORT_1],
                    useGetAccommodationElementPairResponses[ACCOMMODATION_1][0],
                    useGetActivityElementResponses[ACTIVITY_1],
                    useGetAccommodationElementPairResponses[ACCOMMODATION_1][1],
                    useGetActivityElementResponses[ACTIVITY_2], // Different from the one created below; used to test refresh behavior
                ]
            })

            drawer.confirmButton.click()

            cy.wait(alias).then((intercept) => {
                expect(intercept.request.body).to.deep.equal({
                    baseElementRequest: {
                        elementType: ElementType.ACTIVITY,
                        elementCategory: 'Food & Drink',
                        link: '',
                        notes: '',
                        status: 'BOOKED',
                        passengerIds: [PASSENGER_5]
                    },
                    activityName: 'Sphere Restaurant',
                    location: '18 Rue La Boetie, 75008 Paris',
                    startsAt: '2025-04-23T14:00:00',
                    duration: 150,
                    order: 5 // there are already 4 elements in the 1st option
                })
            })

            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(2000)

            tripDetailsPage.optionTab(S1_OPTION_1_ID)
                .should('be.visible')

            elements.elementsList(S1_OPTION_1_ID)
                .should('be.visible')
                .children()
                .should('have.length', 5)
        })

        it('should successfully add accommodation element', () => {
            const { alias } = apiInterceptor.interceptCreateAccommElement({})

            elementDrawer.accommRadioBtn
                .should('be.visible')
                .click()
            elementDrawer.accommRadioBtn.should('have.attr', 'aria-pressed', 'true')

            elementDrawer.categoryInputField.should('be.visible').click()
            elementDrawer.categoryListItem(accommCategories[0])
                .should('be.visible')
                .should('have.text', 'Hotel')
                .click()

            elementDrawer.accommPlace.type('Four Seasons Hotel')
            elementDrawer.accommLocation.type('31 Av. George V, 75008 Paris')

            elementDrawer.checkInDate.type('23042025') // 23/04/2025
            elementDrawer.checkInTime.type('0900') // 09:00

            elementDrawer.checkOutDate.type('26042025') // 26/04/2025
            elementDrawer.checkOutTime.type('1630') // 16:30

            drawer.confirmButton.click()

            elementDrawer.passengersLabel.should('have.text', 'Guests')

            apiInterceptor.interceptGetElements({
                responseBody: [
                    useGetTransportElementResponses[TRANSPORT_1],
                    useGetAccommodationElementPairResponses[ACCOMMODATION_1][0],
                    useGetActivityElementResponses[ACTIVITY_1],
                    useGetAccommodationElementPairResponses[ACCOMMODATION_1][1],
                    useGetAccommodationElementPairResponses[ACCOMMODATION_2][0], // Different from the one created below; used to test refresh behavior
                    useGetAccommodationElementPairResponses[ACCOMMODATION_2][1],
                ]
            })

            drawer.confirmButton.click()

            cy.wait(alias).then((intercept) => {
                expect(intercept.request.body).to.deep.equal({
                    baseElementRequest: {
                        elementType: ElementType.ACCOMMODATION,
                        elementCategory: 'Hotel',
                        link: '',
                        notes: '',
                        passengerIds: []
                    },
                    place: 'Four Seasons Hotel',
                    location: '31 Av. George V, 75008 Paris',
                    checkIn: {
                        dateTime: '2025-04-23T09:00:00',
                        order: 5
                    },
                    checkOut: {
                        dateTime: '2025-04-26T16:30:00',
                        order: 6
                    }
                })
            })

            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(2000)

            tripDetailsPage.optionTab(S1_OPTION_1_ID)
                .should('be.visible')

            elements.elementsList(S1_OPTION_1_ID)
                .should('be.visible')
                .children()
                .should('have.length', 6)
        })
    })

    it('should allow to create a custom category', () => {
        apiInterceptor.interceptGetElements({
            optionId: S1_OPTION_2_ID,
            responseBody: [
                useGetTransportElementResponses[TRANSPORT_2]
            ]
        })
        const { alias } = apiInterceptor.interceptCreateTransportElement({
            optionId: S1_OPTION_2_ID
        })

        tripDetailsPage.optionTab(S1_OPTION_2_ID) // using 2nd option
            .should('be.visible')
            .click()

        elements.elementsList(S1_OPTION_2_ID)
            .should('be.visible')
            .children()
            .should('have.length', 1)

        tripDetailsPage.sectionMenuIcon(SECTION_1_ID)
            .should('be.visible')
            .click()

        tripDetailsPage.sectionMenu.should('be.visible')
        tripDetailsPage.sectionMenuAddElement
            .should('be.visible')
            .click()

        elementDrawer.elementDrawer.should('be.visible')

        elementDrawer.categoryInputField.should('be.visible')
            .click()
            .type('Custom Transport')

        elementDrawer.originPlaceInput.type('London')
        elementDrawer.originDate.type('23042025') // 23/04/2025
        elementDrawer.originTime.type('1200') // 12:00

        elementDrawer.destPlaceInput.type('Paris')
        elementDrawer.destDate.type('23042025') // 23/04/2025
        elementDrawer.destTime.type('1400') // 14:00

        drawer.confirmButton.click()

        elementDrawer.passengersLabel.should('have.text', 'Passengers')
        drawer.confirmButton.click()

        apiInterceptor.interceptGetTransportElement({
            optionId: S1_OPTION_2_ID,
            elementId: TRANSPORT_4,
            responseBody: useGetTransportElementResponses[TRANSPORT_4]
        })
        apiInterceptor.interceptGetElements({
            optionId: S1_OPTION_2_ID,
            responseBody: [
                useGetTransportElementResponses[TRANSPORT_2],
                useGetTransportElementResponses[TRANSPORT_4]
            ]
        })
        cy.wait(alias)

        tripDetailsPage.optionTab(S1_OPTION_2_ID)
            .should('be.visible')

        elements.element('tr-element-2').should('be.visible')
        elements.element('tr-element-4').should('be.visible')

        elements.elementsList(S1_OPTION_2_ID)
            .should('be.visible')
            .children()
            .should('have.length', 2)

        elements.categoryBadgeIcon('tr-element-4', 'Custom Transport')
            .should('be.visible')
            .trigger('mouseover')

        elements.categoryBadgeTooltip('Custom Transport')
            .should('be.visible')
            .should('have.text', 'Custom Transport')
    })

    it('should be persistent', () => {
        apiInterceptor.interceptGetElements({})
        const { alias } = apiInterceptor.interceptCreateActivityElement({})

        tripDetailsPage.sectionMenuIcon(SECTION_1_ID).click()

        tripDetailsPage.sectionMenu.should('be.visible')
        tripDetailsPage.sectionMenuAddElement.click()

        elementDrawer.elementDrawer.should('be.visible')
        elementDrawer.activityRadioBtn
            .should('be.visible')
            .click()

        elementDrawer.activityRadioBtn.should('have.attr', 'aria-pressed', 'true')

        elementDrawer.categoryInputField.should('be.visible').click()
        elementDrawer.categoryListItem(activityCategories[0])
            .should('be.visible')
            .should('have.text', 'Sightseeing')
            .click()

        elementDrawer.activityNameInput.type('Sphere Restaurant')
        elementDrawer.activityLocationInput.type('18 Rue La Boetie, 75008 Paris')

        elementDrawer.activityStartDateInput.type('23042025') // 23/04/2025
        elementDrawer.activityStartTimeInput.type('1400') // 14:00

        elementDrawer.activityHoursInput.type('2')
        elementDrawer.activityMinutesInput.type('30')

        drawer.confirmButton.click()

        elementDrawer.priceInput.type('23.45')
        elementDrawer.linkInput.type('booking.com')
        elementDrawer.notesInput.type('My notes')

        elementDrawer.statusToggleItem(ElementStatus.BOOKED)
            .should('be.visible')
            .click()

        elementDrawer.passengersLabel.should('have.text', 'Guests')
        elementDrawer.passengerInList(PASSENGER_5)
            .should('be.visible')
            .click()

        drawer.cancelButton.click()

        elementDrawer.activityRadioBtn.should('have.attr', 'aria-pressed', 'true')

        elementDrawer.categoryInputField
            .should('be.visible')
            .should('have.value', 'Sightseeing')
            .click()
        elementDrawer.categoryListItem(activityCategories[1])
            .should('be.visible')
            .should('have.text', 'Food & Drink')
            .click()

        drawer.confirmButton.click()

        elementDrawer.passengerInList(PASSENGER_5)
            .should('be.visible')
            .click()

        drawer.confirmButton.click()

        cy.wait(alias).then((intercept) => {
            expect(intercept.request.body).to.deep.equal({
                baseElementRequest: {
                    elementType: ElementType.ACTIVITY,
                    elementCategory: 'Food & Drink',
                    link: 'booking.com',
                    notes: 'My notes',
                    price: 23.45,
                    status: 'BOOKED',
                    passengerIds: []
                },
                activityName: 'Sphere Restaurant',
                location: '18 Rue La Boetie, 75008 Paris',
                startsAt: '2025-04-23T14:00:00',
                duration: 150,
                order: 5
            })
        })
    })

    it('should show toast on failed request', () => {
        apiInterceptor.interceptGetElements({})
        const { alias } = apiInterceptor.interceptCreateAccommElement({ status: 500 })

        tripDetailsPage.sectionMenuIcon(SECTION_1_ID)
            .should('be.visible')
            .click()

        tripDetailsPage.sectionMenu.should('be.visible')
        tripDetailsPage.sectionMenuAddElement
            .should('be.visible')
            .click()

        elementDrawer.elementDrawer.should('be.visible')

        elementDrawer.accommRadioBtn
            .should('be.visible')
            .click()

        elementDrawer.accommRadioBtn.should('have.attr', 'aria-pressed', 'true')

        elementDrawer.categoryInputField.should('be.visible').click().type('Accomm')
        elementDrawer.accommPlace.type('Four Seasons Hotel')
        elementDrawer.accommLocation.type('31 Av. George V, 75008 Paris')

        elementDrawer.checkInDate.type('23042025') // 23/04/2025
        elementDrawer.checkInTime.type('0900') // 09:00

        elementDrawer.checkOutDate.type('26042025') // 26/04/2025
        elementDrawer.checkOutTime.type('1630') // 16:30

        drawer.confirmButton.click()

        elementDrawer.passengersLabel.should('have.text', 'Guests')
        drawer.confirmButton.click()

        cy.wait(alias)

        elementDrawer.createElementErrorToast
            .should('be.visible')
            .should('have.text', 'Couldn\'t create an element. Try again later.')
    })

    it('should close modal on cancel click', () => {
        apiInterceptor.interceptGetElements({})

        tripDetailsPage.sectionMenuIcon(SECTION_1_ID).click()

        tripDetailsPage.sectionMenu.should('be.visible')
        tripDetailsPage.sectionMenuAddElement.click()

        elementDrawer.elementDrawer.should('be.visible')

        drawer.cancelButton.should('be.visible').click()

        elementDrawer.elementDrawer.should('not.exist')
    })

    describe('Input Validation', () => {
        beforeEach(() => {
            apiInterceptor.interceptGetElements({})

            tripDetailsPage.sectionMenuIcon(SECTION_1_ID)
                .should('be.visible')
                .click()

            tripDetailsPage.sectionMenu.should('be.visible')
            tripDetailsPage.sectionMenuAddElement
                .should('be.visible')
                .click()

            elementDrawer.elementDrawer.should('be.visible')
        })

        it('should show errors in transport element form', () => {
            drawer.confirmButton
                .should('be.visible')
                .click()

            elementDrawer.categoryError
                .should('be.visible')
                .should('have.text', 'Required')

            elementDrawer.originPlaceError
                .should('be.visible')
                .should('have.text', 'Required')

            elementDrawer.originDateError
                .should('be.visible')
                .should('have.text', 'Required')

            elementDrawer.originTimeError
                .should('be.visible')
                .should('have.text', 'Required')

            elementDrawer.destPlaceError
                .should('be.visible')
                .should('have.text', 'Required')

            elementDrawer.destDateError
                .should('be.visible')
                .should('have.text', 'Required')

            elementDrawer.destTimeError
                .should('be.visible')
                .should('have.text', 'Required')
        })

        it('should show errors in activity element form', () => {
            elementDrawer.activityRadioBtn
                .should('be.visible')
                .click()

            elementDrawer.activityRadioBtn.should('have.attr', 'aria-pressed', 'true')

            drawer.confirmButton
                .should('be.visible')
                .click()

            elementDrawer.categoryError
                .should('be.visible')
                .should('have.text', 'Required')

            elementDrawer.activityNameError
                .should('be.visible')
                .should('have.text', 'Required')

            elementDrawer.activityLocationError
                .should('be.visible')
                .should('have.text', 'Required')

            elementDrawer.activityStartDateError.should('not.exist')
            elementDrawer.activityStartTimeError.should('not.exist')
            elementDrawer.activityHoursError.should('not.exist')
            elementDrawer.activityMinutesError.should('not.exist')
        })

        it('should show errors in accomm element form', () => {
            elementDrawer.accommRadioBtn
                .should('be.visible')
                .click()

            elementDrawer.accommRadioBtn.should('have.attr', 'aria-pressed', 'true')

            drawer.confirmButton
                .should('be.visible')
                .click()

            elementDrawer.categoryError
                .should('be.visible')
                .should('have.text', 'Required')

            elementDrawer.accommPlaceError
                .should('be.visible')
                .should('have.text', 'Required')

            elementDrawer.accommLocationError.should('not.exist')

            elementDrawer.checkInDateError
                .should('be.visible')
                .should('have.text', 'Required')

            elementDrawer.checkInTimeError
                .should('be.visible')
                .should('have.text', 'Required')

            elementDrawer.checkOutDateError
                .should('be.visible')
                .should('have.text', 'Required')

            elementDrawer.checkOutTimeError
                .should('be.visible')
                .should('have.text', 'Required')
        })

        it('should show errors on the second page', () => {
            elementDrawer.transportRadioBtn
                .should('be.visible')
                .should('have.attr', 'aria-pressed', 'true')

            elementDrawer.categoryInputField.should('be.visible').click()
            elementDrawer.categoryListItem(transportCategories[0])
                .should('be.visible')
                .should('have.text', 'Flight')
                .click()

            elementDrawer.originPlaceInput.type('London')
            elementDrawer.originDate.type('23042025') // 23/04/2025
            elementDrawer.originTime.type('1200') // 12:00

            elementDrawer.destPlaceInput.type('Paris')
            elementDrawer.destDate.type('23042025') // 23/04/2025
            elementDrawer.destTime.type('1400') // 14:00

            elementDrawer.providerInput.type('British Airways')

            drawer.confirmButton.click()

            elementDrawer.linkInput.type('not a link')
            elementDrawer.notesInput.type('a'.repeat(246)) // max is 245

            drawer.confirmButton.click()

            elementDrawer.linkError
                .should('be.visible')
                .should('have.text', 'Invalid URL')

            elementDrawer.notesError
                .should('be.visible')
                .should('have.text', 'Notes must be at most 245 characters')
        })
    })
})