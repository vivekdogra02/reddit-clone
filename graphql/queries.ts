import { gql } from "@apollo/client";

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      id
      topic
      created_at
    }
  }
`;

export const GET_SUBREDDIT_WITH_LIMIT = gql`
  query MyQuery($limit: Int!) {
    getSubredditListLimit(limit: $limit) {
      id
      topic
      created_at
    }
  }
`;

export const GET_ALL_VOTES_BY_POST_ID = gql`
  query MyQuery($post_id: ID!) {
    getVoteUsingPost_id(id: $post_id) {
      id
      post_id
      upvote
      username
      created_at
    }
  }
`;
export const GET_ALL_POST = gql`
  query getAllPost {
    getPostList {
      body
      created_at
      id
      image
      title
      username
      subreddit_id
      subreddit {
        id
        topic
        created_at
      }
      votes {
        id
        post_id
        username
        created_at
        upvote
      }
      comments {
        id
        post_id
        username
        text
        created_at
      }
    }
  }
`;

export const GET_ALL_POST_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getPostListByTopic(topic: $topic) {
      body
      created_at
      id
      image
      title
      username
      subreddit_id
      subreddit {
        id
        topic
        created_at
      }
      votes {
        id
        post_id
        username
        created_at
        upvote
      }
      comments {
        id
        post_id
        username
        text
        created_at
      }
    }
  }
`;

export const GET_POST_BY_POST_ID = gql`
  query MyQuery($id: ID!) {
    getPost(id: $id) {
      body
      created_at
      id
      image
      title
      username
      subreddit_id
      subreddit {
        id
        topic
        created_at
      }
      votes {
        id
        post_id
        username
        created_at
        upvote
      }
      comments {
        id
        post_id
        username
        text
        created_at
      }
    }
  }
`;
