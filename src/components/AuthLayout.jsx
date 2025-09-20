// components/Protected.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authStatus === null) return; // wait until Redux loads

    if (authentication && authStatus === false) navigate("/login");
    else if (!authentication && authStatus === true) navigate("/");

    setLoader(false);
  }, [authStatus, navigate, authentication]);

  if (loader || authStatus === null) return <h1>Loading...</h1>;
  return <>{children}</>;
}
