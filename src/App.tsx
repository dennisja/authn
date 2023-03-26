import { Flex } from "@adobe/react-spectrum";
import { useEffect } from "react";
import { GOOGLE_CLIENT_ID } from "./envs";
import { GoogleLoginResult } from "./types";

function App() {
  useEffect(() => {
    const signInWithGoogle = (data: GoogleLoginResult) => {
      console.log(data);
    };
    window.signInWithGoogle = signInWithGoogle;
  }, []);

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <div
        id="g_id_onload"
        data-client_id={GOOGLE_CLIENT_ID}
        data-context="use"
        data-ux_mode="popup"
        data-callback="signInWithGoogle"
        data-itp_support="true"
      ></div>
      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="continue_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </Flex>
  );
}

export default App;
