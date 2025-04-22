import { CreateTransportElementRequest, useCreateTransportElement } from './useCreateTransportElement'
import { CreateActivityRequest, useCreateActivityElement } from './useCreateActivityElement'
import { CreateAccommElementRequest, useCreateAccommodationElement } from './useCreateAccommodationElement'
import { ElementType } from './types'
import {
    FormSchema,
    getAccommRequestFromForm,
    getActivityRequestFromForm,
    getTransportRequestFromForm
} from 'pages/TripDetails/AddElementDrawer'

interface CreateElementProps {
    formValues: FormSchema
    sectionId: string
    optionId: string
    order: number
}

export const useCreateElement = () => {
    const { mutateAsync: createTransport } = useCreateTransportElement()
    const { mutateAsync: createActivity } = useCreateActivityElement()
    const { mutateAsync: createAccomm } = useCreateAccommodationElement()

    const createElement = async ({
        formValues,
        sectionId,
        optionId,
        order
    }: CreateElementProps) => {
        const elementType = formValues.elementType

        switch (elementType) {
            case ElementType.TRANSPORT: {
                const transportRequest = getTransportRequestFromForm(formValues, order)
                if (!transportRequest) return null

                const request: CreateTransportElementRequest = {
                    sectionId,
                    optionId,
                    request: transportRequest
                }

                await createTransport(request)
                break
            }
            case ElementType.ACTIVITY: {
                const activityRequest = getActivityRequestFromForm(formValues, order)
                if (!activityRequest) return null

                const request: CreateActivityRequest = {
                    sectionId,
                    optionId,
                    request: activityRequest
                }

                await createActivity(request)
                break
            }
            case ElementType.ACCOMMODATION: {
                const accommRequest = getAccommRequestFromForm(formValues, order)
                if (!accommRequest) return null

                const request: CreateAccommElementRequest = {
                    sectionId,
                    optionId,
                    request: accommRequest
                }

                await createAccomm(request)
                break
            }
        }
    }

    return { createElement }
}