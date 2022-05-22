import React from 'react'
import NavLink from './NavLink'
function NavLinks(props) {
    const { p, userController } = props
    return (
        <div className={p.getCls("nav-links")}>
            <NavLink name={'Home'} p={p} path='/'/>
            {userController.token && <NavLink name={'Time-Line'} p={p} path='/timeline' />}
            {userController.token && <NavLink name={'By-Time'} p={p} path='/by-time' />}
            {userController.token && <NavLink name={'People'} p={p} path='/people' />}
            {userController.token && <NavLink name={'Groups'} p={p} path='/group' />}
            {userController.token && <NavLink name={'Tags'} p={p} path='/tag' />}
        </div>
    )
}

export default NavLinks
