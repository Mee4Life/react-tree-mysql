/* 
* Navbar : 
    - content
        - brand 
        - line-1
            - nav links
            - login 
    - actions
        - dark
        - toggle nav
*/
import React, { useState } from 'react'
import "./css/navbar.css"
import NavLinks from './links/NavLinks'
import Brand from './brand/Brand'
import Login from './login/Login'
import { Link, useParams } from 'react-router-dom'
import { date1, date2 } from '../../utils/functions'


function Navbar(props) {

    // extract data from the local storage
    const getIsVisible = () => {
        return localStorage.getItem('navBarVisible') &&
            localStorage.getItem('navBarVisible') === "true"
    }
    // set state
    const { p, userController, styleManager, isVisible, setVisible } = props

    setVisible(getIsVisible)


    // action functions
    const toggleNav = () => {
        setVisible(!isVisible)
        localStorage.setItem('navBarVisible', !isVisible)
    }

    const toggleNight = () => {
        p.setIsDark(!p.isDark)
        localStorage.setItem('isDark', !p.isDark)
        p.setBranchBKColor(p.getBranchBkColor('toggleNight'))
    }
    const biggerFont = () => {
        const fSize = styleManager.fontSize + 2
        styleManager.setFontSize(fSize)
        localStorage.setItem('fontSize', fSize)
    }
    const smallerFont = () => {
        const fSize = styleManager.fontSize - 2
        styleManager.setFontSize(fSize)
        localStorage.setItem('fontSize', fSize)
    }

    const branchesListToggleBranchMenu = () => {
        p.setBranchesListBranchMenu(!p.branchesListIsBranchMenu)
    }

    const centerListText = () => {
        p.setListAlign('center')
    }
    const leftListText = () => {
        p.setListAlign('left')
    }
    const rightListText = () => {
        p.setListAlign('right')
    }

    const toggleNum = () => {
        p.setNumberedList(!p.numberedList)
    }

    const biggerMargin = () => {
        p.setBranchMargin(p.branchMargin + 8)
    }

    const smallerMargin = () => {
        p.setBranchMargin(p.branchMargin - 8)
    }

    const toggleBranchBkColor = () => {
        p.setIsBranchBkColor(!p.isBranchBkColor)
        p.setBranchBKColor(p.getBranchBkColor())
    }

    

    return (
        <div className={p.getCls('navbar')}>
            {isVisible && <div className={p.getCls('content')}>
                {/* navbar branch */}
                <Brand p={p} />
                {userController.token && userController.userCard &&
                    <div className="user-welcome" style={{ fontSize: 20 }}>
                        welcome, <b>{userController.userCard.name.fname}</b>
                    </div>
                }
                <div className={p.getCls('line-1')}>
                    {/* nav links  */}
                    <NavLinks p={p} userController={userController} />
                    {/* login form */}
                    {!userController.token &&
                        <Login p={p} userController={userController} />
                    }
                    {/* logout btn */}
                    {userController.token &&
                        <span onClick={handleLogOut} className={p.getCls('navbar-logout')}>logout</span>
                    }
                </div>
            </div>}
            {/* nav actions */}
            <div className={p.getCls('nav-actions')}>
                {/* branches list branch menu toggler */}
                <span className="action-icon" onClick={branchesListToggleBranchMenu}>
                    <i className="fas fa-th-list"></i>
                </span>
                {/* night mode toggle */}
                <span onClick={toggleNight} className="action-icon" >
                    <i className="fas fa-moon"></i>
                </span>
                {/* bigger font action */}
                <span onClick={biggerFont} className="action-icon" >
                    <i className="fas fa-font" style={{ fontSize: 16 }}></i>
                </span>
                {/* smaller font actions */}
                <span onClick={smallerFont} className="action-icon" >
                    <i className="fas fa-font" style={{ fontSize: 12 }}></i>
                </span>
                {/* bigger margin action */}
                <span onClick={biggerMargin} className="action-icon" >
                    <i className="fas fa-text-height" ></i>
                </span>
                {/* smaller margin actions */}
                <span onClick={smallerMargin} className="action-icon" >
                    <i className="fas fa-text-height" style={{ fontSize: 12 }}></i>
                </span>
                {/* navbar toggler */}
                <span className="action-icon" onClick={toggleNav}>
                    <i className="fas fa-sliders-h"></i>
                </span>
            </div>
            {/* nav actions line 2 */}
            <div className={p.getCls('nav-actions')}>
                <span className="action-icon" onClick={leftListText}>
                    <i className="fas fa-align-left"></i>
                </span>
                <span className="action-icon" onClick={centerListText}>
                    <i className="fas fa-align-center"></i>
                </span>
                <span className="action-icon" onClick={rightListText}>
                    <i className="fas fa-align-right"></i>
                </span>
                <span className="action-icon" onClick={toggleNum}>
                    <i className="fas fa-sort-numeric-down"></i>
                </span>
                <Link to={'/html/'} className="action-icon">
                    <i className="fab fa-html5"></i>
                </Link>

                <span className="action-icon" onClick={toggleBranchBkColor}>
                    <i className="fas fa-fill"></i>
                </span>

            </div>
        </div>
    )

    function handleLogOut() {
        localStorage.removeItem('token')
        localStorage.removeItem('userCard')
        userController.setUserToken(null)
        userController.setUserCard(null)
    }
}

export default Navbar
