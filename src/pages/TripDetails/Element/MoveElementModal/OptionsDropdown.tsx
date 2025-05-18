import { Autocomplete, Skeleton, TextField } from '@mui/material'
import { useGetOptions } from 'hooks/options'
import { useElementContext } from 'provider'

interface OptionsDropdownProps {
    selectedSectionId: string
    setSelectedOptionId: (optionId: string | null) => void
}

export const OptionsDropdown = ({
    selectedSectionId,
    setSelectedOptionId
}: OptionsDropdownProps) => {
    const { data: options, isPending } = useGetOptions(selectedSectionId)
    const { optionId } = useElementContext()

    if(isPending) {
        return <Skeleton/>
    }

    if(!options) {
        return null
    }

    return (
        <Autocomplete
            sx={{ margin: '5px 0' }}
            value={options.find(o => o.optionId === optionId) || undefined}
            options={options}
            getOptionLabel={(option) => option.optionName}
            isOptionEqualToValue={(option, value) => option.optionId === value.optionId}
            renderInput={(params) => (
                <TextField
                    {...params}
                    data-testid='section-input-field'
                    label="Option"
                    variant="outlined"
                />
            )}
            renderOption={(props, option) => (
                <li
                    {...props}
                    key={`option-list-item-${option.optionId}`}
                    data-testid={`option-list-item-${option.optionId}`}
                >
                    {option.optionName}
                </li>
            )}
            onChange={(e, selectedOption) => {
                setSelectedOptionId(selectedOption?.optionId || null)
            }}
            size="small"
            disableClearable
            fullWidth
        />
    )
}