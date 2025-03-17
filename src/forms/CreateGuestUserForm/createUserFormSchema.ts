import * as yup from 'yup'

export const schema = yup.object({
    firstName: yup.string().required().min(3).max(50).label('First name'),
    lastName: yup.string().required().min(3).max(100).label('Last name')
})
