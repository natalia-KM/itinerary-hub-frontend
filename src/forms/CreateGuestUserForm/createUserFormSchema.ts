import * as yup from 'yup'

export const schema = yup.object({
    firstName: yup
        .string()
        .required()
        .min(3)
        .max(50)
        .label('First name')
        .matches(/^[A-Za-z]+([ '][A-Za-z]+)*$/, 'Only letters, spaces, and apostrophes are allowed.'),
    lastName: yup
        .string()
        .required()
        .min(3)
        .max(100)
        .label('Last name')
        .matches(/^[A-Za-z]+([ '][A-Za-z]+)*$/, 'Only letters, spaces, and apostrophes are allowed.')
})
