import { useEffect, useState } from "react";
import "./FromInput.css";

const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, startAddressSuggestion, inputName, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    };
    useEffect(() => {
        if (inputName === "start_address") {
            console.log(startAddressSuggestion)
        }
    }, [inputName, startAddressSuggestion]);
    return (
        <div className="formInput">
            <label>{label}</label>
            <input
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                onFocus={() =>
                    inputProps.name === "confirmPassword" && setFocused(true)
                }
                focused={focused.toString()}
            />
            <span className="text-danger small">{errorMessage}</span>
        </div>
    );
};

export default FormInput;