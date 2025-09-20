import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components'
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.user); // ✅ Redux se user

  useEffect(() => {
    if (!userData) return; // Agar login nahi to fetch na karo
    appwriteService.getPosts().then((posts) => {
      console.log("Posts fetched:", posts);
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, [userData]);

  // ✅ Agar user login nahi hai
  if (!userData) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <h1 className="text-2xl font-bold hover:text-gray-500">
            Please Login to Read Posts
          </h1>
        </Container>
      </div>
    );
  }

  // ✅ Agar user login hai aur posts 0 hain
  if (userData && posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <h1 className="text-2xl font-bold hover:text-gray-500">
            No posts available yet
          </h1>
        </Container>
      </div>
    );
  }

  // ✅ Agar user login hai aur posts hain
  return (
    <div className="py-8">
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

export default Home;
