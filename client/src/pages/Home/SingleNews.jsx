import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { SqAds } from "../../components/common";
import { getSingleNews, getNewsAudio } from "../../redux/actions/publicNews";

const SingleNews = () => {
  const params = useParams();
  const news = useSelector((state) => state.news.singleNews);
  const audio = useSelector((state) => state.news.audio);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleNews(params));
  }, []);
  return (
    <div className="flex justify-between container gap-4">
      <div className="news-content ml-4 mb-10 w-full">
        <h1 className="text-xl m-4 font-bold">{news ? news.title : ""}</h1>
        <div className="my-4 w-min mx-auto">
          {audio ? (
            <audio controls>
              <source
                src={news ? `data:audio;base64,${audio}` : "#"}
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>
          ) : (
            <h1>Loading news audio...</h1>
          )}
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: news ? news.content : "Fetching",
          }}
          // className="flex items-center justify-center w-full"
        />
      </div>
      {/* right column */}
      <div className="hidden sm:block px-4">
        {/* ads go here */}
        <SqAds />
        <SqAds />
      </div>
    </div>
  );
};

export default SingleNews;
