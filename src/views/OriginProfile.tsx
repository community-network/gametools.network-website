import React from 'react';
import { NavLink } from "react-router-dom";

export default function OriginProfile(props) {
    return <div><NavLink to="/stats">Go back</NavLink>Your profile {props.match.params.eaid} and game {props.match.params.game}</div>;
}