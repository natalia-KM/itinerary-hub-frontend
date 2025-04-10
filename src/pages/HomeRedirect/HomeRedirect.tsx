import { LoadingBackdrop } from 'modules/LoadingBackdrop'

export const HomeRedirect = () => {
    return (
        <LoadingBackdrop isOpen={true} testId='home-redirect-loading'/>
    )
}