import * as React from "react";
import { BF2042PlayerSearchReturn } from "../../api/GametoolsApi";
import { playerSearchReturn } from "../../api/FeslApi";
import { styled } from "styled-components";

const DropDown = styled.div`
  position: absolute;
  border-radius: 8px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  background: #1e2028;
  z-index: 5;
`;

const List = styled.ul`
  list-style: none;
  padding: 3px 0px;
  margin: 0;
`;

const Item = styled.li`
  padding: 4px 18px;
  font-family: Manrope;
  font-size: 14px;
  font-weight: 500;
  line-height: 150%;
  color: var(--color-alt-text);
  :hover {
    color: var(--color-text);
    background-color: rgba(0, 0, 0, 0.14);
    cursor: pointer;
  }
`;

export function DropDownAutocomplete({
  autocompleteResult,
  callback,
  searchTerm,
  style,
  searchBoxRef,
}: {
  autocompleteResult: BF2042PlayerSearchReturn | playerSearchReturn;
  callback?: (arg0: string) => void;
  searchTerm: string;
  style?: React.CSSProperties;
  searchBoxRef: React.MutableRefObject<HTMLInputElement>;
}): React.ReactElement {
  const [open, setOpen] = React.useState(false);

  const container: React.MutableRefObject<HTMLDivElement> = React.useRef();

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

  if (autocompleteResult?.results) {
    if (
      !(
        autocompleteResult.results.length == 1 &&
        autocompleteResult.results[0].name === searchTerm
      )
    ) {
      autocomplete = autocompleteResult.results.map((user) => {
        return user.name;
      });
    }
  }

  return (
    <DropDown ref={container} style={style}>
      {open && (
        <List>
          {autocomplete.map((userName, index) => {
            return (
              <Item
                key={index}
                onClick={() => {
                  setOpen(false);
                  return callback(userName);
                }}
              >
                {userName}
              </Item>
            );
          })}
        </List>
      )}
    </DropDown>
  );
}
