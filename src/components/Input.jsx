import React, { useId } from 'react'
import "./Input.css"; // new css import

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='input-container'>
            {label && (
                <label 
                    className='input-label'
                    htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`input-field ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input
