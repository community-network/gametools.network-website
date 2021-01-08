import React from 'react';
import { NavLink } from "react-router-dom";

export default function Home() {
    return <div>Home <NavLink to="/stats">Stats?</NavLink></div>;
}