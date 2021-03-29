import { useState } from 'react';
import './RadioBox.css';

function RadioBox({ optionArray, btnHeight, btnWidth }) {
    const [selectedOption, setSelectedOption] = useState('');

    const clickHandler = (e, item) => {
        e.preventDefault();
        setSelectedOption(item)
    }


    return (
        <div className="predict-form-option">
            {optionArray.map((item, index) => {
                let radiosStyle = {
                    backgroundColor: selectedOption === item ? 'blue' : 'white',
                    color: selectedOption === item ? 'white' : 'blue',
                    width: selectedOption === item ? `${btnWidth || '70'}px` : `${btnWidth - 15 || '55'}px`,
                    height: selectedOption === item ? `${btnHeight || '40'}px` : `${(btnHeight - 15 || '25')}px`,
                }
                return (
                    < button
                        className="predict-option-btn"
                        key={index}
                        style={radiosStyle}
                        onClick={(e) => clickHandler(e, item)
                        }
                    >
                        { item}
                    </button>
                )
            }
            )
            }
        </div >
    );
}

export default RadioBox;