import React from 'react';
import loader1 from '../assets/images/loader2.svg';

const loader = (props) => {
    if (props.isLoading === true) {
        return (<div className="overlay">
            <img src={loader1} />
        </div>)
    } else {
        return <div></div>
    }
}

export default loader;