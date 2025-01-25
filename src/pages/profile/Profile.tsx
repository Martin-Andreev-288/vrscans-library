import { useNavigate, Form, ActionFunction, redirect } from "react-router-dom";
import { DefaultInput, Button, AccessDenied } from "../../components";
import { ProfileSidebar } from "../../features";
import { useDispatch } from "react-redux";
import { getUserFromStorage, editProfile, logoutUser } from "../../store/slices/userSlice";
import { apiClient } from "../../utils/apiClient";
import { toast } from "react-toastify";
import { ReduxStore, RootState } from "../../store/store";
import { useSelector } from "react-redux";
import { AxiosResponse } from "axios";

export const action =
  (store: ReduxStore): ActionFunction =>
  async ({ request }): Promise<Response | null | undefined> => {
    const userState = getUserFromStorage();
    const userId = userState?.id;

    const formData = await request.formData();

    const data = {
      email: formData.get("email"),
      username: formData.get("username")
    };

    try {
      const response: AxiosResponse = await apiClient.patch(`/users/${userId}`, data);

      const username = response.data.username;
      const email = response.data.email;

      if (!username || !email) {
        toast.error("Please provide email and username.", { autoClose: 2000 });
        return;
      }

      store.dispatch(
        editProfile({
          username,
          email
        })
      );
      toast.success("Profile update successfully", { autoClose: 2000 });
      return redirect("/profile");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile data.", { autoClose: 2000 });
      return null;
    }
  };

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.userState.user);
  if (!user) return <AccessDenied />;

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(logoutUser());
    toast.success("Logout successful!", { autoClose: 2000 });
    return navigate("/");
  };

  return (
    <div className="main">
      <aside className="pt-14">
        <ProfileSidebar />
      </aside>
      <div className="p-2 pt-0 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-black pb-10">Account Details</h2>
        <Form method="PATCH" className="p-10 flex flex-col items-center">
          <div className="pb-3 w-[25vw] max-w-md min-w-64">
            <DefaultInput
              type="text"
              name="email"
              placeholder="Email"
              labeltext="Email"
              defaultValue={user?.email}
            />
          </div>
          <div className="pb-3 w-[25vw] max-w-md min-w-64">
            <DefaultInput
              type="text"
              name="username"
              placeholder="Username"
              labeltext="Username"
              defaultValue={user?.username}
            />
          </div>
          <Button type="editProfileButton">Edit Profile</Button>
        </Form>
      </div>
      <div className="mb-10 flex flex-col items-center">
        <Button type="navButton" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </div>
  );
}
