import React from "react";
import style from './Button.module.css';

export const Button = ({ color = 'pink', shape = 'block', className='', onClick, children, ...props }) => {
  return (
    <button
      className={`${style.button} ${className}`}
      data-color={color}
      data-shape={shape}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
