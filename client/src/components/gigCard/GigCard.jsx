import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import Loader from "../loader/Loader";
import "./GigCard.scss";

const GigCard = ({ item }) => {
    const { isLoading, error, data } = useQuery({
        queryKey: [item.userId],
        queryFn: () =>
            newRequest.get(`/api/users/${item.userId}`).then((res) => {
                return res.data;
            }),
    });

    // const starCount =  !isNaN(item.totalStars / item.starNumber) && Math.round(item.totalStars / item.starNumber);

    return (
        <Link to={`/gig/${item._id}`} className="link">
            <div className="gigCard">
                <img src={item.cover} alt="" />
                <div className="info">
                    {isLoading ? (
                        <Loader />
                    ) : error ? (
                        "Something went wrong!"
                    ) : (
                        <div className="user">
                            <img src={data.img || "/img/noavatar.jpg"} alt="" />
                            <span>{data.username}</span>
                        </div>
                    )}
                    <p>
                        {item.desc.substring(0,(item.desc + " ").lastIndexOf(" ",80))}
                        {item.desc.length>=80 && "..."}
                    </p>
                    {/* <div className="star">
                        {[...Array(starCount)].map((e,i)=>(
                            <img src="./img/star.png" alt="" key={i} />
                        ))}
                        <span>
                            {starCount}
                        </span>
                    </div> */}
                    {!isNaN(item.totalStars / item.starNumber) && (
                        <div className="star">
                            {Array(Math.round(item.totalStars / item.starNumber))
                                .fill()
                                .map((item, i) => (
                                    <img src="/img/star.png" alt="" key={i} />
                            ))}
                            <span>{Math.round(item.totalStars / item.starNumber)}</span>
                        </div>
                    )}
                </div>
                <hr />
                <div className="detail">
                    <img src="./img/heart.png" alt="" />
                    <div className="price">
                        <span>STARTING AT</span>
                        <h2>
                            $ {item.price}
                            <sup>99</sup>
                        </h2>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default GigCard;