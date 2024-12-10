import { DefaultInput, Button, ProfileSidebar } from "../components";

export default function Profile() {
  return (
    <div className="main">
      <aside>
        <ProfileSidebar />
      </aside>
      <div className="w-[50vw] h-[65vh] flex flex-col items-center">
        <h2 className="text-4xl font-bold text-black pb-10">Account Details</h2>
        <form>
          <div className="pb-3 w-[25vw]">
            <DefaultInput placeholder="Email" />
          </div>
          <div className="pb-3 w-[25vw]">
            <DefaultInput placeholder="Password" />
          </div>
          <div className="mb-10">
            <Button type="navButton">Log Out</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
