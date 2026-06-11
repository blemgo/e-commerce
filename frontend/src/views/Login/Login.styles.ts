import type { SxProps, Theme } from '@mui/material/styles';

export const loginStyles: Record<string, SxProps<Theme>> = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
    },
    banner: {
        flex: 0.4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signIn: {
        backgroundColor: 'background.',
        flex: 0.6,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}