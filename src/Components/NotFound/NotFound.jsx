import React from 'react';
import styled from 'styled-components/macro'
import NotFoundPic from '../../Assets/not_found_404/not_found_img.jpg'

const NotFoundMsg = styled.h1`
    text-align: center;
    width: 100%;
    font-size: 100px;
    text-shadow: 2px 2px 2px #000000;
`
const NotFoundImg = styled.img`
    margin: auto;
    width: 400px;
    height: 400px;
`

class PageNotFound extends React.Component {
  render() {
    return (
      <div style={{textAlign:'center'}}>
        <NotFoundMsg>Page Not Found (Error 404) :(</NotFoundMsg>
        <NotFoundImg src={NotFoundPic} alt="not_found" />
      </div>
    );
  }
}

export default PageNotFound;