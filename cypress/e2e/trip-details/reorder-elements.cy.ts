import { apiInterceptor } from 'cypress/api/ApiInterceptor'
import { ACCOMMODATION_1, ACTIVITY_1, S1_OPTION_1_ID, SECTION_1_ID, TRANSPORT_1, TRIP_ID_3 } from 'testUtils/mockValues'
import { topBar } from 'cypress/fixtures/pages/TopBar'
import { elements } from 'cypress/fixtures/pages/Elements'
import { useGetTripResponses } from 'hooks/trips'
import { useGetSectionResponses } from 'hooks/sections'

describe('Reorder Elements', () => {

    beforeEach(() => {
        apiInterceptor.interceptGetUserDetails({ manualResolution: false })
        apiInterceptor.interceptGetSections({ tripId: TRIP_ID_3, responseBody: useGetSectionResponses[SECTION_1_ID] })
        apiInterceptor.interceptGetOptions({ tripId: TRIP_ID_3 })
        apiInterceptor.interceptGetPassengers({ tripId: TRIP_ID_3 })
        const { alias } = apiInterceptor.interceptGetTrip({ tripId: TRIP_ID_3, responseBody: useGetTripResponses[TRIP_ID_3] })
        cy.visit(`/trip?tripId=${TRIP_ID_3}`)

        cy.wait(alias)

        topBar.cookieBannerButton.click()
    })

    it('should successfully move elements around', () => {
        const { alias } = apiInterceptor.interceptBulkElementOrderUpdate({})

        elements.elementsList(S1_OPTION_1_ID)
            .should('be.visible')
            .children()
            .should('have.length', 4)
            .each(($el, index) => {
                const expectedTexts = [
                    'London Heathrow Airport (LHR)',
                    'Check-In',
                    'Snorkeling Adventure',
                    'Check-Out'
                ]
                cy.wrap($el).should('contain.text', expectedTexts[index])
            })


        elements.elementDragHandle(TRANSPORT_1)
            .should('be.visible')
            .realMouseDown({ position: 'center' })
            .realMouseMove(0, 200, { position: 'center' })
            .wait(50)
            .realMouseMove(0, 400, { position: 'center' })
            .wait(50)
            .realMouseMove(0, 700, { position: 'center' })
            .wait(50)
            .realMouseUp()

        cy.wait(alias)

        elements.elementsList(S1_OPTION_1_ID)
            .should('be.visible')
            .children()
            .should('have.length', 4)
            .each(($el, index) => {
                const expectedTexts = [
                    'Check-In',
                    'Snorkeling Adventure',
                    'London Heathrow Airport (LHR)',
                    'Check-Out'
                ]
                cy.wrap($el).should('contain.text', expectedTexts[index])
            })

        elements.elementDragHandle(ACTIVITY_1)
            .should('be.visible')
            .realMouseDown({ position: 'center' })
            .realMouseMove(0, -200, { position: 'center' })
            .wait(50)
            .realMouseMove(0, -400, { position: 'center' })
            .wait(50)
            .realMouseUp()

        cy.wait(alias)

        elements.elementsList(S1_OPTION_1_ID)
            .should('be.visible')
            .children()
            .should('have.length', 4)
            .each(($el, index) => {
                const expectedTexts = [
                    'Snorkeling Adventure',
                    'Check-In',
                    'London Heathrow Airport (LHR)',
                    'Check-Out'
                ]
                cy.wrap($el).should('contain.text', expectedTexts[index])
            })

        elements.elementDragHandle(`${ACCOMMODATION_1}-check-in`)
            .should('be.visible')
            .realMouseDown({ position: 'center' })
            .realMouseMove(0, -200, { position: 'center' })
            .wait(50)
            .realMouseMove(0, -400, { position: 'center' })
            .wait(50)
            .realMouseUp()

        cy.wait(alias)

        elements.elementsList(S1_OPTION_1_ID)
            .should('be.visible')
            .children()
            .should('have.length', 4)
            .each(($el, index) => {
                const expectedTexts = [
                    'Check-In',
                    'Snorkeling Adventure',
                    'London Heathrow Airport (LHR)',
                    'Check-Out'
                ]
                cy.wrap($el).should('contain.text', expectedTexts[index])
            })
    })

    it('should show error toast and revert on failed request', () => {
        const { alias } = apiInterceptor.interceptBulkElementOrderUpdate({ status: 500 })

        elements.elementsList(S1_OPTION_1_ID)
            .should('be.visible')
            .children()
            .should('have.length', 4)
            .each(($el, index) => {
                const expectedTexts = [
                    'London Heathrow Airport (LHR)',
                    'Check-In',
                    'Snorkeling Adventure',
                    'Check-Out'
                ]
                cy.wrap($el).should('contain.text', expectedTexts[index])
            })


        elements.elementDragHandle(TRANSPORT_1)
            .should('be.visible')
            .realMouseDown({ position: 'center' })
            .realMouseMove(0, 200, { position: 'center' })
            .wait(50)
            .realMouseMove(0, 400, { position: 'center' })
            .wait(50)
            .realMouseMove(0, 700, { position: 'center' })
            .wait(50)
            .realMouseUp()

        cy.wait(alias)

        elements.elementsList(S1_OPTION_1_ID)
            .should('be.visible')
            .children()
            .should('have.length', 4)
            .each(($el, index) => {
                const expectedTexts = [
                    'London Heathrow Airport (LHR)',
                    'Check-In',
                    'Snorkeling Adventure',
                    'Check-Out'
                ]
                cy.wrap($el).should('contain.text', expectedTexts[index])
            })

        elements.reorderElementsErrorToast
            .should('be.visible')
            .should('have.text', 'Couldn\'t reorder elements. Try again later.')
    })
})