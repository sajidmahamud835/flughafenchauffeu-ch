import { React, useContext } from 'react';
import { FormContext } from '../../App';
import Footer from '../../componants/layouts/Footer/Footer';
import Header from '../../componants/layouts/Header/Header';
import Header2 from '../../componants/layouts/Header/Header2';
import Main from '../../componants/layouts/Main/Main';

const Home = () => {
    const { noFooter } = useContext(FormContext);

    return (
        <div>
            {!noFooter &&
                <Header />
            }
            {noFooter &&
                <Header2 />
            }
            <Main />
            {!noFooter &&
                <Footer />
            }
        </div>
    );
};

export default Home;