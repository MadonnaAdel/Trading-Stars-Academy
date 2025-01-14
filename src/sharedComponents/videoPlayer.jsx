import { useEffect } from "react";

const VideoPlayer = ({ otp, playbackInfo }) => {
    useEffect(() => {
      let script;
      let player;
  
      if (otp && playbackInfo) {
        script = document.createElement("script");
        script.src = "https://player.vdocipher.com/v2.0/vdo.js";
        script.async = true;
  
        script.onload = (e) => {
          console.log("VdoCipher script loaded successfully",e);
          player = new window.VdoPlayer({
            otp,
            playbackInfo,
            container: document.getElementById("vdoPlayer"),
            theme: "9ae8bbe8dd964ddc9bdb932cca1cb59a",
          });
        };
  
        script.onerror = (e) => {
          console.error("Failed to load VdoCipher player script.",e);
        };
  
        document.body.appendChild(script);
      }
  
      return () => {
        if (player) {
          player.destroy?.();
        }
        if (script) {
          document.body.removeChild(script);
        }
      };
    }, [otp, playbackInfo]);
  
    if (!otp || !playbackInfo) {
      return <p>تعذر تحميل الفيديو. يرجى المحاولة مرة أخرى لاحقًا.</p>;
    }
  
    return <div id="vdoPlayer" style={{ width: "100%", height: "500px" }} />;
  };
  
  export default VideoPlayer;