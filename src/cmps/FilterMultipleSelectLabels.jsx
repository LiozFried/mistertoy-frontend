import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'

export function FilterMultipleSelectLabels({ labels, value, onChange }) {

    const theme = useTheme()

    const ITEM_HEIGHT = 48
    const ITEM_PADDING_TOP = 8
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    }

    function getStyles(label, value, theme) {
        return {
            fontWeight: value.includes(label)
                ? theme.typography.fontWeightMedium
                : theme.typography.fontWeightRegular,
        }
    }

    return (
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="multiple-chip-label">Labels</InputLabel>
            <Select
                labelId="multiple-chip-label"
                id="multiple-chip"
                multiple
                value={value}
                onChange={onChange}
                input={<OutlinedInput id="multiple-chip" label="Labels"
                    sx={{
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'green'
                        }
                    }}
                />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((val) => (
                            <Chip key={val} label={val} />
                        ))}
                    </Box>
                )}
                MenuProps={MenuProps}
            >
                {labels.map((label) => (
                    <MenuItem
                        key={label}
                        value={label}
                        style={getStyles(label, value, theme)}
                    >
                        {label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl >
    )
}




