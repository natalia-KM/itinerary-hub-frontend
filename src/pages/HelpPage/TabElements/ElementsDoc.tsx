import { Box } from '@mui/material'
import { Content, DocImage, SectionTitle, Subtitle } from './DocumentElements'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'

export const ElementsDoc = () => {
    return (
        <Box>
            <SectionTitle>Elements</SectionTitle>
            <DocImage path={'/images/help/elements-view.png'} alt={'Elements View'} size={'large'}/>

            <Subtitle>Adding an Element</Subtitle>
            <DocImage path={'/images/help/section-menu.png'} alt={'Section Menu'} size={'small'} />
            <Content>
                1. Open the section menu by clicking the three-dot icon in the top-right corner of a section.<br />
                2. Click "Add Element" to open the Add Element Drawer.<br />
                3. Fill in the required information such as <b>type</b>, <b>category</b> (you can choose from presets or enter your own), and other relevant details.<br />
                4. Click "Next" to proceed to the second step.<br />
                5. On the next page, select <b>passengers / guests</b> who should be assigned to this element (instructions on adding passengers are in the next tab).<br />
                6. Click "Create" to add the element.
            </Content>

            <Subtitle>Editing an Element</Subtitle>
            <DocImage path={'/images/help/elements-menu.png'} alt={'Element Menu'} size={'small'} />
            <Content>
                1. Click the three-dot icon on the right side of the element you want to edit.<br />
                2. Select "Edit Element" to open the Edit Element Drawer.<br />
                3. The drawer works the same as when adding a new element, but all fields will be prefilled.<br />
                4. Make any necessary changes and click "Next", then "Update".
            </Content>

            <Subtitle>Deleting an Element</Subtitle>
            <Content>
                1. Open the element menu by clicking the three-dot icon on the element card.<br />
                2. Select "Delete Element".<br />
                3. A confirmation modal will appear — click "Confirm" to delete.
            </Content>

            <Subtitle>Reordering Elements</Subtitle>
            <Content>
                1. Locate the drag handle <DragIndicatorIcon fontSize={'small'}/> on the left side of the element card.<br />
                2. Click and hold the handle to drag the element.<br />
                3. Drop it into the desired position within the same option.<br />
                <i>Note: Moving elements across options or sections is not currently supported.</i>
            </Content>
        </Box>
    )
}
