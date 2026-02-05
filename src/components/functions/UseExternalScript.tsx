import { useEffect, useState } from "react";

export default function useExternalScript(
  url: string,
  anonymous: boolean = false,
) {
  const [state, setState] = useState(url ? "loading" : "idle");

  useEffect(() => {
    if (!url) {
      setState("idle");
      return;
    }
    let script: HTMLScriptElement = document.querySelector(
      `script[src="${url}"]`,
    );

    const handleScript = (e: { type: string }) => {
      setState(e.type === "load" ? "ready" : "error");
    };

    if (!script) {
      script = document.createElement("script");
      script.type = "application/javascript";
      script.src = url;
      script.async = true;
      if (anonymous) {
        script.crossOrigin = "anonymous";
      }
      document.body.appendChild(script);
      script.addEventListener("load", handleScript);
      script.addEventListener("error", handleScript);
    } else {
      setState("ready");
      script.addEventListener("load", handleScript);
      script.addEventListener("error", handleScript);
    }

    return () => {
      script.removeEventListener("load", handleScript);
      script.removeEventListener("error", handleScript);
    };
  }, [url]);

  return state;
}
