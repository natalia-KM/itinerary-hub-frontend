import { apiInterceptor } from '../../api/ApiInterceptor'
import { SECTION_1_ID, TRIP_ID } from 'testUtils/mockValues'
import { tripDetailsPage } from '../../fixtures/pages/TripDetails'

describe('Sections', () => {
    beforeEach(() => {
        apiInterceptor.interceptGetUserDetails({ manualResolution: false })
        const { alias } = apiInterceptor.interceptGetTrip({})
        cy.visit(`http://localhost:3000/trip?tripId=${TRIP_ID}`)

        cy.wait(alias)
    })

    describe('Section Name', () => {
        it('should successfully update section name', () => {
            tripDetailsPage.sectionNameText(SECTION_1_ID)
                .should('be.visible')
                .should('have.text', 'Section 1')
                .click()

            tripDetailsPage.sectionNameText(SECTION_1_ID).should('not.exist')

            const { alias } = apiInterceptor.interceptUpdateSection({})

            tripDetailsPage.sectionNameInputField(SECTION_1_ID)
                .should('be.visible')
                .should('contain.value', 'Section 1')
                .clear()
                .should('contain.value', '') // make sure empty vals are allowed when editing
                .type('Updated Section')
                .blur()

            cy.wait(alias)

            tripDetailsPage.sectionNameText(SECTION_1_ID)
                .should('be.visible')
                .should('have.text', 'Updated Section')
        })

        it('should not trigger request if the name was cleared', () => {
            tripDetailsPage.sectionNameText(SECTION_1_ID)
                .should('be.visible')
                .should('have.text', 'Section 1')
                .click()

            tripDetailsPage.sectionNameText(SECTION_1_ID).should('not.exist')

            tripDetailsPage.sectionNameInputField(SECTION_1_ID)
                .should('be.visible')
                .should('contain.value', 'Section 1')
                .clear()
                .should('contain.value', '')
                .blur()

            tripDetailsPage.sectionNameText(SECTION_1_ID)
                .should('be.visible')
                .should('have.text', 'Section 1')
        })

        it('should not trigger request if the name was not changed', () => {
            tripDetailsPage.sectionNameText(SECTION_1_ID)
                .should('be.visible')
                .should('have.text', 'Section 1')
                .click()

            tripDetailsPage.sectionNameText(SECTION_1_ID).should('not.exist')

            tripDetailsPage.sectionNameInputField(SECTION_1_ID)
                .should('be.visible')
                .should('contain.value', 'Section 1')
                .blur()

            tripDetailsPage.sectionNameText(SECTION_1_ID)
                .should('be.visible')
                .should('have.text', 'Section 1')
        })

        it('should display error toast if the request failed', () => {
            tripDetailsPage.sectionNameText(SECTION_1_ID)
                .should('be.visible')
                .should('have.text', 'Section 1')
                .click()

            tripDetailsPage.sectionNameText(SECTION_1_ID).should('not.exist')

            const { alias } = apiInterceptor.interceptUpdateSection({ status: 500 })

            tripDetailsPage.sectionNameInputField(SECTION_1_ID)
                .should('be.visible')
                .should('contain.value', 'Section 1')
                .clear()
                .type('Updated Section')
                .blur()

            cy.wait(alias)

            tripDetailsPage.sectionUpdateFail
                .should('be.visible')
                .should('have.text', 'Couldn\'t update the section name. Try again later.')

            tripDetailsPage.sectionNameText(SECTION_1_ID)
                .should('be.visible')
                .should('have.text', 'Section 1')
        })
    })

})