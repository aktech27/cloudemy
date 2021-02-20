import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const VerifyAccount = () => {
  const [info, setInfo] = useState("");
  let { accountToken } = useParams();
  useEffect(() => {
    axios
      .put("/verify", { accountToken })
      .then((res) => {
        console.log(res.data.message);
        setInfo(res.data.message);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setInfo(err.response.data.error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Verification Status:</h1>
      <h3>{info}</h3>
    </div>
  );
};

export default VerifyAccount;
