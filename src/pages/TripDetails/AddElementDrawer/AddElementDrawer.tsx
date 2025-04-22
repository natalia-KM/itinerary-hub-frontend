import { CustomDrawer } from 'components/CustomDrawer'
import { useMemo, useState } from 'react'
import { Box } from '@mui/material'
import { SectionDetails } from 'hooks/sections'
import { DrawerActionButtons } from 'components/DrawerActionButtons/DrawerActionButtons'
import { ElementFormStepOne } from './ElementFormStepOne'
import { FormProvider, useForm } from 'react-hook-form'
import { FormSchema } from './formSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema, stepOneFields } from './validationSchema'
import { ElementFormStepTwo } from './ElementFormStepTwo/ElementFormStepTwo'
import classes from './AddElementDrawer.module.scss'
import { ElementType, useGetElements, useCreateElement } from 'hooks/elements'
import { toast } from 'react-toastify'
import { useSectionContext } from 'provider/SectionProvider/SectionContext'
import { useQueryClient } from '@tanstack/react-query'

interface AddElementDrawerProps {
    isOpen: boolean
    closeDrawer: () => void
    sectionDetails: SectionDetails
    sectionId: string
}

export const AddElementDrawer = ({
    isOpen,
    closeDrawer,
    sectionDetails,
    sectionId
}: AddElementDrawerProps) => {
    const { openOptionId: optionId } = useSectionContext()
    const queryClient = useQueryClient()

    const methods = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            elementType: ElementType.TRANSPORT,
            elementInformation: {
                type: 'TRANSPORT'
            },
            passengerIds: []
        }
    })
    const { mutateAsync: getElements, data: elements } = useGetElements(optionId ?? '')
    const { createElement } = useCreateElement()

    const [step, setStep] = useState(1)

    const onNext = () => setStep((prev) => prev + 1)
    const onBack = () => setStep((prev) => prev - 1)

    const cancelBtnLabel = useMemo(() => {
        return step === 1 ? 'Cancel' : 'Go back'
    }, [step])

    const submitBtnLabel = useMemo(() => {
        return step === 1 ? 'Next' : 'Create'
    }, [step])

    const onCancel = () => {
        if (step == 1) {
            closeDrawer()
        } else {
            onBack()
        }
    }

    const handleStepSubmit = async () => {
        if (!elements) {
            await getElements()
        }

        if (step === 1) {
            const isStepOneValid = await methods.trigger(stepOneFields)
            if (!isStepOneValid) return

            onNext()
        } else {
            const isValid = await methods.trigger()
            if (!isValid) {
                return
            }

            if (!elements || !optionId) {
                toast.error('Something went wrong. Try again later.')
                return
            }

            const order = elements?.length + 1
            const formValues = methods.getValues()

            await createElement({
                formValues,
                sectionId,
                optionId,
                order
            }).then(async () => {
                await queryClient.invalidateQueries({ queryKey: ['elementInfo', optionId] })
            }).catch((e) => {
                console.error(e)
                toast.error('Couldn\'t create an element. Try again later.', { toastId: 'create-element-error-toast' })
            }).finally(() => {
                closeDrawer()
            })
        }
    }

    return (
        <CustomDrawer
            isOpen={isOpen}
            setClosed={closeDrawer}
            testId="add-element-drawer"
            title="Add New Element"
            desc={`Create element in ${sectionDetails.sectionName}`}
        >
            <FormProvider {...methods}>
                <form
                    className={classes.AddElementForm}
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleStepSubmit()
                    }}
                >
                    {step === 1 && (
                        <ElementFormStepOne/>
                    )}
                    {step === 2 && (
                        <ElementFormStepTwo/>
                    )}
                    <Box sx={{ flexGrow: 1 }}/>

                    <DrawerActionButtons
                        onCancel={onCancel}
                        cancelTitle={cancelBtnLabel}
                        confirmTitle={submitBtnLabel}
                    />
                </form>
            </FormProvider>
        </CustomDrawer>
    )
}