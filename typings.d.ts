type Comments = {
  created_at: stirng;
  id: number;
  post_id: number;
  text: string;
  username: string;
};

type Vote = {
  created_at: stirng;
  id: number;
  post_id: number;
  upvote: boolean;
  username: string;
};

type Subreddit = {
  created_at: stirng;
  id: number;
  topic: string;
};

type Post = {
  body: string;
  created_at: stirng;
  id: number;
  image: string;
  subreddit_id: number;
  title: string;
  username: string;
  votes: Vote[];
  comments: Comments[];
  subreddit: Subreddit[];
};
