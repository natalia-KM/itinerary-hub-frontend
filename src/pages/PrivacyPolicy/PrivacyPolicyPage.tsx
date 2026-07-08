import { Box, List, ListItem, Typography } from '@mui/material'
import classes from './PrivacyPolicyPage.module.scss'
import { TopBar } from 'modules/TopBar'
import React from 'react'

export const PrivacyPolicyPage = () => {
    return (
        <div className={classes.Page}>
            <TopBar/>
        <Box sx={{ padding: 8 }}>
            <Typography variant="h4" gutterBottom>
                Privacy Policy
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                Effective Date: 09/05/2025
            </Typography>

            {/* 1. Information We Collect */}
            <Box mb={4} mt={4}>
                <Typography variant="h6">1. Information We Collect</Typography>
                <Typography>
                    We collect only the data necessary to provide our services:
                </Typography>
                <List sx={{ listStyleType: 'disc', pl: 4 }} dense>
                    <ListItem sx={{ display: 'list-item' }}>
                        <b>First and Last Name</b> – provided during registration.
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <b>Google Sign-In Details</b> – if you choose to sign in with Google, we may receive your Google user ID, name, email address, profile image, and authentication tokens.
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <b>Session Cookies</b> – used solely to manage your login session. We do not use tracking cookies or collect data for advertising purposes.
                    </ListItem>
                </List>
            </Box>

            {/* 2. How Your Data Is Used */}
            <Box mb={4}>
                <Typography variant="h6">2. How Your Data Is Used</Typography>
                <Typography>
                    We use your data to:
                </Typography>
                <List sx={{ listStyleType: 'disc', pl: 4 }} dense>
                    <ListItem sx={{ display: 'list-item' }}>Authenticate your identity.</ListItem>
                    <ListItem sx={{ display: 'list-item' }}>Manage your account.</ListItem>
                    <ListItem sx={{ display: 'list-item' }}>Provide personalized services (e.g., saving itineraries).</ListItem>
                    <ListItem sx={{ display: 'list-item' }}>Maintain security and session integrity.</ListItem>
                </List>
            </Box>

            {/* 3. Your Rights and Choices */}
            <Box mb={4}>
                <Typography variant="h6">3. Your Rights and Choices</Typography>
                <Typography>
                    You have full control over your personal data:
                </Typography>
                <List sx={{ listStyleType: 'disc', pl: 4 }} dense>
                    <ListItem sx={{ display: 'list-item' }}>
                        <b>Access & Update</b> – You can view and update your personal details via the account menu in the top bar.
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <b>Account Deletion</b> – You may delete your account at any time, which permanently removes all your stored information from our systems.
                    </ListItem>
                    <ListItem sx={{ display: 'list-item' }}>
                        <b>Session Cookies</b> – These are required for the site to function and do not require explicit consent.
                    </ListItem>
                </List>
            </Box>

            {/* 4. Data Storage & Security */}
            <Box mb={4}>
                <Typography variant="h6">4. Data Storage & Security</Typography>
                <Typography>
                    We store data securely and take reasonable measures to protect it from unauthorized access. We do not sell, rent, or share your personal data with third parties.
                </Typography>
            </Box>

            {/* 5. Children’s Privacy */}
            <Box mb={4}>
                <Typography variant="h6">5. Children’s Privacy</Typography>
                <Typography>
                    ItineraryHub is not intended for children under the age of 13. We do not knowingly collect data from children.
                </Typography>
            </Box>

            {/* 6. Changes to This Policy */}
            <Box mb={4}>
                <Typography variant="h6">6. Changes to This Policy</Typography>
                <Typography>
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
                </Typography>
            </Box>

            <Box mb={4}>
                <Typography variant="h6">7. Managing Your Data</Typography>
                <Typography>
                    All data access, update, and deletion actions are self-service via the account menu (see Section 3).
                </Typography>
            </Box>
        </Box>
        </div>
    )
}