import "../styles/Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="profile-container">
      <div>
        <FaRegUserCircle />
      </div>
      <div>{user}</div>
    </div>
  );
};

export default Profile;
