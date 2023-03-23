import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    (window as any).signInWithGoogle = (data: any) => {
      console.log({ data });
    };
  }, []);

  return (
    <div className="App">
      <div
        id="g_id_onload"
        data-client_id="1001845153801-fmu12rm1i051t5pbhgu25tcjimo845pa.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-callback="signInWithGoogle"
        data-auto_select="true"
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
    </div>
  );
}

export default App;
