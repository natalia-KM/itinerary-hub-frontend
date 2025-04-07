import { useQuery } from '@tanstack/react-query'
import webClient from 'config/clientConfig'
import { normalizeTripData, useTripId } from 'utils'
import { OptionDetails } from 'hooks/options'
import { Tab, TabProps } from '@mui/material'

interface OptionTabProps {
    optionId: string
    index: number
    props?: TabProps
}
export const OptionTab = ({
    optionId,
    index,
    ...props
}: OptionTabProps) => {
    const { tripId } = useTripId()

    const { data: optionDetails } = useQuery<OptionDetails>({
        queryKey: ['optionDetails', optionId],
        enabled: false,
        queryFn: async () => {
            const { data } = await webClient.get(`/v1/trips/${tripId}`)
            return normalizeTripData(data).options[optionId].optionDetails
        }
    })

    if(!optionDetails) {
        return null
    }

    return (
        <Tab
            value={index.toString()}
            label={optionDetails?.optionName ?? 'Couldn\'t load'}
            sx={{ textTransform: 'none' }}
            {...props}
        />
    )
}

OptionTab.muiName = 'Tab'