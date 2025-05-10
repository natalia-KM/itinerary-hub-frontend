import { Box } from '@mui/material'
import { Content, DocImage, SectionTitle, Subtitle } from './DocumentElements'

export const PassengersDoc = () => {
    return (
        <Box>
            <SectionTitle>Passengers / Guests</SectionTitle>

            <Subtitle>Accessing the Passengers Drawer</Subtitle>
            <DocImage path={'/images/help/passengers-drawer.png'} alt={'Passengers Drawer'} />
            <Content>
                1. Hover over the dark blue vertical bar on the left side of the screen (visible on both the Trip List and Trip Details pages).<br />
                2. The Passengers Drawer will slide open, displaying a list of all passengers in the account.<br />
                <i>Note: There is also a menu icon (≡) at the top of the blue bar to help you locate it.</i>
            </Content>

            <Subtitle>Editing Passengers</Subtitle>
            <Content>
                1. To keep the drawer open, click the pencil icon on the top-right corner of the drawer to enter edit mode.<br />
                2. In edit mode, you can:
                <ul>
                    <li>Edit a passenger by clicking the pencil icon next to their name.</li>
                    <li>Delete a passenger by clicking the trash bin icon.</li>
                    <li>Add a new passenger by clicking the "Add Passenger" button below the list.</li>
                </ul>
                3. Once you're done, click the X icon on the top-right to exit edit mode — the drawer will return to its hover-to-open behavior.
            </Content>
        </Box>
    )
}
