import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";

import { setFocus } from "../../../redux/reducers/misc";
import UserInfo from "./UserInfo";
import UserPreference from "./UserPreference";
import Subscription from "./Subscription";
import SavedPosts from "./SavedPosts";
import UserPosts from "./UserPosts";

const UserProfile = () => {
  const { data: session, status } = useSession();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFocus(true));
  }, []);

  if (status == "unauthenticated") {
    return (
      <h1 className="text-3xl font-bold">You must login to view this page</h1>
    );
  }

  return (
    <div className="font-secondary p-4 flex flex-col ">
      <h1 className="font-secondary leading-loose font-bold text-center text-3xl text-darkblue">
        User Profile
      </h1>
      <UserInfo />
      <hr className=" w-11/12 my-6 border-neutral-300" />
      <UserPreference />
      <hr className=" w-11/12 my-6 border-neutral-300" />
      <UserPosts />
      <hr className=" w-11/12 my-6 border-neutral-300" />
      <SavedPosts />
      <hr className=" w-11/12 my-6 border-neutral-300" />
      <Subscription />
    </div>
  );
};

export default UserProfile;
