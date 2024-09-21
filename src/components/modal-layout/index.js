import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ModalLayout({ children, onClose }) {
    const cn = bem('ModalLayout');

    return (
        <div className={cn()}>
        <div className={cn('overlay')} onClick={onClose} />
        <div className={cn('content')}>
            {children}
        </div>
        </div>
    );
}

ModalLayout.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default React.memo(ModalLayout);
