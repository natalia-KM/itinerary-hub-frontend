import { ApiInterceptorResponse, ApiPromise, InterceptRequestOptions } from './types'
import { CyHttpMessages } from 'cypress/types/net-stubbing'

export abstract class ApiInterceptorBase {
    protected interceptRequest({
       url,
       method,
       alias,
       status,
       responseBody,
        manualResolution = false
    }: InterceptRequestOptions): ApiInterceptorResponse {
        const reply = (req: CyHttpMessages.IncomingHttpRequest) => {
            req.reply({
                body: responseBody ?? {},
                statusCode: status
            })
        }

        if(manualResolution) {
            let capturedPromise: ApiPromise

            const capturePromise =  new Promise((resolve) => {
                capturedPromise = resolve
            })

            cy.intercept(method, url, async (req) => {
                return capturePromise.then(() => {
                    reply(req)
                })
            }).as(alias)

            return {
                resolve: capturedPromise,
                alias: `@${alias}`
            }
        }

        cy.intercept(method, url, (req) => {
            reply(req)
        }).as(alias)

        return {
            alias: `@${alias}`
        }
    }
}