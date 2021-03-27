import React from 'react';
import '../css/VirtualStore.css';
import ItemsLayout from './ItemsLayout'
import styled from 'styled-components/macro'

const StoreCustomTitle = styled.h1`
  text-align: center;
  font-size: 50px;
  background-color: #f5f5f5;
  border: 0.1px solid black;
`

function VirtualStore() {
  return (
    <React.Fragment>
      <StoreCustomTitle>Virtual store</StoreCustomTitle>
      <ItemsLayout />
    </React.Fragment>
  );
}

export default VirtualStore;