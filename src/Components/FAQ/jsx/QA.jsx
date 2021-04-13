import React from 'react';
import '../css/QA.css'
import { Button } from 'react-bootstrap';
import Factory from '../../../Assets/diamonds_comps/diamond_photo.png';
import Avatar from '@material-ui/core/Avatar';

class QA extends React.Component {
  render() {
    return (
      <div className='Guide'>
        <h3 className='qa-title' >Step-by-Step Guide</h3>
        <h4><u>How to Choose a Diamond:</u></h4>
        <div>
          <p>
          <Avatar style={{ height: "300px", width: "300px", margin: 'auto' }} className="av1" alt="Remy Sharp" src={Factory} />
            <p className="about-description">Specialize in the production of natural diamonds.</p>
            1 . Carat, the accepted weight in the world of diamonds.
            1 carat = 0.2 g.
        </p>
        </div>
        <div>
          <p>
            2 . Color, the color of diamonds is important and that is why it is one of the key values ​​in determining the value of a diamond.
            The color scale ranges from D-Z.
            Color D is a transparent and clear diamond and color Z which has a shade of yellow / brown / gray.
            Therefore, the lighter the diamond, the rarer the diamond and therefore the higher its price.
        </p>
        </div>
        <div>
          <p>
            3 .The degree of cleanliness of the diamond is determined by a test to identify defects at a magnification of 10 times.
            The nature of the defects, their location, and their effect on the overall appearance of the diamond is what determines the degree of cleanliness.
        </p>
        </div>
        <div>
          <p>
            4 .Diamond cutting directly affects the interaction of the beam of light that strikes it and therefore its overall visibility in 3 main parameters: glow, fire and sparkle.
            The cut ranges from exellent to poor.
       </p>
        </div>


        <Button
          className="qa-search-btn"
          color="primary"
          href='/store'>
          SEARCH FOR A DIAMOND NOW
        </Button>
      </div >

    );
  }
}

export default QA;