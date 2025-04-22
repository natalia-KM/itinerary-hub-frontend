import { Box, Skeleton } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { ElementType, getElements } from 'hooks/elements'
import { ElementInfo, isAccommElement } from 'utils'
import { TransportElement } from './ElementItems/TransportElement'
import { GetElementArgs } from './types'
import { ActivityElement } from './ElementItems/ActivityElement'
import { AccommElement } from './ElementItems/AccommElement'

interface ElementsListProps {
    sectionId: string
    optionId: string
}

export const ElementsList = ({
    sectionId,
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
                const args: GetElementArgs = {
                    sectionId,
                    optionId,
                    elementId: id,
                    baseElementId: details.baseElementId
                }

                switch (details.elementType) {
                    case ElementType.TRANSPORT: return (<TransportElement key={id} {...args} />)
                    case ElementType.ACTIVITY: return (<ActivityElement key={id} {...args} />)
                    case ElementType.ACCOMMODATION: return (<AccommElement key={id} type={details.accommodationType} {...args} />)
                }
            })}
        </Box>
    )
}