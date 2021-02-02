import React, { Component } from "react";
import { Table } from 'react-bootstrap';
import '../css/ManagementTable.css'
function ManagementTable({ headers, content }) {
    return (
        <div className="man-table-wrapper">
            <Table dir="rtl" style={{ textAlign: 'right' }} striped bordered hover>
                <thead>
                    <tr>
                        {headers.map((item, index) => <th>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {content.map((row, index) =>
                        <tr>
                            {row.map((data, index) =>
                                <td>{data}</td>
                            )}
                        </tr>)}
                </tbody>
            </Table >
        </div>
    );
}
export default ManagementTable;
