import React from 'react';

const Popup = ({ display, context, options }) => {
  if (!display) return null;

  // Destructuring with default values for button texts
  const {
    title,
    onConfirm,
    onCancel,
    confirmText = 'Confirm', // Default confirm button text
    cancelText = 'Cancel', // Default cancel button text
  } = options;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>{title}</h2>
        <div>{context}</div>
        <div className="popup-actions">
          {onConfirm && <button onClick={onConfirm}>{confirmText}</button>}
          {onCancel && <button onClick={onCancel}>{cancelText}</button>}
        </div>
      </div>
    </div>
  );
};

export default Popup;
