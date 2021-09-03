import type { NextPage } from "next";
import { useEffect } from "react";
import { Client } from "disconnect";

const getIdentity = () => {
  const accessAuth = JSON.parse(localStorage.getItem("access_auth") as string);
  console.log("accessAuth: ", accessAuth);
  const client = new Client(accessAuth);

  return new Promise((resolve, reject) => {
    client
      .getIdentity()
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

const CallbackPage: NextPage = () => {
  const fetchIdentity = async () => {
    try {
      const identity = await getIdentity();
      console.log("identity: ", identity);
    } catch (e) {
      console.error("e: ", e);
    }
  };

  useEffect(() => {
    fetchIdentity();
  }, []);

  return <div>Identity</div>;
};

export default CallbackPage;
