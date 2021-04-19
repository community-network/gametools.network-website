import styled, {css} from "styled-components";
import { Link  } from "react-router-dom";

export const M88 = css`
    --color-text: rgba(255, 255, 255, 0.88);
    --color-alt-text: rgba(255, 255, 255, 0.68);
    --color-base: #151829;
`

export const M92 = css`
    --color-text: rgba(255, 255, 255, 0.92);
    --color-alt-text: rgba(255, 255, 255, 0.72);
    --color-base: #1e2132;
`

export const M96 = css`
    --color-text: rgba(255, 255, 255, 0.96);
    --color-alt-text: rgba(255, 255, 255, 0.76);
    --color-base: #282a3a;
`
export const M100 = css`
    --color-text: rgba(255, 255, 255, 1);
    --color-alt-text: rgba(255, 255, 255, 0.8);
    --color-base: #313443;
`

export const AltText = css`
    --color-text: var(--color-alt-text);
`



export const Container = styled.div`
    padding-left: 8.33%;
`

export const Back = styled(Link)`
    ${M88}
    align-items: center;
`

export const ArrowLeft = styled.i`
    border: solid white;
    border-width: 0 1.8px 1.8px 0;
    margin-right: 5px;
    display: inline-block;
    padding: 3px;
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
`

export const SearchBox = styled.input`
    ${M96}
    ::placeholder {
        color: var(--color-alt-text);
    }
    box-sizing: border-box;
    color: var(--color-text);
    border: none;
    border-radius: 5px;
    background: #1E2132;
    width: 30rem;
    height: 50px;
    padding-left: 2rem;
    margin-bottom: 1rem;
    font-family: Manrope;
    font-weight: medium;
    font-style: normal;
    margin-right: 1rem;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`

export const BigButtonSecondary = styled.button`
    ${M96}
    background: #1E2132;
    color: var(--color-text);
    border: none;
    margin-bottom: 1rem;
    border-radius: 5px;
    height: 50px;
    width: 134px;
    margin-right: 1rem;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    font-family: Manrope;
    font-weight: medium;
    font-style: normal;
`

export const SmallButtonSecondary = styled.button`
    ${M96}
    background: #1E2132;
    color: var(--color-text);
    border: none;
    margin-bottom: 1rem;
    border-radius: 5px;
    padding: .5rem 1.5rem;
    margin-right: 1rem;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    font-family: Manrope;
    font-weight: medium;
    font-style: normal;
`

export const BigSelectSecondary = styled.select`
    ${M96}
    background: #1E2132;
    color: var(--color-text);
    margin-bottom: 1rem;
    border-radius: 5px;
    border: none;
    height: 50px;
    margin-right: 1rem;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    padding-left: 18px;
    font-family: Manrope;
    font-weight: medium;
    font-style: normal;
`

export const SelectSecondary = styled.select`
    ${M96}
    background: #1E2132;
    color: var(--color-text);
    border-radius: 5px;
    border: none;
    height: 30px;
    padding: 0 24px;
    font-family: Manrope;
    font-weight: medium;
    font-style: normal;
`

export const Align = styled.div`
    display: flex;
    align-items: center;
`

export function RightArrow() {
    return (
        <svg width="12" height="12" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.666504 5.33333V6.66667H8.6665L4.99984 10.3333L5.9465 11.28L11.2265 6L5.9465 0.720001L4.99984 1.66667L8.6665 5.33333H0.666504Z" fill="#EBEBEB"/>
        </svg>
    )
}

export const Box = styled.div`
    padding: .2rem 1.4rem;
    background: #1E2132;
    border-radius: 10px;
`