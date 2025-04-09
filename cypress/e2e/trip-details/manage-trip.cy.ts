import { TRIP_ID } from 'testUtils/mockValues'
import { apiInterceptor } from '../../api/ApiInterceptor'
import { tripDetailsPage } from '../../fixtures/pages/TripDetails'

describe('Manage Trip in Trip Details', () => {

    beforeEach(() => {
        apiInterceptor.interceptGetUserDetails({ manualResolution: false })
        const { alias } = apiInterceptor.interceptGetTrip({})
        cy.visit(`http://localhost:3000/trip?tripId=${TRIP_ID}`)

        cy.wait(alias)
    })
    /*
    TODO: after impl
    - delete trip
    - print trip
     */

    describe('Trip Name', () => {
        it('should successfully update trip name', () => {
            tripDetailsPage.tripNameText
                .should('be.visible')
                .should('have.text', 'US Trip')
                .click()

            tripDetailsPage.tripNameText.should('not.exist')

            const { alias } = apiInterceptor.interceptUpdateTrip({})

            tripDetailsPage.tripNameInputField
                .should('be.visible')
                .should('contain.value', 'US Trip')
                .clear()
                .should('contain.value', '') // make sure empty vals are allowed when editing
                .type('USA Trip')
                .blur()

            cy.wait(alias)

            tripDetailsPage.tripNameText
                .should('be.visible')
                .should('have.text', 'USA Trip')
        })

        it('should successfully update trip name using edit icon', () => {
            tripDetailsPage.tripNameText
                .should('be.visible')
                .should('have.text', 'US Trip')

            tripDetailsPage.tripNameEditIcon.click()

            tripDetailsPage.tripNameText.should('not.exist')

            const { alias } = apiInterceptor.interceptUpdateTrip({})

            tripDetailsPage.tripNameInputField
                .should('be.visible')
                .should('contain.value', 'US Trip')
                .clear()
                .should('contain.value', '') // make sure empty vals are allowed when editing
                .type('USA Trip')
                .blur()

            cy.wait(alias)

            tripDetailsPage.tripNameText
                .should('be.visible')
                .should('have.text', 'USA Trip')
        })

        it('should not trigger request if the name was cleared', () => {
            tripDetailsPage.tripNameText
                .should('be.visible')
                .should('have.text', 'US Trip')
                .click()

            tripDetailsPage.tripNameText.should('not.exist')

            tripDetailsPage.tripNameInputField
                .should('be.visible')
                .should('contain.value', 'US Trip')
                .clear()
                .should('contain.value', '')
                .blur()

            tripDetailsPage.tripNameText
                .should('be.visible')
                .should('have.text', 'US Trip')
            })

        it('should not trigger request if the name was not changed', () => {
            tripDetailsPage.tripNameText
                .should('be.visible')
                .should('have.text', 'US Trip')
                .click()

            tripDetailsPage.tripNameText.should('not.exist')

            tripDetailsPage.tripNameInputField
                .should('be.visible')
                .should('contain.value', 'US Trip')
                .blur()

            tripDetailsPage.tripNameText
                .should('be.visible')
                .should('have.text', 'US Trip')
        })

        it('should display error toast if the request failed', () => {
            tripDetailsPage.tripNameText
                .should('be.visible')
                .should('have.text', 'US Trip')
                .click()

            tripDetailsPage.tripNameText.should('not.exist')

            const { alias } = apiInterceptor.interceptUpdateTrip({ status: 500 })

            tripDetailsPage.tripNameInputField
                .should('be.visible')
                .should('contain.value', 'US Trip')
                .clear()
                .type('USA Trip')
                .blur()

            cy.wait(alias)

            tripDetailsPage.tripNameUpdateFailToast
                .should('be.visible')
                .should('have.text', 'Couldn\'t update the trip name. Try again later.')

            tripDetailsPage.tripNameText
                .should('be.visible')
                .should('have.text', 'US Trip')
        })
    })

    describe('Trip Dates', () => {
        const datesData = [
            {
                name: 'start date',
                textComponent: () => tripDetailsPage.startDateText,
                inputComponent: () => tripDetailsPage.startDateInputField,
                initialValue: '24/03/2025',
                validDate: '28032025',
                validDateText: '28/03/2025',
                invalidDate: '29032025',
                invalidDataErrorText: 'Start date must be before end date.',
                invalidDataToast: () => tripDetailsPage.startDateInvalidInputToast,
                failedRequestToast: () => tripDetailsPage.startDateUpdateFailToast
            },
            {
                name: 'end date',
                textComponent: () => tripDetailsPage.endDateText,
                inputComponent: () => tripDetailsPage.endDateInputField,
                initialValue: '28/03/2025',
                validDate: '30032025',
                validDateText: '30/03/2025',
                invalidDate: '23032025',
                invalidDataErrorText: 'End date must be after start date.',
                invalidDataToast: () => tripDetailsPage.endDateInvalidInputToast,
                failedRequestToast: () => tripDetailsPage.endDateUpdateFailToast
            }
        ]

        datesData.forEach((
            { name, textComponent, inputComponent, initialValue,
                validDate, invalidDate, invalidDataErrorText, validDateText,
                invalidDataToast, failedRequestToast }) => {

            it(`should successfully update trip ${name}`, () => {
                textComponent()
                    .should('be.visible')
                    .should('contain.text', initialValue)
                    .click()

                textComponent().should('not.exist')

                apiInterceptor.interceptUpdateTrip({})

                inputComponent()
                    .should('be.visible')
                    .should('have.value', initialValue)
                    .clear()
                    .type(validDate)
                    .type('{enter}')

                inputComponent().should('not.exist')

                textComponent()
                    .should('be.visible')
                    .should('contain.text', validDateText)
            })

            it(`should display error toast if the ${name} was invalid`, () => {
                textComponent()
                    .should('be.visible')
                    .should('contain.text', initialValue)
                    .click()

                textComponent().should('not.exist')

                inputComponent()
                    .should('be.visible')
                    .should('have.value', initialValue)
                    .clear()
                    .type(invalidDate)
                    .type('{enter}')

                inputComponent().should('not.exist')

                invalidDataToast()
                    .should('be.visible')
                    .should('have.text', invalidDataErrorText)

                textComponent()
                    .should('be.visible')
                    .should('contain.text', initialValue)
            })


            it(`should display error toast if the request failed on ${name} failed update`, () => {
                textComponent()
                    .should('be.visible')
                    .should('contain.text', initialValue)
                    .click()

                textComponent().should('not.exist')

                apiInterceptor.interceptUpdateTrip({ status: 500 })

                inputComponent()
                    .should('be.visible')
                    .should('have.value', initialValue)
                    .clear()
                    .type(validDate)
                    .type('{enter}')

                inputComponent().should('not.exist')

                failedRequestToast()
                    .should('be.visible')
                    .should('have.text', `Couldn't update the ${name}. Try again later.`)

                textComponent()
                    .should('be.visible')
                    .should('contain.text', initialValue)
            })
        })

        // these tests are applicable to the component itself, rather than data so testing only start OR end date
        it('should update trip start date on outside click', () => {
            tripDetailsPage.startDateText
                .should('be.visible')
                .should('contain.text', '24/03/2025')
                .click()

            tripDetailsPage.startDateText.should('not.exist')

            apiInterceptor.interceptUpdateTrip({})

            tripDetailsPage.startDateInputField
                .should('be.visible')
                .should('have.value', '24/03/2025')
                .clear()
                .type('28032025')

            tripDetailsPage.topBar.click()

            tripDetailsPage.startDateInputField.should('not.exist')

            tripDetailsPage.startDateText
                .should('be.visible')
                .should('contain.text', '28/03/2025')
        })

        it('should not trigger request if the date was cleared', () => {
            tripDetailsPage.startDateText
                .should('be.visible')
                .should('contain.text', '24/03/2025')
                .click()

            tripDetailsPage.startDateText.should('not.exist')

            tripDetailsPage.startDateInputField
                .should('be.visible')
                .should('have.value', '24/03/2025')
                .clear()
                .type('{enter}')

            tripDetailsPage.startDateInputField.should('not.exist')

            tripDetailsPage.startDateText
                .should('be.visible')
                .should('contain.text', '24/03/2025')
        })
    })
})