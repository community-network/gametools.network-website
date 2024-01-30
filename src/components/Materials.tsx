import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Materials.module.scss";

export function BackButton(
  props: Readonly<{
    text: string;
    location: string;
  }>,
): React.ReactElement {
  const history = useNavigate();

  return (
    <button
      className={styles.backButton}
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
      <i />
      {props.text}
    </button>
  );
}

export function InputItem(props: {
  item: string;
  currrentItem: string;
  callback: (args0?) => void;
  name: string;
  disabled?: boolean;
}): React.ReactElement {
  const { item, currrentItem, callback, name, disabled } = props;

  return (
    <div style={{ marginBottom: "5px" }}>
      <input
        className={styles.inputStyle}
        type="radio"
        id={item}
        name={item}
        value={item}
        onChange={callback}
        checked={currrentItem === item}
        disabled={disabled}
      />
      <label
        className={styles.selectorLabel}
        htmlFor={item}
        style={{
          color: disabled ? "#ffffff40" : "#fff",
        }}
      >
        {name}
      </label>
    </div>
  );
}

export function CheckItem(props: {
  item: string;
  currrentItems: string[];
  callback: (args0?) => void;
  name: string;
  disabled?: boolean;
}): React.ReactElement {
  const { item, currrentItems, callback, name, disabled } = props;

  return (
    <div style={{ marginBottom: "5px" }}>
      <input
        className={styles.inputStyle}
        type="checkbox"
        id={item}
        name={item}
        value={item}
        onChange={callback}
        checked={currrentItems.includes(item)}
        disabled={disabled}
      />
      <label
        className={styles.selectorLabel}
        htmlFor={item}
        style={{
          color: disabled ? "#ffffff40" : "#fff",
        }}
      >
        {name}
      </label>
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
      <div className="box" style={props.spacingStyle}>
        <div
          className={["wrap", props.className].join(" ")}
          style={props.style}
        >
          <div
            className="inner"
            style={{
              alignItems: props.align || "stretch",
              ...props.innerStyle,
            }}
          >
            {props.children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="box" style={props.spacingStyle}>
      <ConditionalLink to={props.link} condition={props.condition}>
        <div
          className={["wrap", props.className].join(" ")}
          style={props.style}
        >
          <div
            className="inner"
            style={{
              alignItems: props.align || "stretch",
              ...props.innerStyle,
            }}
          >
            {props.children}
          </div>
        </div>
      </ConditionalLink>
    </div>
  );
}
