import { Divider, IconButton, InputBase, Paper } from '@mui/material'
import { CustomModal } from 'components/CustomModal'
import { ModalProps } from 'utils'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import classes from './CopyLinkModal.module.scss'
import { toast } from 'react-toastify'

interface CopyLinkModalProps extends ModalProps {
    link: string
}

export const CopyLinkModal = ({
    modalOpen,
    setModalOpen,
    link
}: CopyLinkModalProps) => {

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(link)
            toast.success('Link copied to clipboard', { toastId: 'copy-link-toast' })
        } catch (err) {
            console.error('Failed to copy: ', err)
            toast.error('Couldn\'t copy link. Try again later.', { toastId: 'copy-link-toast' })
        }
    }

    return (
        <CustomModal
            isOpen={modalOpen}
            modalTitle={'Copy Link'}
            actionButtonsProps={{
                onConfirm: () => setModalOpen(false),
                showCancel: false,
                confirmTitle: 'OK'
            }}
            testId={'copy-link-modal'}
        >
            <Paper
                className={classes.CopyLinkModal}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    value={link}
                    readOnly={true}
                    inputProps={{
                        'aria-label': 'Element URL' ,
                        'data-testid': 'copy-link-input'
                    }}
                    fullWidth
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton
                    color="primary"
                    sx={{ p: '10px' }}
                    aria-label="copy link"
                    data-testid="copy-link-icon"
                    onClick={copyLink}
                >
                    <ContentCopyIcon />
                </IconButton>
            </Paper>
        </CustomModal>
    )
}