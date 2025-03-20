import { InterceptorAlias, InterceptRequestOptions } from './types'

export abstract class ApiInterceptorBase {
    protected interceptRequest({
       url,
       method,
       alias,
       status,
       responseBody
    }: InterceptRequestOptions): Cypress.Chainable {
        const response = responseBody ? {
            statusCode: status,
            body: responseBody
        } : { statusCode: status }

        return cy.intercept( { method, url }, response).as(alias)
    }

    waitForIntercept(alias: InterceptorAlias): Cypress.Chainable {
        return cy.get(`@${alias}`)
    }
}