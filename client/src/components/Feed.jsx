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

  const sendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true },
      );
    } catch (err) {
      console.error("Failed to send request", err);
    }
  };

  const handleSwipeLeft = () => {
    if (!feed || feed.length === 0) return;
    const topUser = feed[0];
    sendRequest("ignored", topUser._id);
    dispatch(addFeed(feed.slice(1)));
  };

  const handleSwipeRight = () => {
    if (!feed || feed.length === 0) return;
    const topUser = feed[0];
    sendRequest("interested", topUser._id);
    dispatch(addFeed(feed.slice(1)));
  };

  return feed && feed.length > 0 ? (
    <div className="flex justify-center mt-10">
      <div className="relative" style={{ width: "380px", height: "580px" }}>
        {feed
          .slice(0, 3)
          .reverse()
          .map((user, i, arr) => {
            const isTop = i === arr.length - 1;
            const stackIndex = arr.length - 1 - i; // 0 = top card
            const scale = 1 - stackIndex * 0.04;
            const translateY = stackIndex * 10;
            return (
              <div
                key={user._id}
                className="absolute top-0 left-0"
                style={{
                  width: "380px",
                  height: "580px",
                  transform: `scale(${scale}) translateY(${translateY}px)`,
                  transformOrigin: "bottom center",
                  zIndex: isTop ? 10 : i,
                  pointerEvents: isTop ? "auto" : "none",
                }}
              >
                <UserCard
                  user={user}
                  onSwipeLeft={isTop ? handleSwipeLeft : undefined}
                  onSwipeRight={isTop ? handleSwipeRight : undefined}
                />
              </div>
            );
          })}
      </div>
    </div>
  ) : (
    <div className="flex justify-center mt-20">
      <p className="text-xl text-gray-500">No more profiles!</p>
    </div>
  );
};

export default Feed;
