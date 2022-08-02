import React from "react";

interface IInputProps {
  state?: any;
  value?: any;
  type?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (value: any, type: string) => void;
}

const Input = React.forwardRef((props: IInputProps, ref: any) => {
  const { value, state, type, placeholder, onChange, ...otherProps } = props;
  return (
    <fieldset className="form-group">
      <input
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value, `${state}`)}
        className="form-control"
        type={type}
        placeholder={placeholder}
        {...otherProps}
      />
    </fieldset>
  );
});

export default Input;
