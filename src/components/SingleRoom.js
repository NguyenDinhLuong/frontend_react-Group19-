import React from "react";
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import Room from "./Room";
import { Link } from "react-router-dom";
import axiosInstance from "../axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import defaultImg from "../images/room-1.jpeg";


export default function ListRoom() {
    const [appState, setAppState] = useState({
		customer: null,
	});

	useEffect(() => {
		axiosInstance.get('user/customer/').then((res) => {
			const customerDetail = res.data;
			setAppState({customer: customerDetail});
			console.log(res.data);
		});
	}, [setAppState]);
    
	let bookingButton;

    if(appState.customer != null) {
        bookingButton = <Button
        href="#"
        color="primary"
        variant="outlined"
        component={NavLink}
        to= ''>
            Book Room
        </Button>
    } else {
        bookingButton = null;
    }

    return (
        <>
        <section className="single-room">
        <div className="single-room-info">
          <article className="desc">
            <h3>Room Details</h3>
          </article>
          <article className="info">
            <h3>Info</h3>
          </article>
        </div>
        </section>
        <section className="room-extras">
        {bookingButton}
        </section>
        </>
    );
};