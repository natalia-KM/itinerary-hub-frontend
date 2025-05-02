import { CustomDrawer } from 'components/CustomDrawer'
import { useMemo, useState } from 'react'
import { Box } from '@mui/material'
import { SectionDetails } from 'hooks/sections'
import { DrawerActionButtons } from 'components/DrawerActionButtons/DrawerActionButtons'
import { ElementFormStepOne } from './ElementForStepOne'
import { FormProvider, useForm } from 'react-hook-form'
import { FormSchema } from './formSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema, stepOneFields } from './validationSchema'
import { ElementFormStepTwo } from './ElementFormStepTwo/ElementFormStepTwo'
import classes from './ElementDrawer.module.scss'
import { ElementType, useGetElements } from 'hooks/elements'
import { toast } from 'react-toastify'
import { useSectionContext } from 'provider/SectionProvider/SectionContext'

interface ElementDrawerProps {
    isOpen: boolean
    closeDrawer: () => void
    title: string
    desc: string
    submitTitle: string
    disableElementType: boolean
    onSubmit: (formValues: FormSchema, optionId: string, order?: number) => void
    sectionDetails: SectionDetails
    existingElement?: FormSchema
}

export const ElementDrawer = ({
    isOpen,
    closeDrawer,
    title,
    desc,
    submitTitle,
    disableElementType,
    onSubmit,
    sectionDetails,
    existingElement
}: ElementDrawerProps) => {
    const { openOptionId: optionId } = useSectionContext()

    const initialValues = {
        elementType: ElementType.TRANSPORT,
        elementInformation: {
            type: ElementType.TRANSPORT
        },
        passengerIds: []
    }

    const methods = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: existingElement ?? initialValues
    })

    const { mutateAsync: getElements, data: elements } = useGetElements(optionId ?? '')

    const [step, setStep] = useState(1)
    const onNext = () => setStep((prev) => prev + 1)
    const onBack = () => setStep((prev) => prev - 1)

    const cancelBtnLabel = useMemo(() => {
        return step === 1 ? 'Cancel' : 'Go back'
    }, [step])

    const submitBtnLabel = useMemo(() => {
        return step === 1 ? 'Next' : submitTitle
    }, [step])

    const onCancel = () => {
        if (step == 1) closeDrawer()
        onBack()
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
            onSubmit(methods.getValues(), optionId, order)
        }
    }

    return (
        <CustomDrawer
            isOpen={isOpen}
            setClosed={closeDrawer}
            testId="add-element-drawer"
            title={title}
            desc={`${desc} ${sectionDetails.sectionName}`}
        >
            <FormProvider {...methods}>
                <form
                    className={classes.Drawer}
                    onSubmit={async (e) => {
                        e.preventDefault()
                        await handleStepSubmit()
                    }}
                >
                    {step === 1 && (
                        <ElementFormStepOne disableTypeSelect={disableElementType}/>
                    )}
                    {step === 2 && (
                        <ElementFormStepTwo />
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