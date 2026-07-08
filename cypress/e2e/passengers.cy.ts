import { apiInterceptor } from 'cypress/api/ApiInterceptor'
import { passengerDrawer } from 'cypress/fixtures/pages/Passengers'
import { PASSENGER_1 } from 'testUtils/mockValues'
import { useGetPassengersResponses } from 'hooks/passengers/useGetPassengers/useGetPassengers.responses'
import { topBar } from 'cypress/fixtures/pages/TopBar'
import { modals } from 'cypress/fixtures/modules/Modals'

describe('Passengers', () => {

    beforeEach(() => {
        apiInterceptor.interceptGetUserDetails({ manualResolution: false })
        apiInterceptor.interceptGetAllTrips({})
        apiInterceptor.interceptGetPassengers({})

        cy.visit('/dashboard')
    })


    it('should show all passengers and elements', () => {
        passengerDrawer.closedBar
            .should('be.visible')
            .trigger('mouseover')

        passengerDrawer.header
            .should('be.visible')
            .should('have.text', 'Passengers')

        passengerDrawer.enableEditModeIcon
            .should('be.visible')

        useGetPassengersResponses.forEach((passenger) => {
            const passengerId = passenger.passengerId

            passengerDrawer.passengerFullName(passengerId)
                .should('be.visible')
                .should('have.text', `${passenger.firstName} ${passenger.lastName}`)

            passengerDrawer.passengerModifyIcon(passengerId).should('not.exist')
            passengerDrawer.passengerDeleteIcon(passengerId).should('not.exist')
        })
    })

    it('should close the drawer on mouseleave when not in edit mode', () => {
        passengerDrawer.closedBar
            .should('be.visible')
            .realHover()

        passengerDrawer.header
            .should('be.visible')

        topBar.accountButton
            .realHover()

        passengerDrawer.header.should('not.exist')
    })

    it('should keep the drawer open on edit mode', () => {
        passengerDrawer.closedBar
            .should('be.visible')
            .realHover()

        passengerDrawer.enableEditModeIcon.click()

        passengerDrawer.header
            .should('be.visible')

        topBar.accountButton.realHover()

        passengerDrawer.header
            .should('be.visible')
    })

    it('should toggle add and edit', () => {
        passengerDrawer.closedBar
            .should('be.visible')
            .trigger('mouseover')

        passengerDrawer.enableEditModeIcon.click()
        passengerDrawer.closeEditModeIcon.should('be.visible')

        passengerDrawer.passengerModifyIcon(PASSENGER_1).click()
        passengerDrawer.editPassengerForm.should('be.visible')

        passengerDrawer.addPassengerIcon.click()
        passengerDrawer.addPassengerForm.should('be.visible')
        passengerDrawer.editPassengerForm.should('not.exist')

        passengerDrawer.passengerModifyIcon(PASSENGER_1).click()
        passengerDrawer.editPassengerForm.should('be.visible')
        passengerDrawer.addPassengerForm.should('not.exist')
    })

    describe('Add Passenger', () => {
        beforeEach(() => {
            passengerDrawer.closedBar
                .should('be.visible')
                .trigger('mouseover')

            passengerDrawer.enableEditModeIcon.click()
            passengerDrawer.addPassengerIcon.click()
        })

        it('should successfully add a passenger', () => {
            const newPassengerID = 'some-uuid'

            apiInterceptor.interceptCreatePassenger({})
            apiInterceptor.interceptGetPassengers({
                responseBody: [
                    ...useGetPassengersResponses,
                    {
                        passengerId: newPassengerID,
                        firstName: 'Nat',
                        lastName: 'Km',
                        avatar: 'default'
                    }
                ]
            })

            passengerDrawer.addPassengerForm.should('be.visible')
            passengerDrawer.addPassengerFirstName.type('Nat')
            passengerDrawer.addPassengerLastName.type('Km')
            passengerDrawer.passengerFormConfirmIcon.click()

            passengerDrawer.passengerFullName(newPassengerID)
                .should('be.visible')
                .should('have.text', 'Nat Km')
        })

        it('should show input error when invalid input on add passenger', () => {
            passengerDrawer.addPassengerForm.should('be.visible')
            passengerDrawer.addPassengerFirstName.type('Nat')
            passengerDrawer.passengerFormConfirmIcon.click()

            passengerDrawer.passengerFormInputError
                .should('be.visible')
                .should('have.text', 'The fields cannot be empty.')

            passengerDrawer.addPassengerFirstName.clear()
            passengerDrawer.addPassengerLastName.type('Km')
            passengerDrawer.passengerFormConfirmIcon.click()

            passengerDrawer.passengerFormInputError
                .should('be.visible')
                .should('have.text', 'The fields cannot be empty.')
        })

        it('should show error toast on failed add', () => {
            apiInterceptor.interceptCreatePassenger({ status: 500 })

            passengerDrawer.addPassengerForm.should('be.visible')
            passengerDrawer.addPassengerFirstName.type('Nat')
            passengerDrawer.addPassengerLastName.type('Km')
            passengerDrawer.passengerFormConfirmIcon.click()

            passengerDrawer.addPassengerErrorToast
                .should('be.visible')
                .should('have.text', 'Couldn\'t add a passenger. Try again later')
        })

        it('should close form on cancel', () => {
            passengerDrawer.addPassengerForm.should('be.visible')
            passengerDrawer.passengerFormCancelIcon
                .click()
            passengerDrawer.addPassengerForm.should('not.exist')
        })
    })

    describe('Edit Passenger', () => {
        beforeEach(() => {
            passengerDrawer.closedBar
                .should('be.visible')
                .trigger('mouseover')

            passengerDrawer.enableEditModeIcon.click()
            passengerDrawer.passengerModifyIcon(PASSENGER_1).click()
            passengerDrawer.editPassengerForm.should('be.visible')
        })

        it('should successfully edit a passenger', () => {
            apiInterceptor.interceptUpdatePassenger({ passengerId: PASSENGER_1 })
            apiInterceptor.interceptGetPassengers({
                responseBody: [
                    ...useGetPassengersResponses.slice(1),
                    {
                        passengerId: PASSENGER_1,
                        firstName: 'Jane',
                        lastName: 'Dane',
                        avatar: 'default'
                    }
                ]
            })

            passengerDrawer.editPassengerForm.should('be.visible')
            passengerDrawer.editPassengerFirstName.type('Jane')
            passengerDrawer.editPassengerLastName.type('Dane')
            passengerDrawer.passengerFormConfirmIcon.click()

            passengerDrawer.passengerFullName(PASSENGER_1)
                .should('be.visible')
                .should('have.text', 'Jane Dane')
        })

        it('should show input error when invalid input on edit passenger', () => {
            passengerDrawer.editPassengerForm.should('be.visible')
            passengerDrawer.editPassengerFirstName.clear()
            passengerDrawer.passengerFormConfirmIcon.click()

            passengerDrawer.passengerFormInputError
                .should('be.visible')
                .should('have.text', 'The fields cannot be empty.')

            passengerDrawer.editPassengerFirstName.type('Nat')
            passengerDrawer.editPassengerLastName.clear()
            passengerDrawer.passengerFormConfirmIcon.click()

            passengerDrawer.passengerFormInputError
                .should('be.visible')
                .should('have.text', 'The fields cannot be empty.')
        })

        it('should not call update if the values remain the same', () => {
            passengerDrawer.editPassengerFirstName.clear().type('John') // current vals
            passengerDrawer.editPassengerLastName.clear().type('Doe')

            passengerDrawer.passengerFormConfirmIcon.click()
            // since create is not intercepted, if the request was made it would show a toast
            passengerDrawer.addPassengerErrorToast.should('not.exist')
        })

        it('should show error toast on failed edit', () => {
            apiInterceptor.interceptUpdatePassenger({ status: 500 })

            passengerDrawer.editPassengerForm.should('be.visible')
            passengerDrawer.editPassengerFirstName.clear().type('Jane')
            passengerDrawer.passengerFormConfirmIcon.click()

            passengerDrawer.addPassengerErrorToast
                .should('be.visible')
                .should('have.text', 'Couldn\'t update passenger. Try again later')
        })

        it('should close form on cancel', () => {
            passengerDrawer.editPassengerForm.should('be.visible')
            passengerDrawer.passengerFormCancelIcon.click()
            passengerDrawer.editPassengerForm.should('not.exist')
        })
    })

    describe('Delete Passenger', () => {
        beforeEach(() => {
            passengerDrawer.closedBar
                .should('be.visible')
                .trigger('mouseover')

            passengerDrawer.enableEditModeIcon.click()

            passengerDrawer.passengerDeleteIcon(PASSENGER_1).click()
            passengerDrawer.confirmDeletePassengerModal.should('be.visible')
        })

        it('should successfully delete a passenger', () => {
            apiInterceptor.interceptDeletePassenger({
                passengerId: PASSENGER_1
            })
            apiInterceptor.interceptGetPassengers({
                responseBody: [
                    ...useGetPassengersResponses.slice(1)
                ]
            })

            passengerDrawer.confirmDeletePassengerModal
                .should('contain.text', 'Are you sure you want to delete passenger John Doe?')
                .should('contain.text', 'They will be removed from all trips, and this action cannot be undone.')
            modals.modalConfirmButton.click()

            passengerDrawer.passengerFullName(PASSENGER_1).should('not.exist')
        })

        it('should close modal on cancel', () => {
            modals.modalCancelButton.click()
            passengerDrawer.confirmDeletePassengerModal.should('not.exist')
        })

        it('should show error toast on failed delete', () => {
            apiInterceptor.interceptDeletePassenger({
                passengerId: PASSENGER_1,
                status: 500
            })
            modals.modalConfirmButton.click()

            passengerDrawer.deletePassengerErrorToast
                .should('be.visible')
                .should('have.text', 'Couldn\'t delete the passenger. Try again later')
        })
    })

})