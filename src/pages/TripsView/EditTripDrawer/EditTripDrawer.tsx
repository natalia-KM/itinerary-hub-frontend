import { CustomDrawer } from 'components/CustomDrawer'
import { TripDetails } from 'utils/types'
import { EditTripForm } from './EditTripForm'
import { toast } from 'react-toastify'

interface EditTripDrawerProps {
    existingTripDetails: TripDetails
    isOpen: boolean
    setClosed: () => void
}

export const EditTripDrawer = ({
    existingTripDetails,
    isOpen,
    setClosed
}: EditTripDrawerProps) => {
    if (!existingTripDetails) {
        toast('There was a problem editing your trip')
        return
    }

    return (
        <CustomDrawer
            isOpen={isOpen}
            setClosed={setClosed}
            testId='edit-trip-drawer'
            title={`Edit ${existingTripDetails.tripName}`}
            desc='Modify an existing trip'
        >
            <EditTripForm
                tripDetails={existingTripDetails}
                onClose={setClosed}
            />
        </CustomDrawer>
    )
}