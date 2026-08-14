
import { useState, useRef, useEffect } from "react";
import type { Player } from "../../api/ReturnTypes";
import styles from "./autocomplete.module.scss";

export function DropDownAutocomplete({
  autocompleteResult,
  callback,
  searchTerm,
  style,
  searchBoxRef,
}: Readonly<{
  autocompleteResult: Player[];
  callback: (arg0: string) => void;
  searchTerm: string;
  style?: React.CSSProperties;
  searchBoxRef: React.RefObject<HTMLInputElement>;
}>): React.ReactElement {
  const [open, setOpen] = useState(false);

  const container: React.RefObject<HTMLDivElement | null> = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
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
