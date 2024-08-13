import { useNavigate } from "react-router-dom";

export default function User({ user }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/mypage");
      }}
      className={`${
        user ? "block" : "hidden"
      } flex justify-center items-center`}
    >
      <img
        className="object-cover rounded-full sm:w-10 3sm:w-8 aspect-square"
        src={
          user?.photoURL ?? process.env.PUBLIC_URL + "/image/defaultImage.png"
        }
        alt="profile_img"
      />
      <span className="xl:block sm:hidden hidden ml-2 text-[0.9375rem]">
        {user?.displayName}
      </span>
    </div>
  );
}
