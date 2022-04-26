import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    useMediaQuery,
    Slide
} from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { TransitionProps } from '@material-ui/core/transitions/transition'
import { ArrowBackIos } from '@material-ui/icons'
import { Close } from 'mdi-material-ui'
import React, { forwardRef } from 'react'

const useStyles = makeStyles((theme: Theme) => ({
    mainDialog: {
        height: '100%',
        '& .MuiDialog-paperFullWidth': {
            height: (params: any) => (params.fullHeight ? '100%' : '')
        }
    },

    buttonStyle: {
        background: (params: any) => {
            const { themeColor } = params
            if (themeColor === 'error') {
                return 'var(--mwork-red)'
            }
            return ''
        },
        color: (params: any) => {
            const { themeColor } = params
            if (themeColor === 'error') {
                return 'white'
            }
            return ''
        }
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: '50%',
        transform: 'translate(0,-50%)',
        color: theme.palette.grey[500]
    },
    closeButtonMobile: {
        position: 'absolute',
        left: theme.spacing(1),
        top: '50%',
        transform: 'translate(0,-50%)',
        color: theme.palette.grey[500]
    },
    titleDialog: {
        margin: 0,
        position: 'relative',
        padding: theme.spacing(1),
        background: (params: any) =>
            params.themeColor === 'error'
                ? 'var(--mwork-red)'
                : params.themeColor === 'default'
                    ? 'var(--mwork-gray1)'
                    : 'var(--mwork-green)',
        color: (params: any) =>
            params.themeColor === 'error'
                ? '#fff'
                : params.themeColor === 'default'
                    ? '#000'
                    : '#fff'
    },
    closeIcon: {
        color: (params: any) =>
            params.themeColor === 'error'
                ? '#fff'
                : params.themeColor === 'default'
                    ? '#000'
                    : '#fff'
    },
    content: {
        height: '100%',
        position: 'relative',
        padding: (params: any) => {
            if (params.padding) {
                return params.padding
            }
            return '0'
        },
        overflow: (params: any) => {
            if (params.contentOverflow) {
                return params.contentOverflow
            }
            return 'auto'
        }
    }
}))

interface IMworkDialog {
    header?: string
    buttonTitle?: string
    /** method close dialog */
    onClose?: () => void | undefined
    /** Open dialog state */
    open: boolean
    /** The content is displayed in a dialog */
    children: JSX.Element
    /** button and header background color style */
    themeColor?: 'primary' | 'secondary' | 'default' | 'inherit' | 'error'
    onSubmit?: () => void
    maxWidth?: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined
    buttonIcon?: React.ReactNode
    padding?: string | boolean | undefined
    direction?: 'right' | 'left' | 'up' | 'down' | undefined
    hideBackdrop?: boolean
    fullScreen?: boolean
    contentOverflow?: 'auto' | 'hidden'
    buttonDisabled?: boolean
    fullHeight?: boolean
}

// const TransitionComponent = (
//   props: TransitionProps & { children?: React.ReactElement },
//   ref: React.Ref<unknown>
// ) => {
//   return <Slide direction={'up'} ref={ref} {...props} />
// }

const Transitionup = forwardRef(
    (
        props: TransitionProps & { children?: React.ReactElement },
        ref: React.Ref<unknown>
    ) => {
        return (
            <Slide
                direction="up"
                timeout={{ enter: 5000, exit: 5000 }}
                in={true}
                ref={ref}
                {...props}
            />
        )
    }
)
const Transitionleft = forwardRef(
    (
        props: TransitionProps & { children?: React.ReactElement },
        ref: React.Ref<unknown>
    ) => {
        return (
            <Slide
                timeout={{ enter: 5000, exit: 5000 }}
                in={true}
                direction="left"
                ref={ref}
                {...props}
            />
        )
    }
)
const Transitionright = forwardRef(
    (
        props: TransitionProps & { children?: React.ReactElement },
        ref: React.Ref<unknown>
    ) => {
        return (
            <Slide
                timeout={{ enter: 5000, exit: 5000 }}
                in={true}
                direction="right"
                ref={ref}
                {...props}
            />
        )
    }
)

export const MworkDialog = ({
    header = '',
    buttonTitle = 'OK',
    onClose,
    open,
    children,
    themeColor = 'primary',
    onSubmit,
    maxWidth = 'xs',
    buttonIcon,
    padding = '16px 24px',
    direction = 'up',
    hideBackdrop = false,
    fullScreen = false,
    contentOverflow = 'auto',
    buttonDisabled = false,
    fullHeight = false
}: IMworkDialog) => {
    const classes = useStyles({
        themeColor,
        padding,
        contentOverflow,
        fullHeight
    })
    const matches = useMediaQuery('(max-width:570px)')

    const transition: any = {
        up: Transitionup,
        left: Transitionleft,
        right: Transitionright
    }

    return (
        <Dialog
            onClose={onClose}
            open={open}
            fullWidth={true}
            maxWidth={maxWidth}
            fullScreen={matches || fullScreen}
            TransitionComponent={matches ? transition[direction] : undefined}
            transitionDuration={{ enter: 210, appear: 210, exit: 210 }}
            hideBackdrop={hideBackdrop}
            className={classes.mainDialog}
        >
            <DialogTitle disableTypography={true} className={classes.titleDialog}>
                {matches ? (
                    <>

                        {onClose && <IconButton
                            onClick={onClose}
                            className={classes.closeButtonMobile}
                        >
                            <ArrowBackIos className={classes.closeIcon} />
                        </IconButton>}

                        <Typography variant="h6" align="center">
                            {header}
                        </Typography>
                    </>
                ) : (
                    <>
                        <Typography variant="h6">{header}</Typography>

                        {onClose && <IconButton onClick={onClose} className={classes.closeButton}>
                            <Close className={classes.closeIcon} />
                        </IconButton>}

                    </>
                )}
            </DialogTitle>
            <DialogContent className={classes.content} dividers={true}>
                <>{children}</>
            </DialogContent>

            {onSubmit && <DialogActions>
                <Button
                    disabled={buttonDisabled}
                    className={classes.buttonStyle}
                    color={themeColor !== 'error' ? themeColor : undefined}
                    variant="contained"
                    onClick={onSubmit}
                    startIcon={buttonIcon}
                >
                    {buttonTitle}
                </Button>
            </DialogActions>}

        </Dialog>
    )
}
