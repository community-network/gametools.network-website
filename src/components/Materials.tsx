import * as React from "react";
import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";

export const M88 = css`
  --color-text: rgba(255, 255, 255, 0.88);
  --color-alt-text: rgba(255, 255, 255, 0.68);
  --color-base: #151829;
`;

export const M92 = css`
  --color-text: rgba(255, 255, 255, 0.92);
  --color-alt-text: rgba(255, 255, 255, 0.72);
  --color-base: #16181f;
`;

export const M96 = css`
  --color-text: rgba(255, 255, 255, 0.96);
  --color-alt-text: rgba(255, 255, 255, 0.76);
  --color-base: #1e2028;
  --color-alt-base: #2e313f;
`;
export const M100 = css`
  --color-text: rgba(255, 255, 255, 1);
  --color-alt-text: rgba(255, 255, 255, 0.8);
  --color-base: #313443;
`;

export const AltText = css`
  --color-text: var(--color-alt-text);
`;

export const Column = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  margin: 0 auto;
  margin-top: 0.5rem;
`;

export const Row = styled.div`
  flex: 1;
`;

export const PageColumn = styled.div`
  @media screen and (min-width: 1800px) {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
  }
`;

export const PageRow = styled.div`
  @media screen and (min-width: 1800px) {
    flex: 0;
    min-width: ${(props) => props.title || "800px"};
  }
  @media screen and (max-width: 1800px) {
    flex: 100%;
  }
  :empty {
    display: none;
  }
`;

export const Container = styled.div`
  @media (min-width: 850px) {
    padding-left: 8.33%;
  }
  @media (max-width: 850px) {
    padding-left: 2%;
  }
`;

export const Back = styled.button`
  ${M88}
  color: var(--color-text);
  font-weight: 500;
  line-height: 150%;
  font-size: 12px;
  background: none;
  font-family: Manrope;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: inherit;
  align-items: center;
`;

export function BackButton(props: {
  text: string;
  location: string;
}): React.ReactElement {
  const history = useNavigate();

  return (
    <Back
      onClick={() => {
        if (
          document.referrer.indexOf(window.location.host) === -1 ||
          ["/", "/stats"].includes(props.location)
        ) {
          window.location.href = props.location;
        } else {
          history(-1);
        }
      }}
    >
      <ArrowLeft />
      {props.text}
    </Back>
  );
}

export const ArrowLeft = styled.i`
  border: solid white;
  border-width: 0 1.8px 1.8px 0;
  margin-right: 5px;
  display: inline-block;
  padding: 3px;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
`;

export const SmallSearchBox = styled.input`
  ${M96}
  ::placeholder {
    color: var(--color-alt-text);
  }
  box-sizing: border-box;
  color: var(--color-text);
  border: none;
  border-radius: 10px;
  background: #1e2028;
  width: 191px;
  height: 30px;
  padding-left: 1rem;
  margin-bottom: 1rem;
  font-family: Manrope;
  font-weight: medium;
  font-style: normal;
  margin-right: 1rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const HomePlayerSearchBox = styled(SmallSearchBox)`
  color: rgba(255, 255, 255, 0.7);
  }
  @media (min-width: 750px) {
    width: 20rem;
    margin-left: -2rem;
  }
  @media (max-width: 750px) {
    max-width: 20rem;
    width: 95%;
  }
  @media (min-width: 1000px) {
    width: 621px;
  }
  border-radius: 0;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  width: auto;
  height: 50px;
  padding-left: 2rem;
  margin-right: 0.2rem;
  filter: none;
`;

export const SearchBox = styled(SmallSearchBox)`
  @media (min-width: 710px) {
    width: 30rem;
  }
  @media (max-width: 710px) {
    max-width: 30rem;
    width: 95%;
  }
  width: auto;
  height: 50px;
  padding-left: 2rem;
`;

export const Bf2042SearchBox = styled(SearchBox)`
  @media (min-width: 710px) {
    width: 20rem;
  }
  @media (max-width: 710px) {
    max-width: 20rem;
  }
  border-radius: 0;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  margin-right: 0;
  filter: none;
`;

export const ButtonLink = styled.a`
  ${M96}
  padding: 10px 20px;
  background: var(--color-base);
  border-radius: 10px;
  transition: all 0.1s;
  display: flex;
  flex-grow: 1;
  width: auto;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
  :hover {
    background: var(--color-alt-base);
  }
`;

