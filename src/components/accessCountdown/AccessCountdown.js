import React from "react";
import "./AccessCountdown.scss";
import useStore from "../../store/store";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

function AccessCountdown() {
  let accessExpiresIn = useStore((state) => state.accessExpiresIn);
  let logout = useStore((state) => state.logout);

  const [countdown, setcountdown] = useState(accessExpiresIn);
  const [timerRunning, setTimerRunning] = useState(false);

  let history = useHistory();

  useEffect(() => {
    if (timerRunning) {
      window.timer = setInterval(() => {
        setcountdown((countdown) => countdown - 1);
      }, 1000);
    }

    return () => clearInterval(window.timer);
  }, [timerRunning]);

  useEffect(() => {
    if (countdown < 0) {
      logout();
      history.push("/");
    }
  }, [countdown]);

  useEffect(() => {
    setTimerRunning(true);
  }, []);

  return <div className="Accesscountdownwrapper">{countdown}</div>;
}

export default AccessCountdown;
