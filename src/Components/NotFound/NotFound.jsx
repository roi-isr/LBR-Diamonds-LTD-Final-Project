import React from 'react';
import styled from 'styled-components/macro'

const NotFoundMsg = styled.h1`
    text-align: center;
    width: 100%;
    font-size: 250px;
`

class PageNotFound extends React.Component {
  render() {
    return (
      <NotFoundMsg>Error 404 :(</NotFoundMsg>
    );
  }
}

export default PageNotFound;