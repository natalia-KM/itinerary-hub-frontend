import { Box } from '@mui/material'
import { EditableDate } from 'components/EditableDate'
import dayjs, { Dayjs } from 'dayjs'
import classes from './TripHeader.module.scss'
import { useUpdateTrip } from 'hooks/trips'
import { useEffect, useState } from 'react'
import { EditableText } from 'components/EditableText'
import { toast } from 'react-toastify'
import { normalizeTripData, transformDayJsToString, TripDetails, useTripId } from 'utils'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import webClient from 'config/clientConfig'

export const TripHeader = () => {
    const { tripId } = useTripId()

    const { data: tripDetails } = useQuery<TripDetails>({ queryKey: ['tripDetails', tripId], enabled: false,
        queryFn: async () => {
            const { data } = await webClient.get(`/v1/trips/${tripId}`)
            return normalizeTripData(data).trip.tripDetails
        } })

    const queryClient = useQueryClient()

    const [isEditingTripName, setIsEditingTripName] = useState(false)
    const [currentTripName, setTripName] = useState(tripDetails?.tripName)

    useEffect(() => {
        setTripName(tripDetails?.tripName)
    }, [tripDetails?.tripName])

    const { mutateAsync: updateTrip } = useUpdateTrip()

    const updateTripName = async () => {
        setIsEditingTripName(false)

        const newName = currentTripName?.trim()
        if (!newName || newName === tripDetails?.tripName) {
            setTripName(tripDetails?.tripName)
            return
        }

        await updateTrip({ tripId: tripId, request: { tripName: newName } })
            .then(() => {
                setTripName(newName)
                queryClient.setQueryData(['tripDetails', tripId], (old: TripDetails) => ({
                    ...old,
                    tripName: newName
                }))
            })
            .catch(() => {
                setTripName(tripDetails?.tripName)
                toast('Couldn\'t update the trip name. Try again later.', { toastId: 'failed-trip-name-update-toast' })
            })
    }

    const onSaveStartDate = async (value: Dayjs | null) => {
        const dateStr = transformDayJsToString(value ?? undefined)
        if(!dateStr) return

        if(value?.isAfter(dayjs(tripDetails?.endDate))) {
            toast('Start date must be before end date.', { toastId: 'invalid-trip-start-date-update-toast' })
            return
        }

        await updateTrip({ tripId: tripId, request: { startDate: dateStr } })
            .then(() => {
                queryClient.setQueryData(['tripDetails', tripId], (old: TripDetails) => ({
                    ...old,
                    startDate: dateStr
                }))
            })
            .catch(() => {
                toast('Couldn\'t update the start date. Try again later.', { toastId: 'failed-trip-start-date-update-toast' })
            })
    }

    const onSaveEndDate = async (value: Dayjs | null) => {
        const dateStr = transformDayJsToString(value ?? undefined)
        if(!dateStr) return

        if(dayjs(tripDetails?.startDate).isAfter(value)) {
            toast('End date must be after start date.', { toastId: 'invalid-trip-end-date-update-toast' })
            return
        }

        await updateTrip({ tripId: tripId, request: { endDate: dateStr } })
            .then(() => {
                queryClient.setQueryData(['tripDetails', tripId], (old: TripDetails) => ({
                    ...old,
                    endDate: dateStr
                }))
            })
            .catch(() => {
                toast('Couldn\'t update the end date. Try again later.', { toastId: 'failed-trip-start-date-update-toast' })
            })
    }

    return (
        <Box className={classes.TripHeader}>
            <EditableText
                testId='trip-view-name'
                value={currentTripName}
                setValue={setTripName}
                isEditing={isEditingTripName}
                setIsEditing={setIsEditingTripName}
                onSave={updateTripName}
                size='large'
                withIcon
            />

            <Box sx={{ flexGrow: 1 }} />

            <EditableDate
                testId='trip-view-start-date'
                initialValue={tripDetails?.startDate ? dayjs(tripDetails.startDate) : null}
                onSave={onSaveStartDate}
                label='Start Date'
                displayText={!tripDetails?.startDate ? 'Set Start Date' : undefined}
            />
            <EditableDate
                testId='trip-view-end-date'
                initialValue={tripDetails?.endDate ? dayjs(tripDetails.endDate) : null}
                onSave={onSaveEndDate}
                label='End Date'
                displayText={!tripDetails?.endDate ? 'Set End Date' : undefined}
            />
        </Box>
    )
}