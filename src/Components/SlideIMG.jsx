import React from 'react';
import './SlideImg.css';
import Carousel from 'react-bootstrap/Carousel';
import RE1 from '../Assets/Dmn_pic/RE1.jpg';
import RE2 from '../Assets/Dmn_pic/RE2.jpg';
import RE3 from '../Assets/Dmn_pic/RE3.jpg';
import RE4 from '../Assets/Dmn_pic/RE4.jpg';
import RE5 from '../Assets/Dmn_pic/RE5.jpg';
import RE6 from '../Assets/Dmn_pic/RE6.jpg';

const SlideImg = () => {
    const slide_interval = 4000;
    const pic_arr = [RE1, RE2, RE3, RE4, RE5, RE6];
    return (
        <Carousel className="img-carousel">
            {pic_arr.map((item, index) =>
                <Carousel.Item key={"pic" + index} interval={slide_interval}>
                    <img
                        className="d-block w-100"
                        src={item}
                        alt="First diamond"
                        height="500px"
                    />
                </Carousel.Item>
            )}
        </Carousel>
    )
}

export default SlideImg;