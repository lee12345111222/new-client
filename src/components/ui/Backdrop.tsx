import React, { FC, memo } from 'react';

type BackdropProps = {
    showBackdrop: boolean;
};

const Backdrop: FC<BackdropProps> = ({ showBackdrop }) => {
    const classes = ['Backdrop'];

    return showBackdrop ? (
        <button className={classes.join(' ')}></button>
    ) : null;
};

export default memo(Backdrop);
