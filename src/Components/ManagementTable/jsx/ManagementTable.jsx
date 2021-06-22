import React, { useState, useEffect } from "react";
import SortIcon from '@material-ui/icons/Sort';
import { Table } from 'react-bootstrap';
import '../css/ManagementTable.css'
import {
    sorter as sorterFunc,
    convertDateFormat,
    convertShortenDateFormat,
    convertRangeDateFormat,
    convertRangeShortenDateFormat
} from '../Utility';
import { set_search_bar_visible, update_search_str } from '../../../store/actions/index';
import { connect } from 'react-redux';
import styled from 'styled-components/macro'

const StoreCustomTitle = styled.h1`
    position: -webkit-sticky;
    position: sticky;
    left:0;
    top:0;
    text-align: center;
    font-size: 50px;
    text-shadow: 1px 1px 3px #111;
    background-image: linear-gradient(to bottom right, #F8F8FF, #DCDCDC, #ADD8E6);
    margin-bottom: 0px;
    border: 4px double black;
`;

const OffersCounterTd = styled.td`
    font-size: 35px;
    font-weight: bold;
    color: rgb(${props => (+props.curItem) * 25},0,${props => 255 - ((+props.curItem) * 25)});
    `;

function ManagementTable({ title, headers, content, direction = 'rtl',
    searchStr, setSearchVisible, cleanSearch }) {
    const [shownContent, setShownContent] = useState([...content]);
    const [orderColumn, setOrderColumn] = useState("");

    useEffect(() => {
        setSearchVisible(true);
        return () => {
            setSearchVisible(false);
            cleanSearch();
        };
    }, [cleanSearch, setSearchVisible]);

    useEffect(() => {
        if (searchStr === '') {
            // Show all content
            setShownContent(content);
            return;
        }

        const dateIfDate = convertDateFormat(searchStr);

        const dateIfShortenDate = convertShortenDateFormat(searchStr);

        const dateIsDateRange = convertRangeDateFormat(searchStr);

        const dateIsShortenDateRange = convertRangeShortenDateFormat(searchStr);

        // Filter content by search criterea
        const filteredContent = content.filter(record => {
            return record.reduce((acc, cur) =>
                acc === true ||
                (typeof cur === 'string' && (new RegExp(searchStr, 'i')).test(cur)) ||
                cur === +searchStr ||
                (!isNaN(new Date(cur)) &&
                    ((dateIfDate &&
                        (new Date(cur).getTime() - dateIfDate.getTime()) <= 24 * 60 * 60 * 1000 &&
                        (new Date(cur).getTime() - dateIfDate.getTime()) >= 0) ||
                        (dateIfShortenDate &&
                            new Date(cur).getMonth() === dateIfShortenDate.getMonth() &&
                            new Date(cur).getFullYear() === dateIfShortenDate.getFullYear()) ||
                        (dateIsDateRange &&
                            (new Date(cur).getTime() - dateIsDateRange[1].getTime()) <= 24 * 60 * 60 * 1000 &&
                            (new Date(cur).getTime() - dateIsDateRange[0].getTime()) >= 0) ||
                        (dateIsShortenDateRange &&
                            new Date(cur).getMonth() >= dateIsShortenDateRange[0].getMonth() &&
                            new Date(cur).getFullYear() >= dateIsShortenDateRange[0].getFullYear() &&
                            new Date(cur).getMonth() <= dateIsShortenDateRange[1].getMonth() &&
                            new Date(cur).getFullYear() <= dateIsShortenDateRange[1].getFullYear())
                    ))
                , false
            );
        });
        setShownContent(filteredContent);
    }, [searchStr, content]);

    // Sort table in ASC or DESC order
    const sortTable = (ind) => {
        let order;
        if (orderColumn === "") {
            order = 'ASC';
            setOrderColumn(`${ind}-ASC`);
        }
        else {
            const splittedOrder = orderColumn.split('-');
            if (parseInt(splittedOrder[0]) === ind && splittedOrder[1] === 'ASC') {
                order = 'DESC';
                setOrderColumn(`${ind}-DESC`);
            }
            else {
                order = 'ASC';
                setOrderColumn(`${ind}-ASC`);
            }
        }
        sorterFunc(ind, order, shownContent, setShownContent)
    }

    const isInt = (number) => {
        return number % 1 === 0;
    }

    const shownContentTable = shownContent.map((row, index) =>
        <tr
            className='align-middle'
            key={Math.random() * index}>
            {row.map((item, idx) => {
                let renderTd;
                if (headers[idx] === "כמות פניות") {
                    renderTd = (
                        <OffersCounterTd
                            className="align-middle"
                            key={Math.random() * idx}
                            curItem={item}>
                            {item}
                        </OffersCounterTd>
                    );
                }
                else if (new Date(item) !== 'Invalid Date' &&
                    !isNaN(new Date(item)) &&
                    !item.toString().match(/([A-Za-z]-)+/g) &&
                    isNaN(item)) {
                    const currDate = new Date(item);
                    renderTd = (
                        <td className="align-middle"
                            key={Math.random() * idx}>
                            {`${currDate.getDate()}/${currDate.getMonth() + 1}/${currDate.getFullYear()}`}
                        </td>
                    );
                }
                else if (!isNaN(item)) {
                    let fixedNum = item;
                    if (!isInt(item)) {
                        fixedNum = parseFloat(item).toFixed(2);
                    }
                    renderTd = (
                        <td className="align-middle"
                            key={Math.random() * idx}>
                            {fixedNum}
                        </td>
                    );
                }
                else {
                    renderTd = (
                        <td className="align-middle"
                            key={Math.random() * idx}>
                            {item}
                        </td>
                    );
                }
                return renderTd;
            }
            )}
        </tr>
    );

    return (
        <div className="man-table-wrapper">
            <StoreCustomTitle>
                {title}
            </StoreCustomTitle>

            <Table
                dir={direction}
                style={{ fontSize: '1.2rem', textAlign: 'center' }}
                striped bordered hover>
                <thead>
                    <tr>
                        {headers.map((item, index) =>
                            <th
                                className='align-middle'
                                key={Math.random() * index}>
                                <div className="div-th-man-table">
                                    <span />
                                    {item}
                                    {
                                        item &&
                                        <SortIcon
                                            className="sort-icon-mui"
                                            onClick={() => sortTable(index)}
                                        />
                                    }
                                </div>
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {shownContentTable}
                </tbody>
            </Table >
        </div>
    );
}

const mapStateToPropsNav = (state) => {
    return {
        searchStr: state.searchBar.searchStr
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSearchVisible: (boolVal) => dispatch(set_search_bar_visible(boolVal)),
        cleanSearch: () => dispatch(update_search_str(""))
    }
}

export default connect(mapStateToPropsNav, mapDispatchToProps)(ManagementTable);