export const PrimaryButtonLink = styled(ButtonLink)`
  background: var(--color-blue);
  :hover {
    background: var(--color-blue-alt);
  }
`;

export const BigButtonLink = styled(ButtonLink)`
  width: 134px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  font-size: 0.9rem;
`;

export const BigButtonSecondary = styled.button`
  ${M96}
  background: #1E2028;
  color: var(--color-text);
  border: none;
  margin-bottom: 1rem;
  border-radius: 10px;
  height: 50px;
  width: 134px;
  margin-right: 1rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  font-family: Manrope;
  font-weight: medium;
  font-style: normal;
  cursor: pointer;
  :hover {
    background: var(--color-base);
  }
`;

export const BigButtonPrimary = styled(BigButtonSecondary)`
  background: var(--color-blue);
  width: auto;
  min-width: 158px;
  filter: none;
  :hover {
    background: var(--color-blue-alt);
  }
`;

export const BigButtonSecondaryBox = styled(BigButtonSecondary)`
  background: var(--color-base);
  :hover {
    background: #313443;
  }
`;

export const SmallButton = styled(BigButtonSecondary)`
  height: 30px;
  padding: 0 24px;
  width: auto;
  margin-right: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

export const SmallButtonPrimary = styled(SmallButton)`
  background: var(--color-base);
  :hover {
    background: #313443;
  }
`;

export const SmallButtonSecondary = styled(SmallButton)`
  border: none;
  height: auto;
  border-radius: 10px;
  padding: 0.5rem 1.5rem;
  margin-right: 1rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  box-sizing: borfer-box;
`;

export const SelectSecondary = styled.select`
  ${M96}
  background: #1E2028;
  color: var(--color-text);
  border-radius: 10px;
  border: none;
  height: 30px;
  padding: 0 24px;
  font-family: Manrope;
  font-weight: medium;
  font-style: normal;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 3px;
  option {
    background: rgba(0, 0, 0, 0.8);
  }
`;

export const BigSelectSecondary = styled(SelectSecondary)`
  height: 50px;
  margin-right: 1rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  padding: none;
  margin-bottom: 1rem;
  padding-left: 18px;
  background-position-y: 13px;
  background-image: url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 13px;
`;

export const HomePlayerBigSelectSecondary = styled(BigSelectSecondary)`
  width: 128px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 0;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding-left: 25px;
  filter: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='rgb(255,255,255)' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 13px;
