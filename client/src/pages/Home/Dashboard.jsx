import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";


import { setFocus } from "../../redux/reducers/misc";
import UserDashNav from "./UserDash/UserDashNav";

const DashBoard = () => {
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
    <div className="w-full">
		<div className="flex items-start w-full border-4 border-red">
		 <UserDashNav/>

		  {/* end of left menu col */}
		  <div className="border-4 border-black flex">
			<div>News 1</div>
			<div>Little Preview</div>
			<div>Created/modified date</div>
			<div>edit btn</div>
			<div>delete btn</div>
		  </div>
		</div>
	</div>
  );
};

export default DashBoard;
