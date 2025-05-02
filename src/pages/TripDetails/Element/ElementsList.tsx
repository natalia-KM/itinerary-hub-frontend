import { Box, Skeleton } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { ElementType, getElements } from 'hooks/elements'
import { ElementInfo, isAccommElement } from 'utils'
import { TransportElement } from './ElementItems/TransportElement'
import { ActivityElement } from './ElementItems/ActivityElement'
import { AccommElement } from './ElementItems/AccommElement'
import { ElementContextProvider } from 'provider/ElementProvider/ElementContextProvider'

interface ElementsListProps {
    optionId: string
}

export const ElementsList = ({
    optionId
}: ElementsListProps) => {
    const { data: elementInfo, isPending, isRefetching } = useQuery<Record<string, ElementInfo>>({
        queryKey: ['elementInfo', optionId],
        queryFn: () => getElements(optionId)
            .then((response) =>
                response.reduce((acc, el) => {
                    acc[el.elementID] = {
                        baseElementId: el.baseElementID,
                        elementType: el.elementType,
                        accommodationType: isAccommElement(el) ? el.accommodationType : undefined
                    }
                    return acc
                }, {} as Record<string, ElementInfo>)
            )
    })

    if(isPending || isRefetching) {
        return (
            <Skeleton/>
        )
    }

    if (!elementInfo) {
        console.error('Couldn\'t load the element')
        return null
    }

    return(
        <Box data-testid={`elements-list-${optionId}`} key={`elements-list-${optionId}`}>
            {Object.entries(elementInfo).map(([id, details]) => {
                const accommPairedElement =
                    details.elementType === ElementType.ACCOMMODATION
                        ? Object.entries(elementInfo).find(
                            ([otherId, otherDetails]) =>
                                otherId !== id &&
                                otherDetails.elementType === ElementType.ACCOMMODATION &&
                                otherDetails.baseElementId === details.baseElementId
                        )?.[0]
                        : undefined

                const ElementWrapper = () => {
                    switch (details.elementType) {
                        case ElementType.TRANSPORT:
                            return <TransportElement key={id} />
                        case ElementType.ACTIVITY:
                            return <ActivityElement key={id} />
                        case ElementType.ACCOMMODATION:
                            return <AccommElement key={id} type={details.accommodationType} />
                        default:
                            return null
                    }
                }
                return (
                    <ElementContextProvider
                        key={id}
                        elementId={id}
                        baseElementId={details.baseElementId}
                        optionId={optionId}
                        otherAccommElementId={accommPairedElement}
                    >
                        <ElementWrapper />
                    </ElementContextProvider>
                )
            })}
        </Box>
    )
}