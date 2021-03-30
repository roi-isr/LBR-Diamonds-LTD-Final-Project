import React, { useState, useEffect } from "react";
import SortIcon from '@material-ui/icons/Sort';
import { Table } from 'react-bootstrap';
import '../css/ManagementTable.css'
import { sorter as sorterFunc } from '../Utility'
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
  background-image: linear-gradient(to bottom right, #F8F8FF, #DCDCDC);
  margin-bottom: 0px;
  border: 0.5px solid black;
`;

function ManagementTable({ title, headers, content, direction = 'rtl', searchStr, setSearchVisible, cleanSearch }) {
    const [shownContent, setShownContent] = useState([...content]);
    const [orderColumn, setOrderColumn] = useState("");

    useEffect(() => {
        setSearchVisible(true);
        return () => {
            setSearchVisible(false);
            cleanSearch();
        };
    }, [setSearchVisible, cleanSearch]);

    useEffect(() => {
        if (searchStr === '') {
            // Show all content
            setShownContent(content);
            return;
        }

        const convertDateFormat = (dateStr) => {
            if (new RegExp('\\d{1,2}/\\d{1,2}/\\d{2,4}').test(dateStr)) {
                const dateSplit = dateStr.split('/');
                return new Date(`${dateSplit[1]}-${dateSplit[0]}-${dateSplit[2]}`)
            }
            else if (!isNaN(new Date(dateStr))) {
                return new Date(dateStr);
            }
            return null;
        }
        const dateIfDate = convertDateFormat(searchStr);
        const filteredContent = content.filter(record => {
            return record.reduce((acc, cur) =>
                acc === true ||
                (typeof cur === 'string' && (new RegExp(searchStr, 'i')).test(cur)) ||
                cur === +searchStr ||
                (!isNaN(new Date(cur)) && dateIfDate &&
                    (new Date(cur).getTime() - dateIfDate.getTime()) <= 24 * 60 * 60 * 1000 &&
                    (new Date(cur).getTime() - dateIfDate.getTime()) >= 0)
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
                    {shownContent.map((row, index) =>
                        <tr
                            className='align-middle'
                            key={Math.random() * index}>
                            {row.map((item, idx) => {
                                let renderTd;
                                if (headers[idx] === "כמות פניות") {
                                    renderTd = (
                                        <td className="align-middle"
                                            key={Math.random() * idx}
                                            style={{ fontSize: '35px', fontWeight: 'bold', color: `rgb(${(+item) * 25},0,${255 - ((+item) * 25)})` }}>
                                            {item}
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
                    )}
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
