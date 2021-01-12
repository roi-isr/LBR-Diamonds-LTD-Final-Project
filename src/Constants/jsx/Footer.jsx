import React from 'react';
import '../css/Footer.css';
import ComPic1 from '../../Assets/diamonds_comps/com01.png'
import ComPic2 from '../../Assets/diamonds_comps/com02.png'
import ComPic3 from '../../Assets/diamonds_comps/com03.png'
import ComPic4 from '../../Assets/diamonds_comps/com04.png'
import { connect } from 'react-redux'

function Footer(props) {
    const comp_pics = [ComPic1, ComPic2, ComPic3, ComPic4];
    const line1 = "LBR DIAMONDS currently operates in Israel and around the world, a company that provides";
    const line2 = "For shops / individuals / merchants in the world diamonds, rough diamonds, polished and all that goes with it.";
    const line3 = "The company has over 20 years of experience, and specializes in diamond production.";
    return (
        props.visibility ?
            <footer className="site-footer">
                <p className="about-para">
                    {line1}
                    <br />
                    {line2}
                    <br />
                    {line3}
                </p>
                <hr />
                {/* Render diamonds companies images */}
                {comp_pics.map(
                    (item, index) =>
                        <img
                            className="site-footer-img"
                            key={"comp_pic" + index}
                            src={item}
                            alt={"comp" + index}
                        />
                )}
            </footer>
            : null
    )
}

const mapStateToProps = (state) => {
    return {
        visibility: state.navControl.visible
    }
}

export default connect(mapStateToProps)(Footer);
