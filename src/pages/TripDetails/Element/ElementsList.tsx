import { Box, Skeleton } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { AccommodationType, ElementType, getElements, useBulkUpdateOrder } from 'hooks/elements'
import { ElementInfo, isAccommElement } from 'utils'
import { useEffect, useMemo, useState } from 'react'
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { SortableElementWrapper } from './SortableElementWrapper'
import { toast } from 'react-toastify'

interface ElementsListProps {
    optionId: string
}

export interface ElementDetailsDO {
    baseElementId: string
    elementType: ElementType
    order: number
    accommodationType?: AccommodationType
    elementId: string
}

export const ElementsList = ({
    optionId
}: ElementsListProps) => {
    const { mutateAsync: updateElementsOrder } = useBulkUpdateOrder()
    const { data: elementInfo, isPending } = useQuery<Record<string, ElementInfo>>({
        queryKey: ['elementInfo', optionId],
        queryFn: () => getElements(optionId)
            .then((response) =>
                response.reduce((acc, el) => {
                    acc[el.elementID] = {
                        baseElementId: el.baseElementID,
                        elementType: el.elementType,
                        order: el.order,
                        accommodationType: isAccommElement(el) ? el.accommodationType : undefined
                    }
                    return acc
                }, {} as Record<string, ElementInfo>)
            )
    })

    const orderedElements = useMemo(() => {
        if (!elementInfo) return undefined

        return Object.entries(elementInfo)
            .map(([id, info]) => ({ elementId: id, ...info }))
            .sort((a, b) => a.order - b.order)
    }, [elementInfo])

    const [elements, setElements] = useState(orderedElements)

    useEffect(() => {
        if (orderedElements) {
            setElements(prev => {
                const isSame = JSON.stringify(prev) === JSON.stringify(orderedElements)
                return isSame ? prev : orderedElements
            })
        }
    }, [orderedElements])

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5
            }
        })
    )

    // Only skeleton on the initial load; background refetches keep showing the
    // current list instead of unmounting it mid-interaction.
    if(isPending) {
        return (
            <Skeleton/>
        )
    }

    if (!elementInfo || !elements) {
        console.error('Couldn\'t load the element')
        return null
    }

    const reorderElements = (updated: ElementDetailsDO[], previous: ElementDetailsDO[]) => {
        updateElementsOrder(
            updated.map(({ elementId, elementType, order }) => ({
                elementId,
                elementType,
                order
            }))).catch((e) => {
                console.error(e)
                setElements(previous)
                toast.error('Couldn\'t reorder elements. Try again later.', { toastId: 'reorder-element-error-toast' })
            })
    }

    return(
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={({ active, over }) => {
                if (!over || active.id === over.id) return

                const oldIndex = elements.findIndex(el => el.elementId === active.id)
                const newIndex = elements.findIndex(el => el.elementId === over.id)

                if (oldIndex === -1 || newIndex === -1) return

                const reordered = arrayMove(elements, oldIndex, newIndex).map((el, index) => ({
                    ...el,
                    order: index + 1,
                }))
                const previous = elements
                setElements(reordered)
                reorderElements(reordered, previous)
            }}
        >
        <Box data-testid={`elements-list-${optionId}`} key={`elements-list-${optionId}`}>
            <SortableContext items={elements.map(el => el.elementId)} strategy={verticalListSortingStrategy}>
                {elements.map((el) => {
                    const accommPairedElementId = el.elementType === ElementType.ACCOMMODATION
                        ? elements.find(
                            (other) =>
                                other.elementId !== el.elementId &&
                                other.elementType === ElementType.ACCOMMODATION &&
                                other.baseElementId === el.baseElementId
                        )?.elementId
                        : undefined

                    return (
                        <SortableElementWrapper key={el.elementId} details={el} optionId={optionId} accommPairedElementId={accommPairedElementId} />
                    )
                })}
            </SortableContext>
        </Box>
        </DndContext>
    )
}