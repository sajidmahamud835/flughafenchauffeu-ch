import React, { createContext, useContext, useReducer } from 'react';
import { formatDateISO } from '../utils/formatDate';

const key = 'thn_data';
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

let defaultData = {
    start_date: formatDateISO(today),
    end_date: formatDateISO(tomorrow),
    start_address: '',
    destination_address1: '',
    destination_address2: '',
    destination_address3: '',
    destination_address4: '',
    destination_address5: '',
    adults: 2,
    children: 0,
    currency_code: 'CHF',
    currency_symbol: 'CEF',
    current_hotel: 'cocos',
    room: {
    },
    extra: [
    ],
    step: 1,
    finished: false,
};

function getLocalData() {
    try {
        const item = window.localStorage.getItem(key);
        if (item) {
            return JSON.parse(item);
        } else {
            setLocalData(defaultData);
            return defaultData;
        };
    } catch (error) {
        console.log(error);
        return defaultData;
    }
}

function setLocalData(value) {
    try {
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.log(error);
    }
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'changeSearch':
            const newData = {
                ...state,
                ...action.payload
            };
            setLocalData(newData);
            return newData;
        case 'addActivity':
            let newState = { ...state };
            newState[action.payload.field].push(action.payload.extra);
            setLocalData(newState);
            return newState;
        default:
            return state;
    }
};

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    // const [state, dispatch] = useReducer(reducer, getLocalData());
    return (
        <SearchContext.Provider value={useReducer(reducer, getLocalData())}>
            {children}
        </SearchContext.Provider>
    )
};

export const useSearchValue = () => useContext(SearchContext);