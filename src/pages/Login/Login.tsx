import classes from './Login.module.scss'
import { LoginForm } from 'forms/LoginForm/LoginForm'
import { IntroductionText } from 'forms/LoginForm/IntroductionText/IntroductionText'

export const Login = () => {

    return (
        <div className={classes.LoginPage}>
            <div className={classes.LoginPage__ImageContainer}>
                <img src="/images/background-login.jpg" loading="lazy" alt="Background" />
            </div>

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