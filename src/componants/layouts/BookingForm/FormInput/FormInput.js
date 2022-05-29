import { useEffect, useState } from "react";
import "./FromInput.css";

const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const [showSuggestion, setShowSuggestion] = useState(false);
    const { label, errorMessage, onChange, id, startAddressSuggestion, inputName, value, onAddressChange, ...inputProps } = props;

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
                <div className="card mt-0 pt-0 border-top-0 shadow rounded-lg mb-2 inputSugesstions">
                    <input
                        {...inputProps}
                        onChange={onChange}
                        onBlur={handleFocus}
                        onFocus={() =>
                            inputProps.name === "confirmPassword" && setFocused(true)
                        }
                        value={value}
                        focused={focused.toString()}
                    />



                    {showSuggestion && startAddressSuggestion.items.map(item => (
                        <div className="card-body ps-3 py-1 m-1 border border-light rounded inputSugesstion" key={item.id}>
                            <i className="fa-solid fa-location-dot"></i> <h6 onClick={(e) => onAddressChange(e, item, inputName)} className="text-primary" >{item.title}</h6>
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