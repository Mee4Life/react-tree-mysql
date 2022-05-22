import React from 'react'
import { Link } from 'react-router-dom'

function NavLink(props) {
    const {p} = props
    return (
        <Link className={p.getCls("nav-link")} to={props.path}>{props.name}</Link>
    )
}

export default NavLink
