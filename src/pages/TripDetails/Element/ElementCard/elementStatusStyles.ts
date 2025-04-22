import PendingIcon from '@mui/icons-material/AccessTime'
import BookedIcon from '@mui/icons-material/CheckCircle'
import CancelledIcon from '@mui/icons-material/Cancel'
import ExpiredIcon from '@mui/icons-material/HourglassDisabled'
import { ElementStatus } from 'hooks/elements'

export const statusStylesMap: Record<ElementStatus, { color: string; icon: React.ElementType }> = {
    [ElementStatus.PENDING]: {
        color: '#ffebad',
        icon: PendingIcon,
    },
    [ElementStatus.BOOKED]: {
        color: '#8CD47E',
        icon: BookedIcon,
    },
    [ElementStatus.CANCELLED]: {
        color: '#F57C5D',
        icon: CancelledIcon,
    },
    [ElementStatus.EXPIRED]: {
        color: '#E8E7CB',
        icon: ExpiredIcon,
    },
}
