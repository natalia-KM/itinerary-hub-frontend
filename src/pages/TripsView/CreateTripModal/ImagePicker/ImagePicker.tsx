import { ImageList, ImageListItem } from '@mui/material'
import classes from './ImagePicker.module.scss'
import classNames from 'classnames'
import { DrawerSectionTitle } from 'components/DrawerSectionTitle'
import { itemData } from 'data/imagesData'

interface ImagePickerProps {
    currentValue?: string
    onChange: (val: string) => void
}

export const ImagePicker = ({
    currentValue,
    onChange
}: ImagePickerProps) => {

    return (
        <div>
            <DrawerSectionTitle>
                Select Trip Cover Image
            </DrawerSectionTitle>
           <ImageList cols={3} gap={10} className={classes.ImagePicker} data-testid='trip-form-image-picker'>
               {itemData.map((item) => (
                   <ImageListItem
                       key={item.img}
                       data-testid={item.img}
                       onClick={() => onChange(item.img)}
                       className={classNames(
                           item.img === currentValue
                               ? classes.Selected
                               : classes.Unselected
                       )}
                   >
                       <img
                           src={`src/assets/backgrounds/${item.img}.jpg`}
                           alt={item.title}
                           loading="lazy"
                        />
                   </ImageListItem>
               ))}
           </ImageList>
        </div>
    )
}