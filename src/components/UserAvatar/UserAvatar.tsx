import { Avatar, Tooltip, Typography } from '@mui/material'

interface UserAvatarProps {
    firstName?: string
    lastName?: string
    showTooltip? :boolean
    enablePaddingRight?: boolean
    testId?: string
    // image?:string // TODO: to be implemented
}

export const UserAvatar = ({
    firstName,
    lastName,
    showTooltip = false,
    enablePaddingRight = false,
    testId
}: UserAvatarProps) => {
    const initials = () => {
        const firstLetter = firstName && firstName.substring(0, 1)
        const secondLetter = lastName && lastName.substring(0, 1)

        if(!firstLetter && !secondLetter) {
            return 'UN'
        } else if(!firstLetter) {
            return secondLetter
        } else if(!secondLetter) {
            return firstLetter
        }

        return `${firstLetter}${secondLetter}`
    }

    const name = `${firstName} ${lastName}`

    return (
        <Tooltip title={name} hidden={showTooltip}>
            <Avatar
                sx={{
                    width: 24,
                    height: 24,
                    border: '1px solid white',
                    marginRight: enablePaddingRight ? '8px' : 'none'
                }}
                data-testid={testId ?? 'user-avatar'}
            >
                <Typography
                    fontSize='10px'
                    fontWeight='600'
                    letterSpacing={'0.1em'}
                    paddingLeft={'1px'}
                    paddingTop={'1px'}
                >
                    {initials()}
                </Typography>
            </Avatar>
        </Tooltip>
    )
}