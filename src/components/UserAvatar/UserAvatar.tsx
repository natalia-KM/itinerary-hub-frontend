import { Avatar, Typography } from '@mui/material'

interface UserAvatarProps {
    firstName?: string
    lastName?: string
    // image?:string // TODO: to be implemented
}

export const UserAvatar = ({
    firstName,
    lastName
}: UserAvatarProps) => {
    const initials = () => {
        const firstLetter = firstName && firstName.substring(0, 1)
        const secondLetter = lastName && lastName.substring(0, 1)

        if(!firstLetter && !secondLetter) {
            return 'UN'
        }

        return `${firstLetter}${secondLetter}`
    }
    return (
        <Avatar sx={{ width: 24, height: 24 }}>
            <Typography fontSize='12px' fontWeight='600'>
                {initials()}
            </Typography>
        </Avatar>
    )
}