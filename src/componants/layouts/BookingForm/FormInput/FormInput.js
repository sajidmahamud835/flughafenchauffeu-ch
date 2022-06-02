import { useEffect, useState } from "react";
import "./FromInput.css";

const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const { label, errorMessage, onChange, id, addressSuggestion, inputName, value, onAddressChange, showSuggestion, setShowSuggestion, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    };

    // const inputValue = value;
    // const dataValue = value[`${inputName}_data`];
    useEffect(() => {
        if ((inputName === "start_address" || inputName === "destination_01" || inputName === "destination_02" || inputName === "destination_03" || inputName === "destination_04" || inputName === "destination_05") && value) {
            setShowSuggestion(true);
        }
    }, [inputName, value, setShowSuggestion]);
    return (
        <div className="formInput">
            <label>{label}</label>
            <div className={"card border-top-0 rounded-lg mb-2 inputSugesstions"}>

                <input
                    {...inputProps}
                    onChange={onChange}
                    onBlur={handleFocus}
                    onFocus={() => {
                        inputProps.name === "confirmPassword" && setFocused(true)
                    }
                    }
                    value={value}
                    focused={focused.toString()}
                />



                {(showSuggestion && addressSuggestion[inputName].items.length > 0) &&
                    <div>
                        {
                            addressSuggestion[inputName].items.map(item => (
                                <div className="card-body ps-3 py-1 m-1 border border-light rounded inputSugesstion" key={item.id}>
                                    <h6 onClick={(e) => onAddressChange(e, item, inputName)} className="" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                    </svg> {item.title}</h6>
                                </div>

                            ))
                        }
                        {
                            // <div className="card-body ps-3 py-1 m-1 border border-light rounded inputSugesstion">
                            //     <h6 onClick={(e) => onAddressChange(e, addressSuggestion[inputName].items[0], inputName)} className="" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-compass-fill" viewBox="0 0 16 16">
                            //         <path d="M15.5 8.516a7.5 7.5 0 1 1-9.462-7.24A1 1 0 0 1 7 0h2a1 1 0 0 1 .962 1.276 7.503 7.503 0 0 1 5.538 7.24zm-3.61-3.905L6.94 7.439 4.11 12.39l4.95-2.828 2.828-4.95z" />
                            //     </svg> Current Address</h6>
                            // </div>
                        }
                    </div>
                }

<span className="text-danger small">{errorMessage}</span>
            </div>
           
        </div >
    );
};

export default FormInput;