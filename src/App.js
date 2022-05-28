import './App.css'
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BranchView from './pages/Branch'
import TimeLine from './pages/TimeLine'
import ByTime from './pages/ByTime'
import BranchDtl from './pages/BranchDtl'
import Navbar from './Components/navbar/Navbar'
import useWindowDimensions from './utils/useWindowDimensions'
import getWHeader from './utils/getReqHeader'
import GroupsManager from './pages/groups/GroupsManager'
import GroupView from './pages/groups/single/GroupView'
import PersonView from './pages/people/person-view/PersonView'
import TagView from './pages/tags/view/TagView'
import TagManager from './pages/tags/TagsManager'
import PeopleView from './pages/people/PeopleManager'
import HTMLV from './pages/html/HTMLV'
import Footer from './Components/footer/Footer'

function App() {
  // extract local storage values functions
  const getIsDark = () => {
    return localStorage.getItem('isDark') &&
      localStorage.getItem('isDark') === "true"
  }
  const getFontSize = () => {
    let fSize = 20
    if (localStorage.getItem('fontSize'))
      fSize = parseInt(localStorage.getItem('fontSize'))
    return fSize
  }
  const getToken = () => {
    return localStorage.getItem('token')
  }
  const getUserCard = () => {
    return JSON.parse(localStorage.getItem("userCard"))
  }
  // setup app state
  const [isDark, setIsDark] = useState(getIsDark())
  const [token, setUserToken] = useState(getToken())
  const [userCard, setUserCard] = useState(getUserCard())
  const [fontSize, setFontSize] = useState(getFontSize())
  const [branchMargin, setBranchMargin] = useState(16)
  const [apiBase] = useState('http://3.120.11.152:8863') //3.120.11.152 localhost
  const [apiBase2] = useState('http://3.120.11.152:3000') //3.120.11.152 localhost
  const { height, width } = useWindowDimensions();
  const [isVisibleNav, setVisibleNav] = useState(false)
  const [listAlign, setListAlign] = useState('center')
  const [numberedList, setNumberedList] = useState(false)
  const [branchesListIsBranchMenu, setBranchesListBranchMenu] = useState(false)

  // branch background color
  const [isBranchBkColor, setIsBranchBkColor] = useState(true)
  const [branchBKColor, setBranchBKColor] = useState(getBranchBkColor())

  // get user status 
  useEffect(() => {
    if (token) {
      // check if it a valid token
      getWHeader(p.apiBase2 + '/users/status', { Authorization: userController.token })
        .then(d => {
          if (d.error) {
            // clean data from the local storage
            setUserToken(null)
            localStorage.removeItem('token')
            setUserCard(null)
            localStorage.removeItem('userCard')
            return
          }
          // update user card 
          userController.setUserCard(d.userCard)
        })
    }
  }, [])

  // function to get css class name base on the isDark variable
  const getCls = baseName => {
    let className = isDark ? baseName + ' ' + baseName + '-dark' : baseName + ' ' + baseName + '-light'
    width < 650 ? className = className + ' ' + baseName + '-' + 'sm' : className = className
    width <= 800 && width >= 650 ? className = className + ' ' + baseName + '-' + 'md' : className = className
    width > 800 ? className = className + ' ' + baseName + '-' + 'xl' : className = className
    return className
  }

  const p = {
    apiBase, token, apiBase2,
    isDark, setIsDark,
    height, width,
    getCls, fontSize,
    navSts: {
      isVisibleNav,
      setVisibleNav
    },
    branchesListIsBranchMenu, setBranchesListBranchMenu,
    listAlign, setListAlign,
    numberedList, setNumberedList,
    branchMargin, setBranchMargin,
    branchBKColor, setBranchBKColor,
    isBranchBkColor, setIsBranchBkColor,
    getBranchBkColor,


  }
  const userController = { token, setUserToken, userCard, setUserCard }
  const styleManager = { fontSize, setFontSize }


  return (
    <Router>
      <div className={getCls('app')}>
        {/* navbar */}
        <Navbar p={p} userController={userController} styleManager={styleManager} isVisible={isVisibleNav} setVisible={setVisibleNav} />


        <Switch>
          {/* routes before navi  */}
          <Route exact path="/html/:id">
            <HTMLV p={p} />
          </Route>

          <Route exact path="/people/:id">
            {token && <PersonView p={p} />}
            {!token && get404()}
          </Route>

          {/* routes after navbar */}
          <Route exact path="/people/">
            {token && <PeopleView p={p} />}
            {!token && get404()}
          </Route>
          <Route exact path="/tag/">
            {token && <TagManager p={p} />}
            {!token && get404()}
          </Route>
          <Route exact path="/tag/:id">
            {token && <TagView p={p} />}
            {!token && get404()}
          </Route>
          <Route exact path="/group/:id">
            {token && <GroupView p={p} />}
            {!token && get404()}
          </Route>
          <Route exact path="/group/">
            {token && <GroupsManager p={p} />}
            {!token && get404()}
          </Route>
          <Route exact path="/by-time/">
            {token && <ByTime p={p} />}
            {!token && get404()}
          </Route>
          <Route path="/timeline/:id">
            {token && <TimeLine p={p} />}
            {!token && get404()}
          </Route>
          <Route path="/timeline">
            {token && <TimeLine p={p} />}
            {!token && get404()}
          </Route>
          <Route path="/nested/:id">
            {token && <BranchDtl p={p} />}
            {!token && get404()}
          </Route>
          <Route path="/:id">
            {token && <BranchView p={p} />}
            {!token && get404()}
          </Route>
          <Route exact path="/">
            {token && <BranchView p={p} />}
            {!token && get404()}
          </Route>
        </Switch>


        {/* footer */}
        <Footer p={p} />
      </div>
    </Router>
  )


  function getBranchBkColor(toggleNight) {
    if (toggleNight) {
      if (isBranchBkColor) {
        if (!isDark) {
          return '#2d2d2d'
        } else {
          return '#eaeaea'
        }
      }
    }
    if (isBranchBkColor) {
      if (isDark) {
        return '#2d2d2d'
      } else {
        return '#eaeaea'
      }
    }
    return ''
  }



}

function get404() {

  return (
    <div className="404">
      <div className="404-icon">
        <i className="fas fa-fingerprint"></i>
      </div>
      Not Allowed to come here
    </div>
  )
}


export default App;