`;

export const Bf2042BigSelectSecondary = styled(HomePlayerBigSelectSecondary)`
  width: 10rem;
  background: #1e2028;
  color: #929292;
  padding-left: 18px;
  background-image: url("data:image/svg+xml;utf8,<svg fill='rgb(131,131,131)' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 13px;
`;

export const SelectPrimary = styled(SelectSecondary)`
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  margin-bottom: 1rem;
`;

export const AlignT = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Align = styled(AlignT)`
  align-items: center;
`;

export const AlignS = styled(Align)`
  justify-content: space-around;
  width: 100%;
`;

export const AlignW = styled(Align)`
  flex-wrap: nowrap;
`;

export const AlignSeverImg = styled.div`
  @media (min-width: 540px) {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  }
`;

export const Alignbf2042Search = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const GridContainer = styled.div`
  display: grid;
  @media (min-width: 600px) {
    grid-template-columns: auto auto auto auto auto;
  }
  @media (max-width: 600px) and (min-width: 450px) {
    grid-template-columns: auto auto auto;
  }
  @media (max-width: 450px) {
    grid-template-columns: auto auto;
  }
`;

const SelectorLabel = styled.label`
  font-family: Manrope;
  font-style: normal;
  letter-spacing: 0em;
  text-align: left;
  color: var(--color-text);
  font-weight: 500;
  line-height: 150%;
  font-size: 13px;
`;

const InputStyle = styled.input`
  margin-right: 0.5rem;
  margin-left: 0;
`;

export function InputItem(props: {
  item: string;
  currrentItem: string;
  callback: any;
  name: string;
  disabled?: boolean;
}): React.ReactElement {
  const { item, currrentItem, callback, name, disabled } = props;

  return (
    <div style={{ marginBottom: "5px" }}>
      <InputStyle
        type="radio"
        id={item}
        name={item}
        value={item}
        onChange={callback}
        checked={currrentItem === item}
        disabled={disabled}
      />
      <SelectorLabel
        htmlFor={item}
        style={{
          color: disabled ? "#ffffff40" : "#fff",
        }}
      >
        {name}
      </SelectorLabel>
    </div>
  );
}

export function RightArrow(): React.ReactElement {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.666504 5.33333V6.66667H8.6665L4.99984 10.3333L5.9465 11.28L11.2265 6L5.9465 0.720001L4.99984 1.66667L8.6665 5.33333H0.666504Z"
        fill="#EBEBEB"
      />
    </svg>
  );
}

export function OpenExternal(props: {
  style?: React.CSSProperties;
}): React.ReactElement {
  return (
    <svg
      style={{ verticalAlign: "bottom", ...props.style }}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="2 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0V0z" />
      <path
        d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
        fill="#EBEBEB"
      />
    </svg>
  );
}

export const BoxSpacing = styled.div`
  max-width: 45rem;
  margin: 0 12px 18px 0;
`;

export const BoxWrap = styled.div`
  ${M92}
  background: var(--color-base);
  align-self: flex-start;
  display: flex;
  box-sizing: border-box;

  border-radius: 10px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const BoxInner = styled.div`
  flex-grow: 2;
  padding: 12px 24px 24px 24px;
  box-sizing: border-box;
  display: flex;
  overflow-y: auto;
  max-width: 45rem;
  max-height: 30rem;
  flex-direction: column;
  //display: flex;
`;

interface ConLink {
  children: React.ReactElement<unknown, string>;
  to: string;
  condition: boolean;
}

export function Box(props: {
  align?: string;
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal;
  className?: string;
  style?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
  spacingStyle?: React.CSSProperties;
  link?: string;
  condition?: boolean;
}): React.ReactElement {
  const ConditionalLink = ({ children, to, condition }: ConLink) =>
    !!condition && to ? <Link to={to}>{children}</Link> : <>{children}</>;

  if (props.condition === undefined) {
    return (
      <BoxSpacing style={props.spacingStyle}>
        <BoxWrap className={props.className} style={props.style}>
          <BoxInner
            style={{
              alignItems: props.align || "stretch",
              ...props.innerStyle,
            }}
          >
            {props.children}
          </BoxInner>
        </BoxWrap>
      </BoxSpacing>
    );
  }

  return (
    <BoxSpacing style={props.spacingStyle}>
      <ConditionalLink to={props.link} condition={props.condition}>
        <BoxWrap className={props.className} style={props.style}>
          <BoxInner
            style={{
              alignItems: props.align || "stretch",
              ...props.innerStyle,
            }}
          >
            {props.children}
          </BoxInner>
        </BoxWrap>
      </ConditionalLink>
    </BoxSpacing>
  );
}

export const Circle = styled.span`
  ${M92}
  height: 60px;
  width: 60px;
  margin-right: 1.5rem;
  background-color: var(--color-base);
  border-radius: 50%;
`;

export const InvisableRadioButton = styled.input.attrs({ type: "radio" })`
  opacity: 0;
  position: fixed;
  width: 0;
`;

export const Radio = styled.div`
  // for next-row
  margin-bottom: 1rem;
  height: 35px;
`;

export const SmallButtonRadio = styled.label`
  ${M96}
  background: #1E2028;
  color: var(--color-text);
  border: none;
  margin-bottom: 1rem;
  border-radius: 5px;
  padding: 0.5rem 1.5rem;
  margin-right: 1rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  font-family: Manrope;
  font-weight: medium;
  font-style: normal;
`;

export const UncheckedSmallButtonRadio = styled(SmallButtonRadio)`
  background: none;
  filter: none;
  cursor: pointer;
  :hover {
    background: var(--color-base);
  }
`;

export const DisabledSmallButtonRadio = styled(SmallButtonRadio)`
  background: none;
  filter: none;
  color: var(--color-alt-text);
`;

export const SmallestPhoneRow = styled.div`
  flex: 1;
  @media (max-width: 440px) {
    display: none;
  }
`;

export const SmallPhoneRow = styled.div`
  flex: 1;
  @media (max-width: 570px) {
    display: none;
  }
`;

export const TabletRow = styled.div`
  flex: 1;
  @media (max-width: 700px) {
    display: none;
  }
`;

export const PhoneRow = styled.div`
  flex: 1;
  @media (max-width: 600px) {
    display: none;
  }
`;

export const PhoneVis = styled.div`
  @media (max-width: 800px) {
    display: none;
  }
`;
