import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ID } from "appwrite"; 
import "./PostForm.css"

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.user);

    // Slug auto-transform function
    const slugTransform = useCallback((value) => {
        if (!value) return "";
        return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s+/g, "-");
    }, []);

    // Update slug dynamically when title changes
    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                const newSlug = slugTransform(value.title);
                setValue("slug", newSlug, { shouldValidate: true });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const submit = async (data) => {
        if (!userData) {
            console.error("User not logged in!");
            return;
        }

        try {
            // Handle file upload
            let fileId = post?.featuredImage || null;
            if (data.image && data.image.length > 0) {
                const uploadedFile = await appwriteService.uploadFile(data.image[0]);
                if (uploadedFile) {
                    if (post?.featuredImage) await appwriteService.deleteFile(post.featuredImage);
                    fileId = uploadedFile.$id;
                }
            }

            const payload = {
                title: data.title,
                slug: data.slug,
                content: data.content,
                status: data.status,
                featuredImage: fileId,
                userId: userData.$id,
            };

          let dbPost;
if (post?.$id) {
    // Update existing post
    dbPost = await appwriteService.updatePost(post.$id, payload);
} else {
    // Create new post ✅ ID.unique() ab config.js me generate ho rahi hai
    dbPost = await appwriteService.createPost(payload);
}
            console.log("Post saved:", dbPost);
            if (dbPost) navigate("/all-posts");
        } catch (err) {
            console.error("Error saving post:", err);
        }
    };

    return (
    <form onSubmit={handleSubmit(submit)} className="post-form">
  <div className="post-form-left">
    <Input
      label="Title :"
      placeholder="Title"
      className="post-input"
      {...register("title", { required: true })}
    />

    <Input
      label="Slug :"
      placeholder="Slug"
      className="post-input"
      {...register("slug", { required: true })}
      onInput={(e) =>
        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
      }
    />

    <RTE
      label="Content :"
      name="content"
      control={control}
      defaultValue={getValues("content")}
    />
  </div>

  <div className="post-form-right">
    <Input
      label="Featured Image :"
      type="file"
      className="post-input"
      accept="image/png, image/jpg, image/jpeg, image/gif"
      {...register("image", { required: !post })}
    />
    {post?.featuredImage && (
      <div className="post-image-preview">
        <img
          src={appwriteService.getFileUrl(post.featuredImage)}
          alt={post.title}
        />
      </div>
    )}

    <Select
      options={["active", "inactive"]}
      label="Status"
      className="post-select"
      {...register("status", { required: true })}
    />

    <Button type="submit" className="post-button" bgColor={post ? "bg-green-500" : undefined}>
      {post ? "Update" : "Submit"}
    </Button>
  </div>
</form>

    );
}
