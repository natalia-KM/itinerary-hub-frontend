import {
    Box,
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField, ToggleButton,
    ToggleButtonGroup, Typography
} from '@mui/material'
import classes from '../ElementDrawer.module.scss'
import { DrawerSectionTitle } from 'components/DrawerSectionTitle'
import { Controller, useFormContext } from 'react-hook-form'
import { FormSchema } from '../formSchema'
import { InputErrorMessage } from 'components/InputErrorMessage'
import { getCurrencySymbol } from 'pages/TripDetails/Element/utils'
import classnames from 'classnames'
import { ElementStatus, ElementType } from 'hooks/elements'
import { PassengersTable } from './PassengersTable/PassengersTable'
import { useUserDetailsContext } from 'provider/UserDetailsProvider/useUserDetailsContext'

export const ElementFormStepTwo = () => {
    const { register, control, getValues, formState: { errors } } = useFormContext<FormSchema>()
    const { userDetails } = useUserDetailsContext()
    const elementType = getValues('elementType')

    const passengersLabel = elementType === ElementType.TRANSPORT ? 'Passenger' : 'Guest'

    const testId = 'element-form-step-two'

    return (
        <Box className={classes.ElementForm}>
            <DrawerSectionTitle>
                Additional Information
            </DrawerSectionTitle>
            <Box className={classes.ElementForm__Section}>
                <div className={classes.ElementForm__ExtraTopMargin}>
                    <FormControl className={classnames(
                        classes.ElementForm__FormField
                    )}>
                        <InputLabel htmlFor={`${testId}-price`}>Price</InputLabel>
                        <OutlinedInput
                            id={`${testId}-price`}
                            startAdornment={<InputAdornment position="start">{getCurrencySymbol(userDetails?.currency ?? 'USD')}</InputAdornment>}
                            placeholder='122.50'
                            size='small'
                            label='Price'
                            slotProps={{ input: { id: `${testId}-price` } }}
                            {...register('price')}
                        />
                    </FormControl>
                    {errors.price &&
                        <InputErrorMessage
                            dataTestId={`${testId}-price-error`}
                            error={errors.price.message}
                        />
                    }
                </div>
                <div>
                    <TextField
                        className={classes.ElementForm__FormField}
                        id={`${testId}-link`}
                        label='Link'
                        placeholder='www.booking-website.com/'
                        variant='outlined'
                        size='small'
                        slotProps={{ input: { id: `${testId}-link` } }}
                        {...register('link')}
                    />
                    {errors.link &&
                        <InputErrorMessage
                            dataTestId={`${testId}-link-error`}
                            error={errors.link.message}
                        />
                    }
                </div>
                <div>
                    <TextField
                        className={classes.ElementForm__FormField}
                        id={`${testId}-notes`}
                        label='Notes'
                        placeholder='My notes'
                        variant='outlined'
                        size='small'
                        slotProps={{ input: { id: `${testId}-notes` } }}
                        {...register('notes')}
                    />
                    {errors.notes &&
                        <InputErrorMessage
                            dataTestId={`${testId}-notes-error`}
                            error={errors.notes.message}
                        />
                    }
                </div>
            </Box>
            <DrawerSectionTitle>
                Status
            </DrawerSectionTitle>
            <Box className={classes.ElementForm__Section}>
                <Controller
                    name='status'
                    control={control}
                    render={({ field }) => {
                        return (
                            <ToggleButtonGroup
                                {...field}
                                aria-label='Choose Element Status'
                                fullWidth
                                exclusive
                            >
                                {Object.values(ElementStatus).map((status) => (
                                    <ToggleButton
                                        key={status}
                                        value={status}
                                        color="secondary"
                                        data-testid={`status-item-${status.toLowerCase()}`}
                                    >
                                        {status}
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        )
                    }}
                />
            </Box>
            <DrawerSectionTitle testId={'passengers-label'}>
                {passengersLabel}s
            </DrawerSectionTitle>
            <Typography fontSize={'0.9em'} fontWeight={400} color={'textSecondary'}>
                Click a {passengersLabel} to add them to this element
            </Typography>
            <Box className={classes.ElementForm__Section}>
                <PassengersTable label={passengersLabel}/>
            </Box>
        </Box>
    )
}