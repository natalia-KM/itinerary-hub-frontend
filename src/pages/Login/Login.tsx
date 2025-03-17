import classes from './Login.module.scss'
import { LoginForm } from 'forms/LoginForm/LoginForm'
import { IntroductionText } from 'forms/LoginForm/IntroductionText/IntroductionText'

export const Login = ({ isLogout = false }: { isLogout?: boolean }) => {

    //TODO: do something about logging out

    return (
        <div className={classes.LoginPage}>
            <div className={classes.LoginPage__ImageContainer} />
            <div className={classes.LoginPage__LoginSection}>
                <div className={classes.LoginPage__IntroductionWrapper}>
                    <IntroductionText/>
                </div>
                <div className={classes.LoginPage__LoginFormWrapper}>
                    <LoginForm/>
                </div>
            </div>
        </div>
    )
}