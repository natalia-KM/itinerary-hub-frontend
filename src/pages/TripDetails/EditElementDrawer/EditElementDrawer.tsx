import { ElementDrawer, FormSchema } from '../ElementDrawer'
import React, { useEffect, useState } from 'react'
import { useTripId } from 'utils'
import { useElementContext, useSectionContext } from 'provider'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getSection, SectionDetails } from 'hooks/sections'
import { ElementDO } from 'hooks/trips'
import { getElement, useUpdateElement } from 'hooks/elements'
import { mapElementDetailsToFormSchema } from '../Element/utils'
import { CustomDrawer } from 'components/CustomDrawer'
import { CircularProgress } from '@mui/material'
import { toast } from 'react-toastify'

interface EditElementDrawerProps {
    isOpen: boolean
    handleClose: () => void
}

export const EditElementDrawer = ({
    isOpen,
    handleClose
}: EditElementDrawerProps) => {
    const { tripId } = useTripId()
    const { sectionId } = useSectionContext()
    const { elementId, baseElementId, optionId, otherAccommElementId } = useElementContext()
    const [elementSchema, setElementSchema] = useState<FormSchema | undefined>(undefined)

    const queryClient = useQueryClient()
    const { updateElement } = useUpdateElement()

    const { data: section, isPending: isSectionLoading } = useQuery<SectionDetails>({
        enabled: false,
        queryKey: ['sectionDetails', sectionId],
        queryFn: () => getSection({ tripId, sectionId })
    })

    const { data: elementDetails, isPending: isElementLoading } = useQuery<ElementDO[] | undefined>({
        enabled: true,
        queryKey: ['elementsDetails', baseElementId],
        queryFn: () => getElement({ sectionId, optionId, baseElementId })
    })

    const onUpdateElement = async (
        formValues: FormSchema, optionId: string
    ) => {
        await updateElement({
            formValues,
            sectionId: sectionId,
            optionId,
            elementId: baseElementId
        }).then(async () => {
            // element update
            await queryClient.invalidateQueries({ queryKey: ['element', elementId] })
            // accommodation element sibling
            await queryClient.invalidateQueries({ queryKey: ['element', otherAccommElementId] })
            // this
            await queryClient.invalidateQueries({ queryKey: ['elementsDetails', baseElementId] })
        }).catch((e) => {
            console.error(e)
            toast.error('Couldn\'t update an element. Try again later.', { toastId: 'update-element-error-toast' })
        }).finally(() => {
            handleClose()
        })
    }

    useEffect(() => {
        if(!elementDetails) return
        setElementSchema(mapElementDetailsToFormSchema(elementDetails))
    }, [elementDetails])

    if(isSectionLoading || isElementLoading || !elementSchema) {
        return (
            <CustomDrawer
                isOpen={true}
                setClosed={() => undefined}
                testId={'loading-edit-drawer'}>
                <CircularProgress color="inherit" />
            </CustomDrawer>
        )
    }

    if(!section) {
        console.error('Couldn\'t get the section details.')
        return null
    }

    return (
        <ElementDrawer
            isOpen={isOpen}
            closeDrawer={handleClose}
            title={'Edit Element'}
            desc={'Update element in'}
            submitTitle={'Update'}
            disableElementType={true}
            onSubmit={onUpdateElement}
            sectionDetails={section}
            existingElement={elementSchema}
        />
    )
}