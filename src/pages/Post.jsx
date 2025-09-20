import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import "./Post.css"; // ✅ new CSS file

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = async () => {
        if (!post) return;
        const status = await appwriteService.deletePost(post.$id);
        if (status) {
            if (post.featuredImage) await appwriteService.deleteFile(post.featuredImage);
            navigate("/");
        }
    };

    const imageUrl = post?.featuredImage ? appwriteService.getFileUrl(post.featuredImage) : null;

    return post ? (
        <div className="post-wrapper">
            <Container>
                <div className="post-image-section">
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt={post.title}
                            className="post-image"
                        />
                    )}

                    {isAuthor && (
                        <div className="post-actions">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="post-title">
                    <h1>{post.title}</h1>
                </div>
                <div className="post-content browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
