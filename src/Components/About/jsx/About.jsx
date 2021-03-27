import React from 'react';
import '../css/About.css';
import Factory from '../../../Assets/diamonds_comps/diamond_photo.png';
import Avatar from '@material-ui/core/Avatar';


class About extends React.Component {
  render() {
    return (
      <div >
        <h1 style={{ fontFamily: "Comic Sans MS", textAlign: "center" }}>About us </h1>
        <div className="about-main-div">
          <div className="about-sec-div">
            <Avatar style={{ height: "300px", width: "300px", margin:'auto' }} className="av1" alt="Remy Sharp" src={Factory} />
            <p className="about-description">Specialize in the production of natural diamonds.</p>
          </div>
          <div className="about-sec-div">
            <Avatar style={{ height: "300px", width: "300px", margin:'auto' }} className="av1" alt="Remy Sharp" src={Factory} />
            <p className="about-description">Wholesale and private diamond marketing.</p>
          </div>
          <div className="about-sec-div">
            <Avatar style={{ height: "300px", width: "300px", margin:'auto' }} className="av1" alt="Remy Sharp" src={Factory} />
            <p className="about-description">Fast deliveries worldwide.</p>
          </div>
          <div className="about-sec-div">
            <Avatar style={{ height: "300px", width: "300px", margin:'auto' }} className="av1" alt="Remy Sharp" src={Factory} />
            <p className="about-description">Over 25 years of experience in the field.</p>

          </div>
        </div>

      </div>
    );
  }
}

export default About;