import { useState, useEffect } from "react";
import { premiumLogin } from "../services/backendRequests";

export default function usePremiumAuth(code) {
  const [premiumAccessToken, setPremiumAccessToken] = useState();
  const [premiumRefreshToken, setPremiumRefreshToken] = useState();
  const [premiumExpiresIn, setPremiumExpiresIn] = useState();

  useEffect(() => {
    premiumLogin(code);
  }, [code]);
}
