import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button'
import ManagementTable from '../../../ManagementTable/jsx/ManagementTable'
import { WebCookies } from '../../../../Entities/Cookies'


const headers = ["שם השולח", "מייל", "טלפון", "זמן יצירת קשר", ""];

function ContactData() {
    const [content, setContent] = useState([[], []]);
    const [tableRender, setTableRender] = useState([]);

    // Fecth data from DB
    useEffect(() => {
        const cookie_token = new WebCookies("tokenStr").getCookies();
        fetchContact(cookie_token);
    }, []);

    useEffect(() => {
        let tempContent = [];
        content.forEach((item, index) => {
            const deleteBtn =
                <Button
                    key={Math.random() * index}
                    onClick={() => deleteRow(index)}
                    variant="outline-danger">
                    הסר
                </Button>;

            const confirmBtn =
                <Button
                    key={Math.random() * index}
                    variant="outline-success">
                    אישור הגעה
                      </Button>;

            tempContent.push([...item, deleteBtn, confirmBtn]);
        })
        setTableRender(tempContent)
    }, [content])

    const fetchContact = (token) => {
        fetch("http://127.0.0.1:5000/contacts",
            {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${token}`
                }
            })
            .then(response => response.json())
            .then(data => onSubmitSuccess(data))
            .catch(() => onSubmitFail())
        const onSubmitSuccess = (data) => {
            renderData(data)
        }
        const onSubmitFail = () => {
            console.log("Failed to fetch contact data from DB");
        }

    }

    const renderData = (data) => {
        const tempContent = []
        Object.values(data).forEach(contactValues => {
            const subTempContent = [];
            subTempContent.push(contactValues['name'], contactValues['email'],
                contactValues['phone'], contactValues['create_at']);
            tempContent.push(subTempContent);
        });
        setContent(tempContent);
    }

    const deleteRow = (index) => {
        const con = window.confirm("Are you sure that you want to delete the item?");
        if (!con) {
            return
        }
        setContent(prevContent => prevContent.filter((item, i) => index != i));
    }
    //Returns the table to our requested page.
    return (
        <React.Fragment>
            <ManagementTable headers={headers} content={tableRender} />
        </React.Fragment>

    );
}
export default ContactData;
