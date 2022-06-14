import { LinkIcon, PhotographIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Avatar from "./Avatar";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { ADD_POST, ADD_SUBREDDIT } from "../graphql/mutations";
import client from "../apollo-client";
import { GET_ALL_POST, GET_SUBREDDIT_BY_TOPIC } from "../graphql/queries";
import toast from "react-hot-toast";

interface FormData {
  postTitle: string;
  postImage: string;
  postBody: string;
  subreddit: string;
}

type Props = {
  subreddit?: string;
};

function PostBox({ subreddit }: Props) {
  const { data: session } = useSession();
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [GET_ALL_POST, "getPostList"],
  });
  const [addSubreddit] = useMutation(ADD_SUBREDDIT);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);
    const notification = toast.loading("Creating a new post...");
    try {
      // Query for the subreddit topic
      const {
        data: { getSubredditListByTopic },
      } = await client.query({
        query: GET_SUBREDDIT_BY_TOPIC,
        variables: {
          topic: subreddit || formData.subreddit,
        },
      });

      const subredditExist = getSubredditListByTopic.length > 0;
      console.log("subreddit ", subredditExist);
      if (!subredditExist) {
        // create subreddit
        console.log("creating a new subreddit");

        const {
          data: { insertSubreddit: newSubreddit },
        } = await addSubreddit({
          variables: {
            topic: formData.subreddit,
          },
        });
        console.log("Creating a post..", formData);

        const image = formData.postImage || "";

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: newSubreddit.id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });

        console.log("New Post added, ", newPost);
      } else {
        // use existing subreddit
        console.log("using existing subreddit", getSubredditListByTopic);
        const image = formData.postImage || "";

        const {
          data: { insertPost: newPost },
        } = await addPost({
          variables: {
            body: formData.postBody,
            image: image,
            subreddit_id: getSubredditListByTopic[0].id,
            title: formData.postTitle,
            username: session?.user?.name,
          },
        });

        console.log("New post added with existing subreddit ", newPost);
      }

      // After the post has been added!!
      setValue("postBody", "");
      setValue("postTitle", "");
      setValue("postImage", "");
      setValue("subreddit", "");
      toast.success("New Post Created!", {
        id: notification,
      });
    } catch (error) {
      toast.error("Oops Something went wrong!", {
        id: notification,
      });
    }
  });

  const [imageBox, setImageBox] = useState(false);

  return (
    <form
      onSubmit={onSubmit}
      className="sticky top-16 z-50 bg-white border rounded-md border-gray-300 p-2"
    >
      <div className="flex items-center space-x-3">
        <Avatar seed="bawa" />
        <input
          {...register("postTitle", { required: true })}
          type="text"
          className="bg-gray-50 p-2 pl-5 outline-none rounded-md flex-1"
          disabled={!session}
          placeholder={
            session
              ? subreddit
                ? `Create a post in r/${subreddit}`
                : "Create a post by entering a title..."
              : "Sign in to post"
          }
        />

        <PhotographIcon
          onClick={() => setImageBox(!imageBox)}
          className={`h-6 text-gray-300 cursor-pointer ${
            imageBox && "text-blue-300"
          }`}
        />
        <LinkIcon className={`h-6 text-gray-300`} />
      </div>

      {!!watch("postTitle") && (
        <div className="flex flex-col py-2">
          {/* Body */}
          <div className="flex items-center px-2">
            <p className="min-w-[90px]">Body</p>
            <input
              type="text"
              placeholder="Text(optional)"
              {...register("postBody")}
              className="m-2 flex-1 bg-blue-50 p-2 outline-none"
            />
          </div>
          {!subreddit && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Subreddit</p>
              <input
                type="text"
                placeholder="i.e reactjs"
                {...register("subreddit", { required: true })}
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              />
            </div>
          )}
          {imageBox && (
            <div className="flex items-center px-2">
              <p className="min-w-[90px]">Image URL:</p>
              <input
                type="text"
                placeholder="Optional..."
                {...register("postImage")}
                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
              />
            </div>
          )}

          {/* Errors */}
          {Object.keys(errors).length > 0 && (
            <div className="space-y-2 p-2 text-red-500">
              {errors.postTitle?.type === "required" && (
                <p>A Post title is required</p>
              )}
              {errors.subreddit?.type === "required" && (
                <p>A SubReddit is required</p>
              )}
            </div>
          )}

          {!!watch("postTitle") && (
            <button
              type="submit"
              className="w-full rounded-full bg-blue-400  p-2 text-white"
            >
              Create Post
            </button>
          )}
        </div>
      )}
    </form>
  );
}

export default PostBox;
