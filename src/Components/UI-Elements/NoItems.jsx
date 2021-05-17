import styled from 'styled-components/macro';

const NoItemsStyle = styled.h1`
    font-size: 7rem;
    text-align: center;
    border: 5px solid #000;
    border-radius: 5px;
    text-shadow: 1px 1px 1px #000;
    background-image: linear-gradient(to right, #F0F8FF, #5F9EA0);
    padding: 30px 0;
    direction: rtl;
    @media (max-width: 990px){
        font-size: 105px;
    }
`;

export default function NoItems() {
    return <NoItemsStyle>לא נמצאו נתונים...</NoItemsStyle>
}
