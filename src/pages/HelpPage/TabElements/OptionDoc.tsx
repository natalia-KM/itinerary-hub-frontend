import { Box } from '@mui/material'
import { Content, DocImage, SectionTitle, Subtitle } from './DocumentElements'

export const OptionsDoc = () => {
    return (
        <Box>
            <SectionTitle>Options</SectionTitle>

            <Subtitle>Managing Options</Subtitle>
            <DocImage path={'/images/help/section-menu.png'} alt={'Section Menu'} size={'small'} />
            <Content>
                1. Go to the trip details page and locate the section containing the options you want to manage.<br />
                2. Click the three-dot menu (⋮) in the top-right corner of the section.<br />
                3. Select "Manage Options" from the dropdown menu.<br />
            </Content>

            <DocImage path={'/images/help/manage-options-modal.png'} alt={'Manage Options Modal'} />
            <Content>
                Inside the "Manage Options" modal, you can:<br />
                – <b>Add</b> a new option by clicking the "ADD NEW" button.<br />
                – <b>Edit</b> an option's name by clicking the pencil icon.<br />
                – <b>Delete</b> an option using the trash icon.<br />
                – <b>Reorder</b> options by dragging and dropping them into a new order using the handle on the left.
            </Content>
        </Box>
    )
}
