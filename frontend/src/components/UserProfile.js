import React from "react";

const UserProfile = () => {
  const auth = localStorage.getItem("user");

  return (
    <div>
      <img
        alt="logo"
        className="logoo"
        src="https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=996&t=st=1683454680~exp=1683455280~hmac=3d6e53435d0000f21d6a28567486bbf0f99a5c7bdd33eef94701ed91db1fa739"
      ></img>
      <h3>Name: {JSON.parse(auth).name} </h3>;
      <h3>Email: {JSON.parse(auth).email} </h3>;
    </div>
  );
};

export default UserProfile;
