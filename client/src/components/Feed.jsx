import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import UserCard from "./userCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error("Failed to fetch feed", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const handleSwipeLeft = () => {
    dispatch(addFeed(feed.slice(1)));
  };

  const handleSwipeRight = () => {
    dispatch(addFeed(feed.slice(1)));
  };

  return feed && feed.length > 0 ? (
    <div className="flex justify-center mt-10">
      <UserCard
        user={feed[0]}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
      />
    </div>
  ) : (
    <div className="flex justify-center mt-20">
      <p className="text-xl text-gray-500">No more profiles!</p>
    </div>
  );
};

export default Feed;
