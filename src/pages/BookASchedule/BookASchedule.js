import React from 'react';
import Search from '../../componants/Search/Search';
import { SearchProvider } from '../../store/SearchContext';

const BookASchedule = () => {
    return (
        <div>
            <SearchProvider>
                <Search />
            </SearchProvider>
        </div>
    );
};

export default BookASchedule;