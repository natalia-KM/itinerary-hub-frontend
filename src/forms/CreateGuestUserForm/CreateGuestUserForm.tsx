import { useForm } from 'react-hook-form'
import { CreateGuestUserFormFields } from './types'
import { useSignUpAsGuest } from 'hooks/useSignUpAsGuest/useSignUpAsGuest'
import { Button, TextField, Typography } from '@mui/material'
import { schema } from './createUserFormSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import classes from './CreateGuestUserForm.module.scss'
import { InputErrorMessage } from 'components/InputErrorMessage/InputErrorMessage'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import { useUserDetailsContext } from 'provider/UserDetailsProvider/useUserDetailsContext'

export const CreateGuestUserForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<CreateGuestUserFormFields>({
        resolver: yupResolver(schema)
    })
    const { mutateAsync: signUpAsGuest, isPending } = useSignUpAsGuest()
    const { invalidateUserDetails } = useUserDetailsContext()
    const navigate = useNavigate()
    const testIdKey = 'login-page'

    const createGuestUser = handleSubmit(
        async ({ firstName, lastName }) => {
            await signUpAsGuest({ firstName, lastName })
                .then(async () => {
                    // Refresh the (previously failed) user-details query before
                    // navigating, so the auth redirect sees the new session.
                    await invalidateUserDetails()
                    navigate('/dashboard')
                })
                .catch(() => {
                    toast('Something went wrong! Unable to create a guest account.', {
                        toastId: 'create-guest-error-toast'
                    })
                })
        })

    return (
        <form onSubmit={createGuestUser} className={classes.CreateGuestUserForm}>
            <div className={classes.CreateGuestUserForm__FormField}>
                <TextField
                    className={classes.CreateGuestUserForm__FormField}
                    id={`${testIdKey}-firstname`}
                    data-testid={`${testIdKey}-firstname`}
                    label="First Name"
                    defaultValue=""
                    variant="outlined"
                    size="small"
                    {...register('firstName')}
                />
                {errors.firstName &&
                    <InputErrorMessage
                        dataTestId={`${testIdKey}-firstname-error`}
                        error={errors.firstName.message}
                    />
                }
            </div>
            <div className={classes.CreateGuestUserForm__FormField}>
                <TextField
                    className={classes.CreateGuestUserForm__FormField}
                    id={`${testIdKey}-lastname`}
                    data-testid={`${testIdKey}-lastname`}
                    label="Last Name"
                    defaultValue=""
                    variant="outlined"
                    size="small"
                    {...register('lastName')}
                />
                {errors.lastName &&
                    <InputErrorMessage
                        dataTestId={`${testIdKey}-lastname-error`}
                        error={errors.lastName.message}
                    />
                }
            </div>

            <Button
                className={classes.CreateGuestUserForm__SubmitButton}
                variant="contained"
                type='submit'
                loading={isPending}
                disabled={Boolean(errors.firstName || errors.lastName)}
                data-testid={`${testIdKey}-submit-button`}
            >
                <Typography textTransform='none'>
                    Continue as a Guest
                </Typography>
            </Button>
        </form>
    )
}