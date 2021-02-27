import react, { useState } from 'react';
import './RadioBox.css';

function RadioBox({ optionArray }) {
    const [selectedOption, setSelectedOption] = useState('');

    const clickHandler = (e, item) => {
        e.preventDefault();
        setSelectedOption(item)
    }
    return (
        <div className="predict-form-option">
            {optionArray.map((item, index) =>
                <button
                className="predict-option-btn" 
                key={index}
                    style={{ backgroundColor: selectedOption === item ? 'blue' : 'white' , color: selectedOption === item ? 'white' : 'blue', width:  selectedOption === item ? '50px' : '40px',  height:  selectedOption === item ? '50px' : '40px'}}
                    onClick={(e) => clickHandler(e, item)}
                >
                    {item}
                </button>
            )
            }
        </div>
    );
}

export default RadioBox;