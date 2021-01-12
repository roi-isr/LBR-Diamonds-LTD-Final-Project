import React from 'react';
import '../css/VirtualStore.css';
import styled from 'styled-components/macro';
import DiamondIcon from '../../../Assets/virtual_store_icons/diamond.png'
import PackageIcon from '../../../Assets/virtual_store_icons/package.png'
import ItemsLayout from './ItemsLayout'


const NavBtn = styled.button`
  margin: auto;
  width: 50%;
  height: 50%;
  font-size: 40px;
  background-color:palegreen;
  margin-bottom: 25%;
  @media (max-width: 910px){
    width:100%; 
    margin-bottom: 0%;
    margin-top: 3%;
  }
  `;

const VsIcons = styled.img`
  height: 100px;
  width: 100px;
  float: left;
`;

function StoreNav(props) {
  const verticalLine =
    <div className="vertical-line-vs" />
  const navItems = [
    { name: 'Packages', icon: PackageIcon },
    { name: 'Documented Stones', icon: DiamondIcon }
  ];
  return (
    <div className="selection-vs">
      {navItems.map((item, index) =>
        <NavBtn
          key={index}
          onClick={(index) => props.applyLayout(index)}>
          {item.name}
          <VsIcons src={item.icon} />
        </NavBtn>
      )}
    </div>
  );
}

class VirtualStore extends React.Component {
  constructor() {
    super();
    this.state = {
      layout: ""
    }
  }
  applyLayout = (index) => {
    this.setState({ layout: "Packages" });
  }

  renderContent = () => {
    if (this.state.layout === "")
      return <StoreNav applyLayout={this.applyLayout} />;
    else if (this.state.layout === "Packages")
      return <ItemsLayout />;
  }
  render() {
    return (
      this.renderContent()
    );
  }
}

export default VirtualStore;