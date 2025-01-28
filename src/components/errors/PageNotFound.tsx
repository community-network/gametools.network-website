import * as React from "react";
import { useTranslation } from "react-i18next";

function PageNotFound(): React.ReactElement {
  const { t } = useTranslation();
  React.useEffect(() => {
    document.title = `${t("siteFullName")} | ${t("404")}`;
  }, []);
  return (
    <div className="container">
      <h1>{t("pageNotFound.main")}</h1>
      <p>{t("pageNotFound.description")}</p>
      <a className="primaryButtonLink" style={{ width: "140px" }} href="/">
        {t("pageNotFound.home")}
      </a>
      <br></br>
      <br></br>
    </div>
  );
}

export default PageNotFound;
