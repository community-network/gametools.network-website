import * as React from "react";
import { Player } from "../../api/ReturnTypes";
import * as styles from "./autocomplete.module.scss";

export function DropDownAutocomplete({
  autocompleteResult,
  callback,
  searchTerm,
  style,
  searchBoxRef,
}: Readonly<{
  autocompleteResult: Player[];
  callback?: (arg0: string) => void;
  searchTerm: string;
  style?: React.CSSProperties;
  searchBoxRef: React.RefObject<HTMLInputElement>;
}>): React.ReactElement {
  const [open, setOpen] = React.useState(false);

  const container: React.RefObject<HTMLDivElement> = React.useRef();

  React.useEffect(() => {
    const handleClickOutside = (event: { target }) => {
      if (container.current && !container.current.contains(event.target)) {
        setOpen(false);
      }

      if (searchBoxRef.current && searchBoxRef.current.contains(event.target)) {
        setOpen(true);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return function cleanup() {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  let autocomplete: string[] = [];

  if (autocompleteResult !== undefined) {
    if (
      !(
        autocompleteResult?.length == 1 &&
        autocompleteResult[0].personaName === searchTerm
      )
    ) {
      autocomplete = autocompleteResult.map((user) => {
        return user.personaName;
      });
    }
  }

  return (
    <div className={styles.dropdown} ref={container} style={style}>
      {open && (
        <ul className={styles.list}>
          {autocomplete.map((userName, index) => {
            return (
              <li
                className={styles.item}
                key={index}
                onClick={() => {
                  setOpen(false);
                  return callback(userName);
                }}
              >
                {userName}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
