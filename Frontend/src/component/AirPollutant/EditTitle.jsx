import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditTitle = () => {
  const { chat_id } = useParams();
  const [chat, setChat] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChatDetail = async () => {
      try {
        const response = await fetch(`http://your-backend-url/api/history/${chat_id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch chat details');
        }

        const data = await response.json();
        setChat(data);
        setNewTitle(data.title || '');
      } catch (error) {
        console.error('Error:', error);
        navigate('/chat_history');
      }
    };

    fetchChatDetail();
  }, [chat_id, navigate]);

  const handleSaveTitle = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://your-backend-url/api/history/${chat_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ title: newTitle }),
      });

      if (!response.ok) {
        throw new Error('Failed to update title');
      }

      navigate(`/history/${chat_id}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this chat?')) return;

    try {
      const response = await fetch(`http://your-backend-url/api/history/${chat_id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete chat');
      }

      navigate('/chat_history');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!chat) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="chat-detail-container max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Chat Title
        </h2>
        <div className="chat-detail-box bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Current Title: {chat.title || 'No Title'}
          </h3>
          <p className="mb-2 text-gray-600">
            <strong>Your Query:</strong> {chat.user_input}
          </p>
          <p className="mb-2 text-gray-600">
            <strong>Bot Response:</strong>{' '}
            <span
              className="bot-response"
              dangerouslySetInnerHTML={{ __html: chat.bot_response }}
            />
          </p>
          <p className="mb-4 text-gray-600">
            <strong>Time:</strong>{' '}
            {new Date(chat.timestamp).toLocaleString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
          </p>

          <form onSubmit={handleSaveTitle} className="mb-6">
            <label htmlFor="title" className="block text-gray-700 mb-2">
              Enter New Title:
            </label>
            <input
              type="text"
              name="title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter new title"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-3"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Save Title
            </button>
          </form>

          <div className="buttons flex gap-3 justify-center">
            <a
              href={`/history/${chat_id}`}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Back to Chat
            </a>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTitle;