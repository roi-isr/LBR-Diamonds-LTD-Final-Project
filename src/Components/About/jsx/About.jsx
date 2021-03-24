import React from 'react';
import '../css/About.css';
import Factory from '../../../Assets/diamonds_comps/diamond_photo.png';
import Avatar from '@material-ui/core/Avatar';


class About extends React.Component {
  render() {
    return (
      <div >
     <h1 style={{fontFamily:"Comic Sans MS",textAlign:"center"}}>About us </h1>
        <div style={{display:"flex"}}>
          <div style={{display:"flex", flexDirection:'column',textAlign:"center"}}>
            <Avatar style={{height:"300px",width:"300px"}} className="av1" alt="Remy Sharp" src={Factory} />
            <h2 style={{fontFamily:"Comic Sans MS"}}>Specialize in the production of natural diamonds.</h2>
            </div>
            <div style={{display:"flex", flexDirection:'column',textAlign:"center"}}>
            <Avatar style={{height:"300px",width:"300px"}} className="av1" alt="Remy Sharp" src={Factory} />
           <h2 style={{fontFamily:"Comic Sans MS"}}>Wholesale and private diamond marketing.</h2>
            </div><div style={{display:"flex", flexDirection:'column',textAlign:"center"}}>
            <Avatar style={{height:"300px",width:"300px"}} className="av1" alt="Remy Sharp" src={Factory} />
           <h2 style={{fontFamily:"Comic Sans MS",textAlign:"center"}}>Fast deliveries worldwide.</h2>
            </div><div style={{display:"flex", flexDirection:'column'}}>
            <Avatar style={{height:"300px",width:"300px"}} className="av1" alt="Remy Sharp" src={Factory} />
            <h2 style={{fontFamily:"Comic Sans MS"}}>Over 25 years of experience in the field.</h2>
            
            </div>
            </div>

      </div>
    );
  }
}

export default About;