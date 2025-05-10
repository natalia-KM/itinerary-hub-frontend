import { Box } from '@mui/material'
import { Content, DocImage, SectionTitle, Subtitle } from './DocumentElements'

export const SectionDoc = () => {
    return (
        <Box>
            <SectionTitle>Sections</SectionTitle>

            <Subtitle>Adding a Section (Quick Access)</Subtitle>
            <DocImage path={'/images/help/fab.png'} alt={'Floating action button'} size={'small'}/>
            <Content>
                1. Navigate to a specific trip’s details page.<br />
                2. Hover over the floating action button (FAB) in the bottom-right corner.<br />
                3. Click on "Add Section".<br />
                4. Enter the section name in the modal.<br />
                5. Click "Confirm".
            </Content>

            <Subtitle>Managing Sections</Subtitle>
            <DocImage path={'/images/help/manage-sections-modal.png'} alt={'Manage Sections Modal'} />
            <Content>
                1. Open the trip details page.<br />
                2. Click the three-dot menu at the top of the page.<br />
                3. Select "Manage Sections".<br />
                <br />
                From the modal, you can:<br />
                – <b>Add</b> a new section by clicking the "ADD NEW" button.<br />
                – <b>Edit</b> a section name by clicking the pencil icon next to it.<br />
                – <b>Delete</b> a section using the trash icon.<br />
                – <b>Reorder</b> sections by dragging and dropping them into a new order using the handle on the left.
            </Content>
        </Box>
    )
}