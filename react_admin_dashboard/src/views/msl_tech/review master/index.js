import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const ReviewMaster = ({ practiceId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Fetching reviews for Practice ID:", practiceId);

        const fetchReviews = async () => {
            try {
                if (!practiceId) {
                    setError('Practice ID is missing.');
                    setLoading(false);
                    return;
                }
                const response = await axios.get(`${BASE_URL}/reviews/${practiceId}`);
                setReviews(response.data.data);
                console.log("Fetched reviews:", response.data.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching reviews');
                setLoading(false);
            }
        };

        fetchReviews();
    }, [practiceId]);

    const handleDelete = async (recordId) => {
        try {
            await axios.delete(`${BASE_URL}/reviews/${recordId}`);
            setReviews(reviews.filter(review => review.record_id !== recordId));
        } catch (error) {
            setError('Error deleting review');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Reviews</h1>
            {reviews.length === 0 ? (
                <p>No reviews available.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Comment</th>
                            <th>Rating</th>
                            <th>User ID</th>
                            <th>Created At</th>
                            <th>Modified At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map(review => (
                            <tr key={review.record_id}>
                                <td>{review.record_id}</td>
                                <td>{review.name}</td>
                                <td>{review.comment}</td>
                                <td>{review.rating}</td>
                                <td>{review.user_id}</td>
                                <td>{new Date(review.created_at).toLocaleString()}</td>
                                <td>{new Date(review.modified_at).toLocaleString()}</td>
                                <td>
                                    <button onClick={() => handleDelete(review.record_id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ReviewMaster;
