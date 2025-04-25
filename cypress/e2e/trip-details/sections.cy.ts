import { apiInterceptor } from 'cypress/api/ApiInterceptor'
import { SECTION_1_ID, SECTION_2_ID, TRIP_ID } from 'testUtils/mockValues'
import { tripDetailsPage } from 'cypress/fixtures/pages/TripDetails'
import { tripDetailsFab } from 'cypress/fixtures/pages/TripDetailsFab'
import { modals } from 'cypress/fixtures/modules/Modals'
import { useGetSectionResponses, useGetSectionsResponses } from 'hooks/sections'

describe('Sections', () => {
    beforeEach(() => {
        apiInterceptor.interceptGetUserDetails({ manualResolution: false })
        const { alias } = apiInterceptor.interceptGetTrip({})
        apiInterceptor.interceptGetSections({})
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

    describe('Add Section', () => {

        it('should successfully create a section', () => {
            const newSectionId = 'some-section-uuid'
            const newOptionId = 'some-option-uuid'
            const { resolve } = apiInterceptor.interceptCreateSection({ manualResolution: true })

            apiInterceptor.interceptGetSection({
                sectionId: newSectionId,
                responseBody: {
                    sectionId: newSectionId,
                    sectionName: 'New Section',
                    order: 3
                }
            })
            apiInterceptor.interceptGetSections({
                responseBody: [
                    ...useGetSectionsResponses[TRIP_ID],
                    {
                        sectionId: newSectionId,
                        sectionName: 'New Section',
                        order: 3
                    }
                ]
            })
            apiInterceptor.interceptGetOption({
                sectionId: newSectionId,
                optionId: newOptionId,
                responseBody: {
                    optionId: newOptionId,
                    optionName: 'Option 1',
                    order: 1
                }
            })
            apiInterceptor.interceptGetOptions({
                sectionId: newSectionId,
                responseBody: [
                    {
                        optionId: newOptionId,
                        optionName: 'Option 1',
                        order: 1
                    }
                ]
            })

            tripDetailsFab.fab
                .should('be.visible')
                .click({ force: true })

            tripDetailsFab.addSectionButton
                .should('be.visible')
                .click()

            tripDetailsFab.addSectionModal
                .should('be.visible')
                .should('contain.text', 'Add New Section')

            tripDetailsFab.addSectionModalInput.type('New Section')

            modals.modalConfirmButton.click()

            modals.modalConfirmButton
                .should('be.disabled') // loading state
                .then(() => {
                    resolve?.()
                })
            tripDetailsPage.sectionNameText(newSectionId)
                .should('be.visible')
                .should('have.text', 'New Section')

            tripDetailsPage.optionTab(newOptionId)
                .should('be.visible')
                .should('have.text', 'Option 1')
        })

        it('should not allow to submit when input is invalid', () => {
            tripDetailsFab.fab
                .should('be.visible')
                .click({ force: true })

            tripDetailsFab.addSectionButton
                .should('be.visible')
                .click()
            modals.modalConfirmButton.should('be.disabled')

            tripDetailsFab.addSectionModalInput.type('Valid name')
            modals.modalConfirmButton.should('be.enabled')

            tripDetailsFab.addSectionModalInput.clear()
            modals.modalConfirmButton.should('be.disabled')

            tripDetailsFab.addSectionModalInput.type('  ')
            modals.modalConfirmButton.should('be.enabled').click()

            tripDetailsFab.addSectionModalInputError
                .should('be.visible')
                .should('have.text', 'Invalid section name')
        })

        it('should show an error toast on failed request', () => {
            apiInterceptor.interceptCreateSection({ status: 500 })

            tripDetailsFab.fab
                .should('be.visible')
                .click({ force: true })

            tripDetailsFab.addSectionButton
                .should('be.visible')
                .click()

            tripDetailsFab.addSectionModalInput.type('Valid name')

            modals.modalConfirmButton.click()

            tripDetailsFab.addSectionModalErrorToast
                .should('be.visible')
                .should('have.text', 'Couldn\'t create a new section. Try again later')
        })

        it('should close the modal on cancel', () => {
            tripDetailsFab.fab
                .should('be.visible')
                .click({ force: true })

            tripDetailsFab.addSectionButton
                .should('be.visible')
                .click()

            tripDetailsFab.addSectionModal
                .should('be.visible')
                .should('contain.text', 'Add New Section')

            modals.modalCancelButton.click()
            tripDetailsFab.addSectionModal.should('not.exist')
        })
    })

    describe('Delete Section', () => {
        it('should successfully delete a section', () => {
            apiInterceptor.interceptDeleteSection({})
            apiInterceptor.interceptGetSections({
                responseBody: [
                    useGetSectionResponses[SECTION_2_ID]
                ]
            })

            tripDetailsPage.sectionNameText(SECTION_1_ID).should('be.visible')
            tripDetailsPage.sectionMenuIcon(SECTION_1_ID)
                .should('be.visible')
                .click()

            tripDetailsPage.sectionMenu.should('be.visible')
            tripDetailsPage.sectionMenuDeleteSection
                .should('be.visible')
                .click()

            modals.confirmDeleteModal.should('be.visible')
            modals.modalText
                .should('contain.text', 'Are you sure you want to delete Section 1 and all its elements?')
                .should('contain.text', 'This action cannot be undone')

            modals.modalConfirmButton.click()

            tripDetailsPage.deleteSectionToast
                .should('be.visible')
                .should('have.text', 'Section deleted successfully')

            tripDetailsPage.sectionNameText(SECTION_1_ID).should('not.exist')
        })

        it('should show error toast on failure', () => {
            apiInterceptor.interceptDeleteSection({ status: 500 })

            tripDetailsPage.sectionNameText(SECTION_1_ID).should('be.visible')
            tripDetailsPage.sectionMenuIcon(SECTION_1_ID).click()

            tripDetailsPage.sectionMenu.should('be.visible')
            tripDetailsPage.sectionMenuDeleteSection.click()

            modals.confirmDeleteModal.should('be.visible')
            modals.modalConfirmButton.click()

            tripDetailsPage.deleteSectionToast
                .should('be.visible')
                .should('have.text', 'Couldn\'t delete the section. Try again later')

            tripDetailsPage.sectionNameText(SECTION_1_ID).should('be.visible')
        })

        it('should close the modal on cancel', () => {
            tripDetailsPage.sectionMenuIcon(SECTION_1_ID)
                .should('be.visible')
                .click()

            tripDetailsPage.sectionMenu.should('be.visible')
            tripDetailsPage.sectionMenuDeleteSection.click()

            modals.confirmDeleteModal.should('be.visible')
            modals.modalCancelButton.click()
            modals.confirmDeleteModal.should('not.exist')
        })
    })
})