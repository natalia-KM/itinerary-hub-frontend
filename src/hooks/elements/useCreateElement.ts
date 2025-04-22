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
import { toast } from 'react-toastify'

interface CreateElementProps {
    formValues: FormSchema
    sectionId: string
    optionId: string
    order: number
    onClose: () => void
}

export const useCreateElement = () => {
    const { mutateAsync: createTransport } = useCreateTransportElement()
    const { mutateAsync: createActivity } = useCreateActivityElement()
    const { mutateAsync: createAccomm } = useCreateAccommodationElement()

    const createElement = async ({
        formValues,
        sectionId,
        optionId,
        order,
        onClose
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
                    .then(() => {
                        // todos
                    })
                    .catch((e) => {
                        console.error(e)
                        toast.error('Couldn\'t create an element. Try again later.')
                    })
                    .finally(() => {
                        onClose()
                    })
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
                    .then(() => {
                        // todos
                    })
                    .catch((e) => {
                        console.error(e)
                        toast.error('Couldn\'t create an element. Try again later.')
                    })
                    .finally(() => {
                        onClose()
                    })
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
                    .then(() => {
                        // todos
                    })
                    .catch((e) => {
                        console.error(e)
                        toast.error('Couldn\'t create an element. Try again later.')
                    })
                    .finally(() => {
                        onClose()
                    })
                break
            }
        }
    }

    return { createElement }
}