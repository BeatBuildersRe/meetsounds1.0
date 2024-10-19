import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';


export default function Avatars(props) {
    return (
        <Stack direction="row" spacing={2}>
            <Avatar
                className={props.class}
                src={props.imagen}
                sx={{ width: props.width, height: props.height }}
            />
        </Stack>
    )

}