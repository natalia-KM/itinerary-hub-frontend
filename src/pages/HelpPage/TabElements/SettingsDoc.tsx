import { Box } from '@mui/material'
import { Content, DocImage, SectionTitle, Subtitle } from './DocumentElements'

export const SettingsDoc = () => {
    return (
        <Box>
            <SectionTitle>Settings</SectionTitle>

            <Subtitle>Accessing Account Settings</Subtitle>
            <DocImage path={'/images/help/account-menu.png'} alt={'Account Menu'} />
            <Content>
                1. On any page, click the <b>User icon</b> located in the top right corner of the screen.<br />
                2. An account menu will appear with several options.
            </Content>

            <Subtitle>Editing Account Information</Subtitle>
            <DocImage path={'/images/help/account-modal.png'} alt={'Account Modal'} />
            <Content>
                1. Click your name in the account menu to open the Account modal.<br />
                2. To update your first or last name, click on the name, type the new one, then press <b>Enter</b> or click outside the field.<br />
                3. To change the default currency, click the currency field and choose from the dropdown options.<br />
                <i>Note: Currency changes apply <b>account-wide</b>. All trips will display the selected currency. Currently, it’s not possible to use different currencies for different elements.</i>
            </Content>

            <Subtitle>Deleting Your Account</Subtitle>
            <Content>
                - In the account menu, select <b>Delete Account</b>.<br />
                - This will <b>permanently delete all your data</b>, including trips, passengers, and settings.
            </Content>

            <Subtitle>Login & Logout</Subtitle>
            <Content>
                - If you're signed in with Google, a <b>Log Out</b> option will be visible.<br />
                - If you're using a <b>Guest account</b>, the <b>Log Out</b> button will not appear, as guest accounts cannot log back in.<br />
                - Instead, you'll see a <b>Connect with Google</b> option, which will link your account to Google and allow you to log in again in the future.<br />
            </Content>
        </Box>
    )
}
