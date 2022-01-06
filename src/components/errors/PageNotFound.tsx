import React from "react";
import { Container, PrimaryButtonLink } from "../Materials";

function PageNotFound(): React.ReactElement {
  return (
    <Container>
      <h1>Page not found</h1>
      <p>We cant find the page your looking for.</p>
      <PrimaryButtonLink style={{ width: "150px" }} href="/">
        Go back to the main page
      </PrimaryButtonLink>
      <br></br>
      <br></br>
    </Container>
  );
}

export default PageNotFound;
