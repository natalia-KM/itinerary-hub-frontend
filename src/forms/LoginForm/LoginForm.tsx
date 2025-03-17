import { SignInWithGoogleButton } from 'components/SignInWithGoogleButton/SignInWithGoogleButton'
import { LineWithText } from 'components/LineWithText/LineWithText'
import { CreateGuestUserForm } from 'forms/CreateGuestUserForm/CreateGuestUserForm'
import classes from './LoginForm.module.scss'

export const LoginForm = () => {
    return (
        <div className={classes.LoginForm}>
            <SignInWithGoogleButton/>

            <LineWithText/>

            <CreateGuestUserForm/>
        </div>
    )
}