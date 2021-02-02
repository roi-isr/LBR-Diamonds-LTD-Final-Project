import React, { Component, useEffect } from "react";
import { Table } from 'react-bootstrap';
import '../css/ManagementTable.css'

function ManagementTable({ headers, content }) {
    return (
        <div className="man-table-wrapper">
            <Table dir="rtl" style={{ textAlign: 'right' }} striped bordered hover>
                <thead>
                    <tr>
                        {headers.map((item, index) => <th key={Math.random() * index}>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(content).map(key =>
                        <tr>
                            {(content[key]).map((_, ind) =>
                                <td>{content[key][ind]}</td>
                            )}
                        </tr>)}
                </tbody>
            </Table >
        </div>
    );
}
export default ManagementTable;
