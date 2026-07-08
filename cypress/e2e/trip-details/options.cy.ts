import { apiInterceptor } from 'cypress/api/ApiInterceptor'
import {
    S1_OPTION_1_ID,
    S1_OPTION_2_ID,
    S2_OPTION_1_ID,
    SECTION_1_ID,
    SECTION_2_ID,
    TRIP_ID
} from 'testUtils/mockValues'
import { tripDetailsPage } from 'cypress/fixtures/pages/TripDetails'
import { modals } from 'cypress/fixtures/modules/Modals'
import { OptionDetails, useGetOptionResponses } from 'hooks/options'

describe('Options', () => {
    beforeEach(() => {
        apiInterceptor.interceptGetUserDetails({ manualResolution: false })
        const { alias } = apiInterceptor.interceptGetTrip({})
        cy.visit(`/trip?tripId=${TRIP_ID}`)

        cy.wait(alias)
    })

    it('should show valid options on load', () => {
        tripDetailsPage.allOptionTabs(SECTION_1_ID)
            .should('be.visible')
            .children()
            .find('[role="tab"]')
            .should('have.length', 2)

        tripDetailsPage.allOptionTabs(SECTION_2_ID)
            .should('be.visible')
            .children()
            .should('have.length', 1)

        tripDetailsPage.optionTab(S1_OPTION_1_ID)
            .should('be.visible')
            .should('have.text', 'Option 1')

        tripDetailsPage.optionTab(S1_OPTION_2_ID)
            .should('be.visible')
            .should('have.text', 'Option 2')

        tripDetailsPage.optionTab(S2_OPTION_1_ID)
            .should('be.visible')
            .should('have.text', 'Option 1')
    })

    describe('Manage Options Modal', () => {
        beforeEach(() => {
            apiInterceptor.interceptGetOptions({})
            tripDetailsPage.sectionNameText(SECTION_1_ID).should('be.visible')

            tripDetailsPage.sectionMenuIcon(SECTION_1_ID)
                .should('be.visible')
                .click()

            tripDetailsPage.sectionMenu.should('be.visible')
            tripDetailsPage.sectionMenuManageOptions
                .should('be.visible')
                .click()
            tripDetailsPage.manageOptionsModal.should('be.visible')
        })

        it('should open the options modal with valid options', () => {
            tripDetailsPage.optionListItem(S1_OPTION_1_ID)
                .should('be.visible')
                .should('have.text', 'Option 1')

            tripDetailsPage.optionListItem(S1_OPTION_2_ID)
                .should('be.visible')
                .should('have.text', 'Option 2')

            tripDetailsPage.addOptionButton
                .should('be.visible')
                .should('be.enabled')

            modals.modalCancelButton.should('not.exist')

            modals.modalConfirmButton
                .should('be.visible')
                .should('be.enabled')
        })

        it('should successfully add an option', () => {
            const updatedResponse :OptionDetails[] = [
                useGetOptionResponses[S1_OPTION_1_ID],
                useGetOptionResponses[S1_OPTION_2_ID],
                {
                    optionId: 'new-option-id',
                    optionName: 'New Option',
                    order: 3
                }
            ]
            updatedResponse.forEach((option) => {
                apiInterceptor.interceptGetOption({ optionId: option.optionId, responseBody: option })
            })

            const { alias } = apiInterceptor.interceptCreateOption({})
            apiInterceptor.interceptGetOptions({ responseBody: updatedResponse })

            tripDetailsPage.addOptionButton
                .should('be.visible')
                .should('be.enabled')
                .click()

            tripDetailsPage.addOptionInput.type('New Option ')
            tripDetailsPage.confirmNewOptionIcon.click()

            cy.wait(alias).then((interception) => {
                expect(interception.request.body).to.deep.equal({
                    optionName: 'New Option',
                    order: 3
                })
            })

            tripDetailsPage.optionListItem(S1_OPTION_1_ID)
                .should('be.visible')
                .should('have.text', 'Option 1')

            tripDetailsPage.optionListItem(S1_OPTION_2_ID)
                .should('be.visible')
                .should('have.text', 'Option 2')

            tripDetailsPage.optionListItem('new-option-id')
                .should('be.visible')
                .should('have.text', 'New Option')

            modals.modalConfirmButton.click()

            tripDetailsPage.allOptionTabs(SECTION_1_ID)
                .should('be.visible')
                .children()
                .find('[role="tab"]')
                .should('have.length', 3)

            tripDetailsPage.optionTab('new-option-id')
                .should('be.visible')
                .should('have.text', 'New Option')
        })

        it('should hide the input field when clicked cancel', () => {
            tripDetailsPage.addOptionButton
                .should('be.visible')
                .should('be.enabled')
                .click()

            tripDetailsPage.addOptionInput
                .clear()
                .type('{enter}')

            tripDetailsPage.addOptionInvalidInputError
                .should('be.visible')
                .should('have.text', 'Name cannot be empty.')

            tripDetailsPage.addOptionInput.type('New Option ')
            tripDetailsPage.cancelNewOptionIcon.click()
            tripDetailsPage.addOptionInput.should('not.exist')
        })

        it('should successfully change option name', () => {
            const updatedResponse :OptionDetails[] = [
                {
                  optionName: 'Updated Option',
                  ...useGetOptionResponses[S1_OPTION_1_ID]
                },
                useGetOptionResponses[S1_OPTION_2_ID],
            ]
            updatedResponse.forEach((option) => {
                apiInterceptor.interceptGetOption({ optionId: option.optionId, responseBody: option })
            })

            const { alias } = apiInterceptor.interceptUpdateOption({})
            apiInterceptor.interceptGetOptions({ responseBody: updatedResponse })

            tripDetailsPage.optionListItemText(S1_OPTION_1_ID)
                .should('be.visible')
                .should('have.text', 'Option 1')

            tripDetailsPage.optionListItemEditIcon(S1_OPTION_1_ID)
                .should('be.visible')
                .click()

            tripDetailsPage.optionListItemText(S1_OPTION_1_ID).should('not.exist')

            tripDetailsPage.optionListItemInputField(S1_OPTION_1_ID)
                .should('have.value', 'Option 1')
                .clear()
                .type('Updated option')
                .type('{enter}')

            cy.wait(alias).then((interception) => {
                expect(interception.request.body).to.deep.equal({
                    optionName: 'Updated option'
                })
            })

            tripDetailsPage.optionListItemInputField(S1_OPTION_1_ID).should('not.exist')

            tripDetailsPage.optionListItemText(S1_OPTION_1_ID)
                .should('be.visible')
                .should('have.text', 'Updated option')

            modals.modalConfirmButton.click()

            tripDetailsPage.allOptionTabs(SECTION_1_ID)
                .should('be.visible')
                .children()
                .find('[role="tab"]')
                .should('have.length', 2)

            tripDetailsPage.optionTab(S1_OPTION_1_ID)
                .should('be.visible')
                .should('have.text', 'Updated option')
        })

        it('should successfully change options order', () => {
            const updatedResponse :OptionDetails[] = [
                useGetOptionResponses[S1_OPTION_2_ID],
                useGetOptionResponses[S1_OPTION_1_ID]
            ]
            apiInterceptor.interceptGetOptions({ responseBody: updatedResponse })

            updatedResponse.forEach((option) => {
                apiInterceptor.interceptGetOption({ optionId: option.optionId, responseBody: option })
            })
            const { alias } = apiInterceptor.interceptUpdateOptionOrders({})

            tripDetailsPage.optionListItem(S1_OPTION_1_ID).should('be.visible')
            tripDetailsPage.optionListItem(S1_OPTION_2_ID).should('be.visible')

            tripDetailsPage.manageOptionsList
                .should('be.visible')
                .children()
                .should('have.length', 2)

            tripDetailsPage.manageOptionsList
                .should('be.visible')
                .children()
                .eq(0)
                .should('have.text', 'Option 1')

            tripDetailsPage.manageOptionsList
                .should('be.visible')
                .children()
                .eq(1)
                .should('have.text', 'Option 2')

            tripDetailsPage.optionListItemDragIcon(S1_OPTION_2_ID)
                .should('be.visible')
                .realMouseDown({ button: 'left', position: 'center' })
                .realMouseMove(0, -50, { position: 'center' })
                .realMouseUp()

            cy.wait(alias)

            tripDetailsPage.manageOptionsList
                .should('be.visible')
                .children()
                .eq(0)
                .should('have.text', 'Option 2')

            tripDetailsPage.manageOptionsList
                .should('be.visible')
                .children()
                .eq(1)
                .should('have.text', 'Option 1')

            modals.modalConfirmButton.click()

            tripDetailsPage.allOptionTabs(SECTION_1_ID)
                .should('be.visible')
                .children()
                .find('[role="tab"]')
                .should('have.length', 2)

            tripDetailsPage.allOptionTabs(SECTION_1_ID)
                .should('be.visible')
                .children()
                .find('[role="tab"]')
                .eq(0)
                .should('have.text', 'Option 2')
        })


        it('should successfully delete an option', () => {
            const updatedResponse :OptionDetails[] = [
                useGetOptionResponses[S1_OPTION_2_ID]
            ]
            apiInterceptor.interceptGetOption({ optionId: S1_OPTION_2_ID, responseBody: useGetOptionResponses[S1_OPTION_2_ID] })

            const { alias } = apiInterceptor.interceptDeleteOption({})
            apiInterceptor.interceptGetOptions({ responseBody: updatedResponse })

            tripDetailsPage.optionListItemText(S1_OPTION_1_ID)
                .should('be.visible')
                .should('have.text', 'Option 1')

            tripDetailsPage.optionListItemDeleteIcon(S1_OPTION_1_ID)
                .should('be.visible')
                .click()

            cy.wait(alias)

            tripDetailsPage.optionListItem(S1_OPTION_1_ID).should('not.exist')

            modals.modalConfirmButton.click()

            tripDetailsPage.allOptionTabs(SECTION_1_ID)
                .should('be.visible')
                .children()
                .find('[role="tab"]')
                .should('have.length', 1)

            tripDetailsPage.optionTab(S1_OPTION_1_ID).should('not.exist')
            tripDetailsPage.optionTab(S1_OPTION_2_ID).should('be.visible')
        })

        it('should show error toast on create option fail', () => {
            const { alias } = apiInterceptor.interceptCreateOption({ status: 500 })
            apiInterceptor.interceptGetOptions({})

            tripDetailsPage.addOptionButton
                .should('be.visible')
                .should('be.enabled')
                .click()

            tripDetailsPage.addOptionInput.type('New Option ')
            tripDetailsPage.confirmNewOptionIcon.click()

            cy.wait(alias)

            tripDetailsPage.optionErrorToast
                .should('be.visible')
                .should('have.text', 'There was an issue creating new option. Try again later.')
        })

        it('should show error toast on update option fail', () => {
            const { alias } = apiInterceptor.interceptUpdateOption({ status: 500, optionId: S1_OPTION_2_ID })
            apiInterceptor.interceptGetOptions({})

            tripDetailsPage.optionListItemEditIcon(S1_OPTION_2_ID)
                .should('be.visible')
                .click()

            tripDetailsPage.optionListItemInputField(S1_OPTION_2_ID)
                .clear()
                .type('New Option ')

            tripDetailsPage.optionListItemCheckIcon(S1_OPTION_2_ID).click()

            cy.wait(alias)

            tripDetailsPage.optionErrorToast
                .should('be.visible')
                .should('have.text', 'There was a problem updating the option name. Try again later.')
        })

        it('should show error toast on update option order fail', () => {
            const { alias } = apiInterceptor.interceptUpdateOptionOrders({ status: 500 })

            tripDetailsPage.manageOptionsList
                .should('be.visible')
                .children()
                .should('have.length', 2)

            tripDetailsPage.manageOptionsList
                .should('be.visible')
                .children()
                .eq(0)
                .should('have.text', 'Option 1')

            tripDetailsPage.manageOptionsList
                .should('be.visible')
                .children()
                .eq(1)
                .should('have.text', 'Option 2')

            tripDetailsPage.optionListItemDragIcon(S1_OPTION_2_ID)
                .should('be.visible')
                .realMouseDown({ button: 'left', position: 'center' })
                .realMouseMove(0, -50, { position: 'center' })
                .realMouseUp()

            cy.wait(alias)

            tripDetailsPage.optionErrorToast
                .should('be.visible')
                .should('have.text', 'There was a problem updating the order. Try again later.')

            // check that nothing has changed
            tripDetailsPage.manageOptionsList
                .should('be.visible')
                .children()
                .eq(0)
                .should('have.text', 'Option 1')

            tripDetailsPage.manageOptionsList
                .should('be.visible')
                .children()
                .eq(1)
                .should('have.text', 'Option 2')
        })

        it('should show error toast on delete option order fail', () => {
            const { alias } = apiInterceptor.interceptDeleteOption({ status: 500, optionId: S1_OPTION_2_ID })
            apiInterceptor.interceptGetOptions({})

            tripDetailsPage.optionListItemDeleteIcon(S1_OPTION_2_ID)
                .should('be.visible')
                .click()

            cy.wait(alias)

            tripDetailsPage.optionErrorToast
                .should('be.visible')
                .should('have.text', 'There was a problem deleting an option. Try again later.')
        })
    })


})