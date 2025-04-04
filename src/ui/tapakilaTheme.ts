import { createTheme, Theme } from '@mui/material';
import { radiantLightTheme } from 'react-admin';

export const tapakilaTheme: Theme = createTheme({
    ...radiantLightTheme,
    palette: {
        ...radiantLightTheme.palette,
        primary: {
            main: '#020324',
        },
        secondary: {
            main: '#CBCAC3',
        },
        background: {
            default: '#232c43',
        },
        text: {
            primary: '#141C2D',
            secondary: '#141C2D',
        },
    },
});
