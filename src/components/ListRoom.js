import React from "react";
import Room from "./Room";
import { Link } from "react-router-dom";
import axiosInstance from "../axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import defaultImg from "../images/room-1.jpeg";


export default function ListRoom() {
    const { id } = useParams();

	const [data, setData] = useState({ rooms: [] });

    useEffect(() => {
		axiosInstance.get('/hotel/'+id+'/').then((res) => {
			setData({ rooms: res.data });
			console.log(res.data);
		});
	}, [setData]);
    if (data.rooms.length === 0) {
        return (
            <div className="empty-search">
                <h3>Your search does not have any matches</h3>
            </div>
        );
    }
    return (
    <section className="roomslist">
        <div className="roomslist-center">
            {data.rooms.map(room => 
                <article className="room">
                <div className="img-container">
                    <img src={defaultImg} alt="single room" />
                    <div className="price-top">
                        <h6>${room.price}</h6>
                        <p>per night</p>
                    </div>
                    <Link to={'/room/'+room.id} className="btn-primary room-link">
                        features
                    </Link>
                </div>
                <p className="room-info">{room.name}</p>
              </article>
            )}
        </div>
    </section>
    );
};