import React, { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import './Contact.css'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import styled from 'styled-components/macro'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Button } from 'react-bootstrap';


const MapWrapper = styled.div`
    position: relative
    width: 100%;
    height: 100%;
    grid-row:1;
    grid-column: 2 / -1;
    z-index: 0;
`

const MapDisplay = () => {
    const [position, setPosition] = useState([32.08356032537613, 34.80143183635717]);
    var map = null;
    const markerIcon = L.icon
        ({
            iconUrl: icon,
            iconSize: [25, 40]
        });
    // useEffect(()=>{
    // const map = L.map("map-layout").setView(position,13);
    //     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map)
    //     L.marker(position,{icon:markerIcon}).addTo(map)
    // },[])
    useEffect(() => {
        if (map)
            map.setView(position)
    }, [position])

    const getBackToCenter = () => {
        setPosition([32.08356032537613, 34.80143183635717]);
    }
    const MapFeatures = () => {
        map = useMap();
        return null;
    }
    return (
        <React.Fragment>
            <MapWrapper>
                <MapContainer className="map-container-css" center={position} zoom={15} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position} icon={markerIcon}>
                        <Popup>
                            בורסת היהלומים רמת גן
                          </Popup>
                    </Marker>
                    <MapFeatures />
                </MapContainer>
                {/* <div id="map" style={{width:"500px",height:"415px"}}></div> */}
            </MapWrapper>
            <button
                className="home-btn"
                onClick={getBackToCenter}>
                H
              </button>
        </React.Fragment>
    );

}

const ContactForm = () => {
    return (
        <div className="contact-form-div">
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="textarea" placeholder="Your name" />
                </Form.Group>
                <Form.Group controlId="num">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="Number" placeholder="054-345673" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
            </Form>
        </div>
    );
}

const Contact = () => {
    return (
        <div className="contact-div">
            <ContactForm />
            <span className="div-seperator" />
            <MapDisplay />
        </div>
    );
}

export default Contact;