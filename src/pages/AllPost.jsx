import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { setPosts } from "../store/postSlice";

function AllPosts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await appwriteService.getPosts([]);
      if (res) {
        dispatch(setPosts(res.documents)); // ✅ Redux me store
      }
    };
    fetchPosts();
  }, [dispatch]);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard 
                key={post.$id} 
                {...post} 
                userId={post.userId} 
              />
            ))
          ) : (
            <h2 className="text-center w-full text-xl font-semibold text-gray-500">
              No posts found
            </h2>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
