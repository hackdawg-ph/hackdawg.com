import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Button = React.forwardRef(({ className, active, reversed, ...props }, ref) => (
    <span
        {...props}
        ref={ref}
        className={cx('px-1 cursor-pointer', className, {
            'text-white': reversed && active,
            'text-gray-400': reversed && !active,
            'text-gray-900': !reversed && active,
            'text-gray-300': !reversed && !active,
        })}
    />
));

Button.propTypes = {
    reversed: PropTypes.bool,
    active: PropTypes.bool,
    className: PropTypes.string,
};

Button.displayName = 'Button';

export default Button;
