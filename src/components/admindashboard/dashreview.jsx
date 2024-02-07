import React from "react";
import Dashnavbar from "./dashnavbar";
import Sidebar from "./dashsidebar";
import ProgressBar from 'react-bootstrap/ProgressBar';
import userimage from '../../assets/userimage.jpg';

function Dashreview() {
  // Dummy data for reviews and comments
  const reviews = [
    { id: 1, plumberName: "Jone Doe", review: "Great service!", rating: 4, comments: ["Excellent job!", "Very satisfied"] },
    // Add more reviews as needed
  ];

  return (
    <>
      <Dashnavbar />
      <div className="container-fluid" style={{ backgroundColor: 'rgb(248, 248, 248)', width: '100%', height: '100vh' }}>
        <div className="row dash_row">
          <div className="col-3 col_corr_2">
            <Sidebar />
          </div>
          <div className="col-9 col_corr_1">
            <div className="dashmain">
              <div className="table-container">
                <table className="table table-bordered mt-3">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Plumber Image</th>
                      <th scope="col">Plumber Name</th>
                      <th scope="col">Review</th>
                      <th scope="col">Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((review, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td><img src={userimage} alt="Plumber" /></td>
                        <td>{review.plumberName}</td>
                        <td className="review-cell">
                          {/* Display review and rating */}
                          <div>
                            {review.review}
                            <ProgressBar now={review.rating * 20} label={`${review.rating * 20}%`} />
                          </div>
                        </td>
                        <td className="comment-cell">
                          {/* Display comments */}
                          <ul className="comment-list">
                            {review.comments.map((comment, commentIndex) => (
                              <li key={commentIndex}>{comment}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashreview;