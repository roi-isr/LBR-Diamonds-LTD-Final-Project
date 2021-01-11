import React from 'react';
import '../css/QA.css'
import { Button } from 'react-bootstrap';

class QA extends React.Component {
  render() {
    return (
      <div className='Guide'>
        <h3>Step-by-Step Guide:</h3><h4>How to Choose a Diamond</h4><br />
        <p>
          1 . First, identify the diamond shape desired by the recipient. If you do not know and cannot find out, consider round or princess cut.
        </p>
        <p>
          2 . Set a carat weight minimum based on the recipient's preferences. If they have their heart set on a one carat diamond, even the most beautiful half carat stone will be a disappointment.
        </p>
        <p>
          3 . Start with the highest quality diamond of the shape and carat weight minimum you identified in steps 1 and 2, and begin making concessions in the following order until you arrive at a diamond that fits your budget:
        </p>
        <ul>
          <li>First, lower the Clarity. See clarity buying tips (below) for more guidance. Go as low as VS2 before making concessions in other areas.</li>
          <li>Next, lower the Color. See color buying tips (below) for more guidance. Go as low as H before making concessions in other areas.</li>
          <li>Finally, lower the Cut. See cut buying tips (below) for more guidance. Go as low as Very Good in round diamonds, and Good in fancy shapes before making concessions in other areas.</li>
          <li>If the diamonds that match your revised criteria are close to your budget, consider shaving off some carat weight in order to close the gap. A carat weight difference of 10% or less will be very difficult to detect visually.</li>
        </ul>
        <p>
          4 . If after following the steps above, you are still outside your budget, repeat the process with new thresholds:
       </p>
        <ul>
          <li>First, further reduce Clarity. Go as low as SI1.</li>
          <li>Next, reduce Color. Go as low as J. If you know the diamond will be set in yellow gold, you could safely drop to K.</li>
          <li>Finally, reduce the Cut. Go as low as Good in round diamonds, and Fair in fancy shapes.</li>
        </ul>


        <Button className="qa-search-btn" color="primary" disableElevation>
          SEARCH FOR A DIAMOND NOW
      </Button>
      </div >

    );
  }
}

export default QA;