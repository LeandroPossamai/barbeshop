// components/Button.js
import PropTypes from 'prop-types';

export default function Button({ className, children, ...props }) {
  return (
    <button
      type="submit"
      className={`py-2 px-4 bg-stone-700 text-white rounded hover:bg-neutral-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  className: '',
};
