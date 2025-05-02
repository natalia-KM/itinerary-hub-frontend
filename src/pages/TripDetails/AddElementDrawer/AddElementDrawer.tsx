import { ElementDrawer } from '../ElementDrawer'
import { SectionDetails } from 'hooks/sections'
import { FormSchema } from '../ElementDrawer'
import { toast } from 'react-toastify'
import { useCreateElement } from 'hooks/elements'
import { useQueryClient } from '@tanstack/react-query'

interface AddElementDrawerProps {
    isOpen: boolean
    handleClose: () => void
    sectionDetails: SectionDetails
}

export const AddElementDrawer = ({
    isOpen,
    handleClose,
    sectionDetails
}: AddElementDrawerProps ) => {
    const { createElement } = useCreateElement()
    const queryClient = useQueryClient()

    const addElement = async (
        formValues: FormSchema, optionId: string, order?: number
    ) => {
        if(!order) {
            toast.error('Couldn\'t create an element. Try again later.', { toastId: 'create-element-error-toast' })
            return null
        }

        await createElement({
            formValues,
            sectionId: sectionDetails.sectionId,
            optionId,
            order
        }).then(async () => {
            await queryClient.invalidateQueries({ queryKey: ['elementInfo', optionId] })
        }).catch((e) => {
            console.error(e)
            toast.error('Couldn\'t create an element. Try again later.', { toastId: 'create-element-error-toast' })
        }).finally(() => {
            handleClose()
        })
    }

    return (
        <ElementDrawer
            isOpen={isOpen}
            closeDrawer={handleClose}
            title={'Add New Element'}
            desc={'Create element in'}
            submitTitle={'Create'}
            disableElementType={false}
            onSubmit={addElement}
            sectionDetails={sectionDetails}
        />
    )
}