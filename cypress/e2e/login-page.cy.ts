import { apiInterceptor } from '../api/ApiInterceptor'
import { BASE_API_PATH } from 'config/envConfig'
// import 'cypress-axe'

describe('Login Page', () => {
    beforeEach(() => {
        // apiInterceptor.interceptGetUserDetails({})
        cy.visit('http://localhost:3000/login')
        cy.injectAxe()

    })
    it('should be accessible', () => {
        cy.visit('http://localhost:3000/login')
        // cy.checkA11y()
    })
})