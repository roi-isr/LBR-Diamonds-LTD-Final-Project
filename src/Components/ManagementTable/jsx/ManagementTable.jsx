import React, { useState } from "react";
import SortIcon from '@material-ui/icons/Sort';
import { Table } from 'react-bootstrap';
import '../css/ManagementTable.css'

function ManagementTable({ headers, content, sorter }) {
    const { sorter: sorterFunc, content: pureContent, setContent } = sorter;
    const [orderColumn, setOrderColumn] = useState("");

    // Sort table in ASC or DESC order
    const sortTable = (index) => {
        let order;
        if (orderColumn === "") {
            order = 'ASC';
            setOrderColumn(`${index}-ASC`);
        }
        else {
            const splittedOrder = orderColumn.split('-');
            if (parseInt(splittedOrder[0]) === index && splittedOrder[1] === 'ASC') {
                order = 'DESC';
                setOrderColumn(`${index}-DESC`);
            }
            else {
                order = 'ASC';
                setOrderColumn(`${index}-ASC`);
            }

        }
        sorterFunc(index, order, pureContent, setContent)
    }
    return (
        <div className="man-table-wrapper">
            <Table dir="rtl"
                style={{ textAlign: 'right', fontSize: '1.2rem', textAlign: 'center' }}
                striped bordered hover
            >
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
                    {content.map((row, index) =>
                        <tr
                            key={Math.random() * index}>
                            {row.map((item, idx) =>
                                <td
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
export default ManagementTable;
