import { useEffect, useState } from "react";
import "./FromInput.css";

const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const [showSuggestion, setShowSuggestion] = useState(false);
    const { label, errorMessage, onChange, id, startAddressSuggestion, inputName, value, ...inputProps } = props;
    const [address, setAddress] = useState('');
    // const { start_address } = value;

    const handleFocus = (e) => {
        setFocused(true);
    };
    useEffect(() => {
        if (inputName === "start_address") {
            console.log(startAddressSuggestion);
            // setAddress(start_address);
            setShowSuggestion(true);

        }
    }, [inputName, startAddressSuggestion]);
    return (
        <div className="formInput">
            <label>{label}</label>
            {(showSuggestion) &&
                <div class="card mt-0 pt-0 border-top-0 shadow rounded-lg mb-2 inputSugesstions">
                    <input
                        {...inputProps}
                        onChange={onChange}
                        onBlur={handleFocus}
                        onFocus={() =>
                            inputProps.name === "confirmPassword" && setFocused(true)
                        }
                        focused={focused.toString()}
                    />



                    {showSuggestion && startAddressSuggestion.items.map(input => (
                        <div class="card-body ps-3 py-1 m-1 border border-light rounded inputSugesstion">
                            <h6 className="text-primary" key={input.position.lat}>{input.title}</h6>
                        </div>
                    ))}

                </div>}

            {!showSuggestion &&
                <input
                    {...inputProps}
                    onChange={onChange}
                    onBlur={handleFocus}
                    onFocus={() =>
                        inputProps.name === "confirmPassword" && setFocused(true)
                    }
                    focused={focused.toString()}
                />
            }

            <span className="text-danger small">{errorMessage}</span>
        </div >
    );
};

export default FormInput;