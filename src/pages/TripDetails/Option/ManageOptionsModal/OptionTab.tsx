import { useQuery } from '@tanstack/react-query'
import { getOption, OptionDetails } from 'hooks/options'
import { Tab, TabProps } from '@mui/material'

interface OptionTabProps {
    sectionId: string
    optionId: string
    index: number
    props?: TabProps
}
export const OptionTab = ({
    sectionId,
    optionId,
    index,
    ...props
}: OptionTabProps) => {

    const { data: optionDetails } = useQuery<OptionDetails>({
        queryKey: ['optionDetails', optionId],
        enabled: !!sectionId,
        queryFn: () => getOption({ sectionId, optionId })
    })

    if(!optionDetails) {
        console.error('Couldn\'t find the option details')
        return null
    }

    return (
        <Tab
            data-testid={`option-tab-${optionDetails.optionId}`}
            value={index.toString()}
            label={optionDetails?.optionName ?? 'Couldn\'t load'}
            sx={{ textTransform: 'none' }}
            {...props}
        />
    )
}

OptionTab.muiName = 'Tab'