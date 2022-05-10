import { useEffect, useState } from "react";
import "./FromInput.css";

const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const { label, suggetion, errorMessage, onChange, id, ...inputProps } = props;
    const [inputOptions, setInputOptions] = useState(
        [
            {
                title: "Frankfurt (Oder), Brandenburg, Deutschland",
                position: {
                    lat: 52.3417,
                    lng: 14.55428
                }
            },
            {
                title: "Brandenburg, Deutschland",
                position: {
                    lat: 53.3417,
                    lng: 14.55428
                }
            }
        ]
    );

    const handleFocus = (e) => {
        setFocused(true);
    };

    useEffect(() => {
        if (suggetion.status === 400) {
            console.log(suggetion.title, suggetion.action, suggetion.cause)
        } else {
            setInputOptions(suggetion.items)
        }
    }, [suggetion])

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

            {inputOptions.map(input => (<h6 className="text-primary small" key={input.position.lat}>{input.title}</h6>))}
            <span className="text-danger small">{errorMessage}</span>
        </div>
    );
};

export default FormInput;