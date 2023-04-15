import React from "react";
import "./MyGigs.scss";
import { Link } from "react-router-dom";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const MyGigs = () => {
    // const currentUser = {
    //     id: 1,
    //     username: "Anna",
    //     isSeller: true,
    // };
    const currentUser = getCurrentUser();

    const queryClient = useQueryClient();

    const { isLoading, error, data } = useQuery({
        queryKey: ["myGigs"],
        queryFn: () =>
            newRequest.get(`/api/gigs?userId=${currentUser._id}`).then((res) => {
                return res.data;
            }),
    });

    const mutation = useMutation({
        mutationFn: (id) => {
            return newRequest.delete(`/api/gigs/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["myGigs"]);
        },
    });
    
    const handleDelete = (id) => {
        mutation.mutate(id);
    };

    // console.log(data);

    return (
        <div className="myGigs">
            {isLoading ? (
                "loading"
            ) : error ? (
                "error"
            ) : (
                <div className="container">
                    <div className="title">
                        <h1>Gigs</h1>
                        {currentUser.isSeller && (
                        <Link to="/add">
                            <button>Add New Gig</button>
                        </Link>
                        )}
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Price</th>
                                <th>Sales</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((gig) => (
                                <tr key={gig._id}>
                                    <td>
                                        <img className="image" src={gig.cover} alt="" />
                                    </td>
                                    <td>{gig.title}</td>
                                    <td>{gig.price}</td>
                                    <td>{gig.sales}</td>
                                    <td>
                                        <img
                                            className="delete"
                                            src="./img/delete.png"
                                            alt=""
                                            onClick={() => handleDelete(gig._id)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

    // return (
    //     <div className="myGigs">
    //         <div className="container">
    //             <div className="title">
    //                 <h1>{currentUser.isSeller ? "Gigs" : "Orders"}</h1>
    //                 {currentUser.isSeller && (
    //                     <Link to="/add">
    //                         <button>Add New Gig</button>
    //                     </Link>
    //                 )}
    //             </div>
    //             <table>
    //                 <tr>
    //                     <th>Image</th>
    //                     <th>Title</th>
    //                     <th>Price</th>
    //                     <th>Sales</th>
    //                     <th>Action</th>
    //                 </tr>
    //                 <tr>
    //                     <td>
    //                         <img
    //                             className="image"
    //                             src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
    //                             alt=""
    //                         />
    //                     </td>
    //                     <td>Stunning concept art</td>
    //                     <td>59.<sup>99</sup></td>
    //                     <td>13</td>
    //                     <td>
    //                         <img className="delete" src="./img/delete.png" alt="" />
    //                     </td>
    //                 </tr>
    //                 <tr>
    //                 <td>
    //                     <img
    //                         className="image"
    //                         src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
    //                         alt=""
    //                     />
    //                     </td>
    //                     <td>Ai generated concept art</td>
    //                     <td>120.<sup>99</sup></td>
    //                     <td>41</td>
    //                     <td>
    //                         <img className="delete" src="./img/delete.png" alt="" />
    //                     </td>
    //                 </tr>
    //                 <tr>
    //                     <td>
    //                         <img
    //                             className="image"
    //                             src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
    //                             alt=""
    //                         />
    //                     </td>
    //                     <td>High quality digital character</td>
    //                     <td>79.<sup>99</sup></td>
    //                     <td>55</td>
    //                     <td>
    //                         <img className="delete" src="./img/delete.png" alt="" />
    //                     </td>
    //                 </tr>
    //                 <tr>
    //                     <td>
    //                         <img
    //                             className="image"
    //                             src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
    //                             alt=""
    //                         />
    //                     </td>
    //                     <td>Illustration hyper realistic painting</td>
    //                     <td>119.<sup>99</sup></td>
    //                     <td>29</td>
    //                     <td>
    //                         <img className="delete" src="./img/delete.png" alt="" />
    //                     </td>
    //                 </tr>
    //                 <tr>
    //                     <td>
    //                         <img
    //                             className="image"
    //                             src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
    //                             alt=""
    //                         />
    //                     </td>
    //                     <td>Original ai generated digital art</td>
    //                     <td>59.<sup>99</sup></td>
    //                     <td>34</td>
    //                     <td>
    //                         <img className="delete" src="./img/delete.png" alt="" />
    //                     </td>
    //                 </tr>
    //                 <tr>
    //                     <td>
    //                         <img
    //                             className="image"
    //                             src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
    //                             alt=""
    //                         />
    //                     </td>
    //                     <td>Text based ai generated art</td>
    //                     <td>110.<sup>99</sup></td>
    //                     <td>16</td>
    //                     <td>
    //                         <img className="delete" src="./img/delete.png" alt="" />
    //                     </td>
    //                 </tr>
    //             </table>
    //         </div>
    //     </div>
    // );
};

export default MyGigs;