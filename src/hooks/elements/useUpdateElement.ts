import { ElementType } from './types'
import { FormSchema } from 'pages/TripDetails/ElementDrawer'
import { UpdateTransportElementRequest, useUpdateTransportElement } from './useUpdateTransportElement'
import { UpdateActivityRequest, useUpdateActivityElement } from './useUpdateActivityElement'
import { UpdateAccommElementRequest, useUpdateAccommodationElement } from './useUpdateAccommodationElement'
import {
    getUpdateAccommRequestFromForm,
    getUpdateActivityRequestFromForm,
    getUpdateTransportRequestFromForm
} from 'pages/TripDetails/EditElementDrawer/utils'

interface UpdateElementProps {
    formValues: FormSchema
    sectionId: string
    optionId: string
    elementId: string
}

export const useUpdateElement = () => {
    const { mutateAsync: updateTransport } = useUpdateTransportElement()
    const { mutateAsync: updateActivity } = useUpdateActivityElement()
    const { mutateAsync: updateAccomm } = useUpdateAccommodationElement()

    const updateElement = async ({
        formValues,
        sectionId,
        optionId,
        elementId
    }: UpdateElementProps) => {
        const elementType = formValues.elementType

        switch (elementType) {
            case ElementType.TRANSPORT: {
                const transportRequest = getUpdateTransportRequestFromForm(formValues)
                if (!transportRequest) return null

                const request: UpdateTransportElementRequest = {
                    sectionId,
                    optionId,
                    baseElementId: elementId,
                    request: transportRequest
                }

                await updateTransport(request)
                break
            }
            case ElementType.ACTIVITY: {
                const activityRequest = getUpdateActivityRequestFromForm(formValues)
                if (!activityRequest) return null

                const request: UpdateActivityRequest = {
                    sectionId,
                    optionId,
                    baseElementId: elementId,
                    request: activityRequest
                }

                await updateActivity(request)
                break
            }
            case ElementType.ACCOMMODATION: {
                const accommRequest = getUpdateAccommRequestFromForm(formValues)
                if (!accommRequest) return null

                const request: UpdateAccommElementRequest = {
                    sectionId,
                    optionId,
                    baseElementId: elementId,
                    request: accommRequest
                }

                await updateAccomm(request)
                break
            }
        }
    }

    return { updateElement }
}