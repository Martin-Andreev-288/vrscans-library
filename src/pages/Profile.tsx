import DefaultInput from "../components/defaultInput/DefaultInput";
import Button from "../components/button/Button";

export default function Profile() {
  return (
    <div className="flex flex-row items-center h-[90vh]">
      <div className="w-[25vw] h-[45vh] flex flex-col items-center">
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
