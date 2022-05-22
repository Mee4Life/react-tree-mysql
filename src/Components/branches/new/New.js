import React, { useState } from 'react'
import './new.css'
import BranchLang from './BranchLang'
import Group from './groups/Group'
import Person from './persons/Person'
import Tag from './tags/Tag'
import Input1 from '../../Inputs/input1'
import {tokenPost} from '../../../utils/functions'





function New(props) {
    const { p } = props
    let getCls = (base) => { return p.getCls('new-section-' + base) }
    const [newBranchPending, setNewBranchPending] = useState(false)
    const [branchName, setBranchName] = useState('')
    const [branchType, setBranchType] = useState('text')
    const [linkName, setLinkName] = useState('')
    const [lang, setLang] = useState('ar')
    const [pinned, setPinned] = useState(false)
    const [pos, setPos] = useState(false)
    const [openedMenu, setOpenedMenu] = useState(false)
    const [seGroups, setSeGroups] = useState([])
    const [sePersons, setSePersons] = useState([])
    const [seTags, setSeTags] = useState([])
    const [expandNew, setExpandNew] = useState(false)
    const [soundName, setSoundName] = useState('')
    let { location: BranchLocation, isDark, apiBase, setUpToDate } = props
    if (!BranchLocation) BranchLocation = ''

    let ex = {
        seGroups, setSeGroups, sePersons, setSePersons, seTags, setSeTags
    }


    const setDir = () => {
        if (lang === 'ar') return 'rtl'
        else return 'ltr'
    }
    const setTextAlign = () => {
        if (lang === 'ar') return 'right'
        else return 'left'
    }

    const cleanForm = () => {
        const inp = document.getElementById('branchName')
        inp.innerHTML = ''
    }

    const submitClick = () => {
        // setNewBranchPending(true)
        const url = apiBase + '/branch'
        const data = {
            name: branchName,
            type: branchType,
            origin: BranchLocation,
            lang: lang,
            groups: seGroups,
            persons: sePersons,
            tags: seTags,
            pinned: pinned,
            positive: pos
        }


        // check link type to append link name to the extra
        if (branchType === 'link') {
            data['extra'] = {}
            data.extra['name'] = linkName
        }

        // check if type Song is added to add Name 
        if(branchType === 'sound'){
            data['extra'] = {}
            data.extra['songName'] = soundName
        }
    

        tokenPost(url, data, p.token).then(res => {
            setNewBranchPending(false)

            // fetch new branches . 
            let url
            BranchLocation.length > 0 ? url = apiBase + '/branch?id=' + BranchLocation : url = apiBase + '/branch'
            fetch(url).then(d => {
                return d.json()
            }).then(e => {
                if (BranchLocation.length > 0)
                    setUpToDate(e)
                else {
                    // extract root branches : 
                    // extract root branches : 
                    const rootBranches = e.filter((b) => {
                        return b.origin == null
                    })
                    setUpToDate(rootBranches)

                }
                setBranchType('text')
            })

        })

        cleanForm()

    }

    const handleNameChange = (e) => {
        setBranchName(e.target.innerText)
    }

    const branchTypeChange = (e) => {
        setBranchType(e.target.value)
    }


    const getSelectBranchType = () => {
        return (
            <select className="select-branch-type" name="type" onChange={(e) => {
                branchTypeChange(e)
            }}>
                <option value="text">text</option>
                <option value="image">image</option>
                <option value="sound">sound</option>
                <option value="video">video</option>
                <option value="link">Link</option>
                <option value="youtube">youtube</option>
                <option value="gist">gist</option>
            </select>
        )
    }



    const getTextInput = (title) => {
        return (
            <div>
                <h2>{title}</h2>
                {title === "Branch" && expandNew && <BranchLang setLang={setLang} branchType={branchType} lang={lang} />}
                <div contentEditable="true" id="branchName" className={getCls('input-name')} onInput={(e) => handleNameChange(e)} style={{ direction: setDir(), textAlign: setTextAlign() }} />
                <button type="submit" onClick={submitClick} className={`save-branch-btn ${isDark ? "save-branch-dark" : "save-branch-light"}`}>Save</button>
            </div>
        )
    }


    const getAudioInput = () => {
        return (
            <div>
                {/* title */}
                <h2>Song</h2>
                {/* link */}
                <Input1 type="text" placeholder='Song Link' value={branchName} onChange={(e) => setBranchName(e.target.value)} />
                {/* name */}
                <Input1 placeholder="Song Name" type="text" value={soundName} onChange={(e)=> {setSoundName(e.target.value)}}/>
                {/* submit */}
                <button type="submit" onClick={submitClick} className={`save-branch-btn ${isDark ? "save-branch-dark" : "save-branch-light"}`}>Save</button>
            </div>
        )
    }

    const getImageForm = () => {
        return (
            <div className="new-branch-form">
                <h2>Image</h2>
                <div contentEditable="true" id="branchName" className={getCls('input-name')} onInput={(e) => handleNameChange(e)} />
                <button type="submit" onClick={submitClick} className={`save-branch-btn ${isDark ? "save-branch-dark" : "save-branch-light"}`}>Save</button>
            </div>
        )
    }
    const handleLinkChange = (e) => {
        setBranchName(e.target.innerText)
    }
    const handleLinkNameChange = (e) => {
        setLinkName(e.target.innerText)
    }
    const getLinkForm = () => {
        return (
            <div className="new-branch-form">
                <h2>Link</h2>
                <div contentEditable="true" className={getCls('input-name')} onInput={(e) => handleLinkChange(e)}></div>
                <div contentEditable="true" className={getCls('input-name')} onInput={(e) => handleLinkNameChange(e)}></div>
                <button type="submit" onClick={submitClick} className={`save-branch-btn ${isDark ? "save-branch-dark" : "save-branch-light"}`}>Save</button>
            </div>
        )
    }

    const getSpinner = (e) => {
        return (
            <i className="fas fa-spinner spinner save-branch-spinner"></i>
        )
    }

    const toggleNew = () => {
        setOpenedMenu(!openedMenu)
    }


    const getPinnedPositive = () => {

        return (
            <div className={getCls('container')}>
                <div className={getCls('pinned')} onClick={() => { setPinned(!pinned) }}>
                    {!pinned && <i className="fas fa-ribbon"></i>}
                    {pinned && <i className="fas fa-ribbon" style={{ color: 'green' }}></i>}
                </div>
                <div className={getCls('pos')} onClick={() => { setPos(!pos) }}>
                    {!pos && <i className="far fa-minus-square"></i>}
                    {pos && <i className="far fa-plus-square" style={{ color: 'green' }}></i>}
                </div>
            </div>
        )
    }


    const toggleExpandNew = () => {
        setExpandNew(!expandNew)
    }
    return (
        <div className={getCls('W5DlnFPm77')}>
        {p.navSts.isVisibleNav && <div className={p.getCls('new-section')}>
            {openedMenu && <div onClick={toggleNew} className={getCls('closeNewIconContainer')}>
                <i className="fas fa-times-circle closeNewIcon"></i>
            </div>}{!openedMenu && <div onClick={toggleNew} className={getCls('NewIconContainer')}>
                <i className="fas fa-plus-circle addNewIcon"></i>
            </div>}
            {openedMenu && <div className="new-branch-form">
                <div className={`form-container ${isDark ? "dark-form-container" : "light-form-container"}`}>
                    
                    {!newBranchPending && expandNew && getSelectBranchType()}


                    {!newBranchPending && branchType === 'text' && getTextInput('Branch')}


                    <div className={getCls('wN9ogkd4R')} >
                        <span onClick={toggleExpandNew}><i className="far fa-caret-square-down"></i></span>
                        {expandNew &&  <Group ex={ex} p={p} />}
                        {expandNew && <Person ex={ex} p={p} />}
                        {expandNew && <Tag ex={ex} p={p} />}
                    </div>
                    {expandNew && getPinnedPositive()}
                    
                    {!newBranchPending && branchType === 'image' && getImageForm()}
                    {!newBranchPending && branchType === 'link' && getLinkForm()}
                    {!newBranchPending && branchType === 'video' && getTextInput('Video')}
                    {!newBranchPending && branchType === 'youtube' && getTextInput('YouTube')}
                    {!newBranchPending && branchType === 'sound' && getAudioInput()}
                    {!newBranchPending && branchType === 'gist' && getTextInput('Gist')}
                    {newBranchPending && getSpinner()}
                </div>
            </div>}
        </div>}
        </div>
    )
}

export default New
