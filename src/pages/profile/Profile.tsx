import { useNavigate } from "react-router-dom";
import { DefaultInput, Button } from "../../components";
import { ProfileSidebar } from "../../features";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/userSlice";
import { toast } from "react-toastify";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(logoutUser());
    toast.success("Logout successful!", { autoClose: 2000 });
    return navigate("/");
  };

  return (
    <div className="main">
      <aside>
        <ProfileSidebar />
      </aside>
      <div className="w-[50vw] h-[65vh] flex flex-col items-center">
        <h2 className="text-4xl font-bold text-black pb-10">Account Details</h2>
        <form>
          <div className="pb-3 w-[25vw]">
            <DefaultInput type="text" name="email" placeholder="Email" />
          </div>
          <div className="pb-3 w-[25vw]">
            <DefaultInput type="password" name="password" placeholder="Password" />
          </div>
          <div className="mb-10">
            <Button type="navButton" onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
