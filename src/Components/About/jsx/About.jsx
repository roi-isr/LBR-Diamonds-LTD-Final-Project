import React from 'react';
import '../css/About.css';
import Factory from '../../../Assets/diamonds_comps/Diamonds-Botswana.jpg';

class About extends React.Component {
  render() {
    return (
      <div >

        <h1
          className="h1-about-us">
          About Us
</h1>
        <div className="about-us-content">
          <div className="about-us-inner">
            <p className="about-us-par"> LBR DIAMONDS is a company that specializes in the production of natural diamonds, marketing and distribution of diamonds in Israel.
<br />
The diamond production process is a complex process, from the purchase of the rough diamond, the polishing of the diamond and of course the sale of the diamonds by agents throughout Israel.
<br />
With us, you will find all types of diamonds, from a 0.01 carat diamond to 5 carats.
<br />
The company has a reputation and experience of over 20 years and is managed by Yoram Rabinian, a member of the Israeli Diamond Exchange.
 </p>
          </div>
          <img src={Factory}  className="factory-img" />
        </div>

      </div>
    );
  }
}

export default About;