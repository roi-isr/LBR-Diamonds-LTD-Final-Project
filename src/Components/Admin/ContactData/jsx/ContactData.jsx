import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import ManagementTable from '../../../ManagementTable/jsx/ManagementTable';
import { WebCookies } from '../../../../Entities/Cookies';
import Loader from 'react-loader-spinner';
import '../css/ContactData.css';
import { sorter } from '../../../ManagementTable/Utility';
import FormModal from '../../../UI-Elements/Modal/Modal'

const headers = ["שם השולח", "מייל", "טלפון", "זמן יצירת קשר", "", ""];

const showDetailsFieldsMap = new Map();

function ContactData() {
    const [content, setContent] = useState([]);
    const [tableRender, setTableRender] = useState([]);
    const [loading, setLoading] = useState(false);
    const [itemDetailsIndex, setitemDetailsIndex] = useState(false);
    // Fecth data from DB
    useEffect(() => {
        window.cookie_token = new WebCookies().getCookies("tokenStr");
        fetchContact(window.cookie_token);
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
                    variant="outline-success"
                    onClick={() => setitemDetailsIndex(item[4])}>
                    צפה בפרטי הפנייה
                      </Button>;
            const pushArr = item.slice(0, -1);
            pushArr.push(confirmBtn, deleteBtn);
            tempContent.push([...pushArr]);
        })
        setTableRender(tempContent)
    }, [content])

    const fetchContact = (token) => {
        setLoading(true);
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
            renderData(data);
            setLoading(false);
        }
        const onSubmitFail = () => {
            console.log("Failed to fetch contact data from DB");
        }
    }

    // Convert the data fetch for DB into renderable data
    const renderData = (data) => {
        const tempContent = []
        Object.values(data).forEach(contactValues => {
            const subTempContent = [];
            const create_at = contactValues['create_at'];
            subTempContent.push(
                contactValues['name'], contactValues['email'],
                contactValues['phone'], create_at.slice(0, create_at.length - 4),
                contactValues['id']
            );
            tempContent.push(subTempContent);
            showDetailsFieldsMap[contactValues['id']] = [
                { name: "שם השולח", content: contactValues['name'] },
                { name: "מייל", content: contactValues['email'] },
                { name: "טלפון", content: contactValues['phone'] },
                { name: "זמן יצירת קשר", content: create_at.slice(0, create_at.length - 4) },
                { name: "תוכן ההודעה", content: contactValues['content'] }
            ];
            console.log(showDetailsFieldsMap)
        });
        setContent(tempContent);
    }

    const deleteFromUI = (index) => {
        setContent(prevContent => prevContent.filter((item, i) => index !== i));
    }

    const deleteFromDatabase = (deleteId) => {
        fetch(`http://127.0.0.1:5000/contact/${deleteId}`,
            {
                method: 'DELETE',
                headers:
                {
                    'Authorization': `JWT ${window.cookie_token}`
                }
            })
            .then(response => response.json())
            .then(data => onSubmitSuccess(data.message))
            .catch(() => onSubmitFail())

        const onSubmitSuccess = (msg) => {
            console.log(msg);
        }
        const onSubmitFail = () => {
            console.log("Failed to delete contact data from DB");
        }
    }

    // Delete a row from contact table
    const deleteRow = (index) => {
        const con = window.confirm("Are you sure that you want to delete the item?");
        if (!con) {
            return
        }
        deleteFromUI(index);
        const deleteId = content[index][4];
        deleteFromDatabase(deleteId);
    }

    // Returns the table to our requested page.
    return (
        <div className="contact-admin-div">
            {loading ?
                <Loader
                    className="contact-admin-spinner"
                    type='Bars'
                    height={300}
                    width={300}
                    color="SlateBlue"
                /> :
                <ManagementTable
                    headers={headers}
                    content={tableRender}
                    sorter={{
                        sorter,
                        content,
                        setContent
                    }}
                />
            }
            {!loading && itemDetailsIndex &&
                <FormModal
                    fields={showDetailsFieldsMap[itemDetailsIndex]}
                    modalType="info-form"
                    autoShow={true}
                    closeForm={() => setitemDetailsIndex(false)}
                />
            }

        </div>
    );
}

export default ContactData;
