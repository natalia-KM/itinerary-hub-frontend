import { Autocomplete, Box, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { DrawerSectionTitle } from 'components/DrawerSectionTitle'
import { ElementType } from 'hooks/elements'

import { useMemo } from 'react'
import classes from '../AddElementDrawer.module.scss'
import { Controller, useFormContext } from 'react-hook-form'
import { FormSchema } from '../formSchema'
import { accommCategories, activityCategories, transportCategories, elementCategoryIcons } from '../options'
import { InputErrorMessage } from 'components/InputErrorMessage'
import { AccomElementForm, ActivityElementForm, TransportElementForm } from './elementForms'

export const ElementFormStepOne = () => {
    const { control, setValue, watch, formState: { errors } } = useFormContext<FormSchema>()
    const elementType = watch('elementType')

    const testId = 'element-form-step-one'

    const handleTypeChange = (
        event: React.MouseEvent<HTMLElement>,
        newValue: ElementType,
    ) => {
        setValue('elementInformation.type', newValue)
        setValue('elementType', newValue)
    }

    const options = useMemo(() => {
        switch (elementType) {
            case ElementType.TRANSPORT: return transportCategories
            case ElementType.ACTIVITY: return activityCategories
            case ElementType.ACCOMMODATION: return accommCategories
        }
    }, [elementType])

    return (
        <Box className={classes.AddElementForm}>
            <DrawerSectionTitle>
                Type
            </DrawerSectionTitle>
            <Box className={classes.AddElementForm__Section}>
                <Controller
                    name='elementType'
                    control={control}
                    render={({ field }) => {
                        return (
                            <ToggleButtonGroup
                                {...field}
                                value={elementType}
                                onChange={handleTypeChange}
                                aria-label="Choose element category"
                                fullWidth
                                exclusive
                            >
                                <ToggleButton
                                    value={ElementType.TRANSPORT}
                                    className={classes.AddElementForm__ToggleType}
                                    color={'secondary'}
                                >
                                    Transport
                                </ToggleButton>
                                <ToggleButton
                                    value={ElementType.ACTIVITY}
                                    className={classes.AddElementForm__ToggleType}
                                    color={'secondary'}
                                >
                                    Activity
                                </ToggleButton>
                                <ToggleButton
                                    value={ElementType.ACCOMMODATION}
                                    className={classes.AddElementForm__ToggleType}
                                    color={'secondary'}
                                >
                                    Accommodation
                                </ToggleButton>
                            </ToggleButtonGroup>
                        )
                    }}
                />
            </Box>

            <DrawerSectionTitle>
                Category
            </DrawerSectionTitle>
            <Typography fontSize={'0.9em'} fontWeight={400} color={'textSecondary'}>
                Pick a category, or add your own.
            </Typography>
            <Box className={classes.AddElementForm__Section}>
                <div>
                <Controller
                    name='elementCategory'
                    control={control}
                    render={({ field: { onChange, value, ...props } }) => (
                        <Autocomplete
                            value={value ?? null}
                            options={options}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    label="Choose category"
                                    variant="outlined"
                                />
                            )}
                            renderOption={(props, option) => {
                                const config = elementCategoryIcons[option]
                                const Icon = config?.icon

                                return (
                                    <li {...props}>
                                        {Icon && (
                                            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                                                <Icon fontSize="small" htmlColor={config.color} />
                                            </Box>
                                        )}
                                        {option}
                                    </li>
                                )
                            }}
                            size={'small'}
                            onChange={(e, data) => onChange(data)}
                            onInputChange={(e, newInputValue, reason) => {
                                if (reason === 'input') {
                                    onChange(newInputValue)
                                }
                            }}
                            defaultValue={null}
                            freeSolo
                            {...props}
                        />
                    )}
                />
                {errors.elementCategory &&
                    <InputErrorMessage
                        dataTestId={`${testId}-element-cat-error`}
                        error={errors.elementCategory.message}
                    />
                }
                </div>
            </Box>

            {elementType === ElementType.TRANSPORT && (
                <TransportElementForm />
            )}

            {elementType === ElementType.ACTIVITY && (
                <ActivityElementForm />
            )}

            {elementType === ElementType.ACCOMMODATION && (
                <AccomElementForm />
            )}
        </Box>

    )
}