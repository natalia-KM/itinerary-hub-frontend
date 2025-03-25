import { CustomDrawer } from 'components/CustomDrawer'
import { CreateTripForm } from './CreateTripFormV2'

interface CreateTripDrawerProps {
    isOpen: boolean
    setClosed: () => void
}

export const CreateTripDrawer = ({
    isOpen,
    setClosed
}: CreateTripDrawerProps) => {
    return (
        <CustomDrawer
            isOpen={isOpen}
            setClosed={setClosed}
            title='Add New Trip'
            desc='Provide trip details to create a new itinerary'
            testId='create-trip-drawer'
        >
            <CreateTripForm onClose={setClosed}/>
        </CustomDrawer>
    )
}