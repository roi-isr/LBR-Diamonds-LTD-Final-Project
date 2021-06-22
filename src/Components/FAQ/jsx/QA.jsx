import React from 'react';
import '../css/QA.css'
import { Button } from 'react-bootstrap';
import Factory from '../../../Assets/diamonds_comps/diamond_photo.png';
import styled from 'styled-components/macro';

const DiamondIcon = styled.div
  `
  background-image: url(${Factory});
  height:14rem;
  width:14rem;
  background-position: top 43% left 50%;
  background-size: 160%;
  border-radius: 50%;
  margin:auto;
  border: 1px solid black;
  box-shadow: 2px 2px 20px 1px #000;
`;

class QA extends React.Component {
  render() {
    return (
      <div className='Guide'>
        <h2 className="qa-title">How to Choose a Diamond</h2>
        <div className="guide-info-item">
        
        <DiamondIcon/>
            <p>Specialize in the production of natural diamonds.
             Carat, the accepted weight in the world of diamonds.
             1 carat = 0.2 g.</p>
             <br></br>
            
      
        </div>
        <div className="guide-info-item">
        <DiamondIcon/>

          <p>
             Color, the color of diamonds is important and that is why it is one of the key values ​​in determining the value of a diamond.
            The color scale ranges from D-Z.
            Color D is a transparent and clear diamond and color Z which has a shade of yellow / brown / gray.
            Therefore, the lighter the diamond, the rarer the diamond and therefore the higher its price.
        </p>
        </div>
        <div className="guide-info-item">
        <DiamondIcon/>
          <p>

            The degree of cleanliness of the diamond is determined by a test to identify defects at a magnification of 10 times.
            The nature of the defects, their location, and their effect on the overall appearance of the diamond is what determines the degree of cleanliness.
        </p>
        </div>
        <div className="guide-info-item">
        <DiamondIcon/>
          <p>

           Diamond cutting directly affects the interaction of the beam of light that strikes it and therefore its overall visibility in 3 main parameters: glow, fire and sparkle.
            The cut ranges from exellent to poor.
       </p>
        </div>


        <Button
          className="qa-search-btn"
          color="primary"
          href='/store'
          id='go-to-store'>
          SEARCH FOR A DIAMOND NOW
        </Button>
      </div >

    );
  }
}

export default QA;