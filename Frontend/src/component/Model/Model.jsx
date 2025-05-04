import React, { useState, useEffect } from "react";
import axios from "axios";

const Modal = ({ closeModal, postId }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      // console.log("user", user._id)
      setUserId(user._id);
      console.log("setUserId", setUserId)

      


    }
    fetchComments();
  }, [postId]);


  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/comment/GetComment?PostId=${postId}`);
      setComments(response.data.comments || []);
      console.log(response.data.comments)
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmitComment = async () => {
    if (!commentText.trim()) return;
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("You must be logged in to comment.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/comment/AddComment",
        {  PostId: postId, comment: commentText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComments((prevComments) => [response.data.comment, ...prevComments]);
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-96 p-4 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>

        <div className="space-y-4 max-h-60 overflow-auto">
          {comments.length > 0 ? comments.map((comment) => (
            <div key={comment._id} className="p-2 border-b border-gray-200">
              <span className="font-semibold">{comment.userId?.username || "Unknown"}</span>
              <p className="text-sm text-gray-600">{comment.comment}</p>
            </div>
          )) : <p className="text-gray-500 text-center">No comments yet.</p>}
        </div>

        <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} rows="3" placeholder="Add a comment..." className="w-full p-2 border rounded-md"></textarea>

        <div className="flex justify-end mt-4">
          <button onClick={handleSubmitComment} className="px-4 py-2 bg-blue-500 text-white rounded-md" disabled={loading}>{loading ? "Posting..." : "Submit"}</button>
          <button onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded-md">Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
