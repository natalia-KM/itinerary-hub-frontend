import { Box } from '@mui/material'
import { Content, DocImage, SectionTitle, Subtitle } from './DocumentElements'

export const TripsDoc = () => {

    return (
        <Box>
            <SectionTitle>Trips</SectionTitle>
            <Subtitle>Adding a Trip</Subtitle>
            <DocImage path={'/images/help/add-trip.png'} alt={'Adding a Trip'} />
            <Content>
                1. Navigate to the Trips page.<br/>
                2. Click the "Add new trip" button.<br/>
                3. Enter trip details.<br/>
                4. Click "Confirm".
            </Content>

            <Subtitle>Editing & Deleting a Trip</Subtitle>
            <DocImage path={'/images/help/trip-menu.png'} alt={'Adding a Trip'} size={'small'} />
            <Content>
                1. Open Trip menu by clicking on the vertical three dots.<br/>
                2. Select the "Edit Trip" or "Delete Trip" option.<br/>
            </Content>
        </Box>
    )
}