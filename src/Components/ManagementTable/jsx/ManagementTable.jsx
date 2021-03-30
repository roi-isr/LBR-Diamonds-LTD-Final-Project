import React, { useState, useEffect } from "react";
import SortIcon from '@material-ui/icons/Sort';
import { Table } from 'react-bootstrap';
import '../css/ManagementTable.css'
import { sorter as sorterFunc } from '../Utility'
import { set_search_bar_visible, update_search_str } from '../../../store/actions/index';
import { connect } from 'react-redux';


function ManagementTable({ headers, content, direction = 'rtl', searchStr, setSearchVisible, cleanSearch }) {
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
        const filteredContent = content.filter(record => {
            return record.reduce((acc, cur) => acc === true || (typeof cur === 'string' && (new RegExp(searchStr)).test(cur)) || cur === +searchStr, false);
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
            <Table dir={direction}
                style={{ fontSize: '1.2rem', textAlign: 'center' }}
                striped bordered hover>
                <thead>
                    <tr>
                        {headers.map((item, index) =>
                            <th
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
                            key={Math.random() * index}>
                            {row.map((item, idx) =>
                                <td className="align-middle"
                                    key={Math.random() * idx}>
                                    {item}
                                </td>
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
