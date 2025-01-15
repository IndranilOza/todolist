import "../styles/Profile.css";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  return <div className="profile-container">{user}</div>;
};

export default Profile;
