import React from 'react'
import appwriteService from "../appwrite/config"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaEdit, FaTrash } from 'react-icons/fa'; 
import "./PostCrad.css"; // 👈 import CSS

function PostCard({ $id, title, featuredImage, userId }) {
  const navigate = useNavigate()
  const currentUser = useSelector(state => state.auth.user)

  const handleDelete = async () => {
    try {
      await appwriteService.deletePost($id)
      alert("Post deleted successfully")
      navigate(0)
    } catch (err) {
      console.error("Error deleting post:", err)
    }
  }

  const imageUrl = featuredImage ? appwriteService.getFileUrl(featuredImage) : null

  return (
    <div className="post-card">
      <Link to={`/post/${$id}`} className="flex-1">
        {imageUrl && (
          <div className="post-card-image">
            <img src={imageUrl} alt={title} />
          </div>
        )}
        <h2 className="post-card-title">{title}</h2>
      </Link>

      {currentUser && currentUser.$id === userId && (
        <div className="post-card-actions">
          <button
            className="post-card-btn edit"
            onClick={() => navigate(`/edit-post/${$id}`)}
          >
            <FaEdit className="mr-1" />
          </button>

          <button
            className="post-card-btn delete"
            onClick={handleDelete}
          >
            <FaTrash className="mr-1" /> 
          </button>
        </div>
      )}
    </div>
  )
}

export default PostCard
