import { CustomModal } from 'components/CustomModal'
import { useUserDetailsContext } from 'provider/UserDetailsProvider/useUserDetailsContext'
import { ReactNode } from 'react'
import { Paper, Table, TableBody, TableCell, TableCellProps, TableContainer, TableRow } from '@mui/material'
import { EditableTableCell } from './EditableTableCell'
import { prettifyDate } from 'utils'
import classes from './AccountInfoModal.module.scss'
import { SelectCurrencyCell } from './SelectCurrencyCell'
import { useUpdateUserDetails } from 'hooks/useUpdateUserDetails'
import { toast } from 'react-toastify'

interface AccountInfoModalProps {
    isOpen: boolean
    closeModal: () => void
}

const NarrowCell = ({ children, id, props }: { children: ReactNode, id: string, props?: TableCellProps }) => {
    return (
        <TableCell id={id} sx={{ width: '30%' }} {...props}>{children}</TableCell>
    )
}

enum UserDetail {
    FIRST_NAME,
    LAST_NAME
}

export const AccountInfoModal = ({
    isOpen,
    closeModal
}: AccountInfoModalProps) => {
    const { userDetails, invalidateUserDetails } = useUserDetailsContext()
    const { mutateAsync: updateUserDetails } = useUpdateUserDetails()

    const onUserNameChange = async (userDetail: UserDetail, newName?: string) => {
        if (!newName || newName.trim() === '' || newName === userDetails?.firstName) {
            return
        }
        const firstName = userDetail === UserDetail.FIRST_NAME ? newName : undefined
        const lastName = userDetail === UserDetail.LAST_NAME ? newName : undefined

        await updateUserDetails({
            firstName,
            lastName
        }).then(() => {
            invalidateUserDetails()
        }).catch((e) => {
            console.error(e)
            toast.error('Couldn\'t update the name. Try again later', { toastId: 'update-user-error-toast' })
            throw e
        })
    }

    const date = userDetails?.createdAt ? prettifyDate(new Date(userDetails?.createdAt)) : 'Couldn\'t load the date'

    return (
        <CustomModal
            isOpen={isOpen}
            modalTitle={'Account Information'}
            actionButtonsProps={{
                confirmTitle: 'OK',
                onConfirm: closeModal,
                showCancel: false
            }}
            testId={'account-info-modal'}>

            <TableContainer component={Paper}>
                <Table size="small">
                    <TableBody>
                        <TableRow>
                            <NarrowCell id={'first-name-label-cell'}>First Name</NarrowCell>
                            <EditableTableCell
                                defaultValue={userDetails?.firstName}
                                onSave={(val) => onUserNameChange(UserDetail.FIRST_NAME, val)}
                                testId={'first-name-editable'}
                            />
                        </TableRow>
                        <TableRow>
                            <NarrowCell id={'last-name-label-cell'}>Last Name</NarrowCell>
                            <EditableTableCell
                                defaultValue={userDetails?.lastName}
                                onSave={(val) => onUserNameChange(UserDetail.LAST_NAME, val)}
                                testId={'last-name-editable'}
                            />
                        </TableRow>
                        <TableRow>
                            <NarrowCell id={'created-at-label-cell'}>Created At</NarrowCell>
                            <TableCell className={classes.RegularCell} data-testid={'created-at-cell-value'}>{date}</TableCell>
                        </TableRow>
                        <TableRow>
                            <NarrowCell id={'currency-label-cell'}>Currency</NarrowCell>
                            <SelectCurrencyCell />
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </CustomModal>
    )
}