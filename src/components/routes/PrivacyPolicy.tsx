import * as React from "react";
import { useTranslation } from "react-i18next";
import { styled } from "styled-components";

const Container = styled.div`
  @media (min-width: 850px) {
    padding: 0 8.33%;
  }
  @media (max-width: 850px) {
    padding-left: 0 2%;
  }
`;

function PrivacyPolicy(): React.ReactElement {
  const { t } = useTranslation();
  document.title = `${t("siteFullName")} | ${t("footer.links.3.header")}`;

  return (
    <Container>
      <p>
        <h1>Privacy Policy for Gametools</h1>
        <div>
          At Gametools, accessible from https://gametools.network, one of our
          main priorities is the privacy of our visitors. This Privacy Policy
          document contains types of information that is collected and recorded
          by Gametools and how we use it.
        </div>
        <div>
          If you have additional questions or require more information about our
          Privacy Policy, do not hesitate to contact us.
        </div>
      </p>
      <p>
        <h3>Log Files</h3>
        <div>
          Gametools follows a standard procedure of using log files. These files
          log visitors when they visit websites. All hosting companies do this
          and a part of hosting services&apos; analytics. The information
          collected by log files include internet protocol (IP) addresses,
          browser type, Internet Service Provider (ISP), date and time stamp,
          referring/exit pages, and possibly the number of clicks. These are not
          linked to any information that is personally identifiable. The purpose
          of the information is for analyzing trends, administering the site,
          tracking users&apos; movement on the website, and gathering
          demographic information. Our Privacy Policy was created with the help
          of the{" "}
          <a href="https://www.privacypolicyonline.com/privacy-policy-generator/">
            Privacy Policy Generator
          </a>
          .
        </div>
      </p>
      <p>
        <h3>Google DoubleClick DART Cookie</h3>
        <div>
          Google is one of a third-party vendor on our site. It also uses
          cookies, known as DART cookies, to serve ads to our site visitors
          based upon their visit to www.website.com and other sites on the
          internet. However, visitors may choose to decline the use of DART
          cookies by visiting the Google ad and content network Privacy Policy
          at the following URL –{" "}
          <a href="https://policies.google.com/technologies/ads">
            https://policies.google.com/technologies/ads
          </a>
        </div>
      </p>
      <p>
        <h3>Privacy Policies</h3>
        <div>
          You may consult this list to find the Privacy Policy for each of the
          advertising partners of Gametools.
        </div>
        <div>
          Third-party ad servers or ad networks uses technologies like cookies,
          JavaScript, or Web Beacons that are used in their respective
          advertisements and links that appear on Gametools, which are sent
          directly to users&apos; browser. They automatically receive your IP
          address when this occurs. These technologies are used to measure the
          effectiveness of their advertising campaigns and/or to personalize the
          advertising content that you see on websites that you visit.
        </div>
        <div>
          Note that Gametools has no access to or control over these cookies
          that are used by third-party advertisers.
        </div>
      </p>
      <p>
        <h3>Third Party Privacy Policies</h3>
        <div>
          Gametools&apos;s Privacy Policy does not apply to other advertisers or
          websites. Thus, we are advising you to consult the respective Privacy
          Policies of these third-party ad servers for more detailed
          information. It may include their practices and instructions about how
          to opt-out of certain options.{" "}
        </div>
        <div>
          You can choose to disable cookies through your individual browser
          options. To know more detailed information about cookie management
          with specific web browsers, it can be found at the browsers&apos;
          respective websites. What Are Cookies?
        </div>
      </p>
      <p>
        <h3>Children&apos;s Information</h3>
        <div>
          Another part of our priority is adding protection for children while
          using the internet. We encourage parents and guardians to observe,
          participate in, and/or monitor and guide their online activity.
        </div>
        <div>
          Gametools does not knowingly collect any Personal Identifiable
          Information from children under the age of 13. If you think that your
          child provided this kind of information on our website, we strongly
          encourage you to contact us immediately and we will do our best
          efforts to promptly remove such information from our records.
        </div>
      </p>
      <p>
        <h3>Online Privacy Policy Only</h3>
        <div>
          This Privacy Policy applies only to our online activities and is valid
          for visitors to our website with regards to the information that they
          shared and/or collect in Gametools. This policy is not applicable to
          any information collected offline or via channels other than this
          website.
        </div>
      </p>
      <p>
        <h3>Consent</h3>
        <div>
          By using our website, you hereby consent to our Privacy Policy and
          agree to its Terms and Conditions.
        </div>
      </p>
    </Container>
  );
}

export default PrivacyPolicy;
