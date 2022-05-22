import { React, useEffect, useState } from 'react'
import ReactEmbedGist from 'react-embed-gist';
import ReactAudioPlayer from 'react-audio-player';
import { Player } from 'video-react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Input1 from '../../Inputs/input1'

import { Link } from 'react-router-dom'
import './single.css'
import { tokenGet, tokenPatch, tokenPost } from '../../../utils/functions';
function Single(props) {
    const { branch, isDark, apiBase, location, setData, setEdit, setBranch, selectedBranches, setSelected, p, counted, ex } = props
    const originTitle = ex.branchTitle
    const getCls = (base) => { return p.getCls('xEzOkLwAp64vOO2CGf-' + base) }
    const [isDeleting, setDeleting] = useState(false)
    const [isMoving, setMoving] = useState(false)
    const [selectedBranch, setIsSelected] = useState(false)
    const [isExMenu, setIsExMenu] = useState(false)
    const [isPinned, setIsPinned] = useState(branch.pinned)
    const [isPositive, setIsPositive] = useState(branch.positive)
    const [nBranchName, setNBranchName] = useState(branch.name)
    const [oldBName, setOldBName] = useState(branch.name)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [info, setInfo] = useState(false)
    // selected groups
    const [sGroups, setSGroups] = useState([])
    // new group name input
    const [nGroupName, setNGroupName] = useState('')
    // result groups 
    const [rGroups, setRGroups] = useState([])
    // isLoading 
    const [selGroupLoading, setSelGroupLoading] = useState(true)
    // selected People
    const [sPeople, setSPeople] = useState([])
    // new person name input
    const [nPersonName, setNPersonName] = useState('')
    // result people 
    const [rPeople, setRPeople] = useState([])
    // isLoading 
    const [selPeopleLoading, setSelPeopleLoading] = useState(true)
    // branch has children : 
    let hasChild = false
    if (branch && branch.children && branch.children.length > 0)
        hasChild = true

    useEffect(() => {

        // set selected groups
        tokenPost(p.apiBase + '/group/many', { ids: branch.groups }, p.token)
            .then((d) => {
                setSGroups(d)
                setSelGroupLoading(false)
            })

    }, [])

    useEffect(() => {
        tokenPost(p.apiBase + '/person/many', { ids: branch.persons }, p.token)
            .then((d) => {
                setSPeople(d)
                setSelPeopleLoading(false)
            })

    }, [])



    const branchesListToggleBranchMenu = () => {
        p.setBranchesListBranchMenu(!p.branchesListIsBranchMenu)
    }

    const branchDir = () => {
        if (branch.lang == 'ar') return 'rtl'
        else return 'ltr'
    }

    const handleBranchEdit = () => {
        setEdit(true)
        setBranch(branch)
    }
    const handleMoveBranch = (dir) => {
        setMoving(true)
        const url = apiBase + '/branch/move?id=' + branch._id + '&dir=' + dir

        console.log(url)

        tokenGet(url, { token: p.token }).then((d) => {
            console.log(d)
            // fetch new branches . 
            let url
            if (location.length > 0) {
                url = url = apiBase + '/branch?id=' + location
                tokenGet(url, { token: p.token }).then((d) => {
                    setData(d)
                    setMoving(false)
                })
            } else {
                url = url = apiBase + '/branch'
                tokenGet(url, { token: p.token }).then((e) => {
                    // extract root branches : 
                    const rootBranches = e.filter((b) => {
                        return b.origin == null
                    })
                    setData(rootBranches)
                    setMoving(false)
                })
            }
        })
    }

    const handleBranchRemove = () => {
        setDeleting(true)
        const url = apiBase + '/branch?id=' + branch._id + '&complete=true'
        deleteFunc(url).then(e => {
            return e.json
        }).then(e => {
            // fetch new branches . 
            let url
            if (location && location.length)
                url = apiBase + '/branch?id=' + location
            else url = apiBase + '/branch'
            fetch(url).then(d => {
                return d.json()
            }).then(e => {
                if (location && location.length > 0)
                    setData(e)
                else {
                    // extract root branches : 
                    // extract root branches : 
                    const rootBranches = e.filter((b) => {
                        return b.origin == null
                    })
                    setData(rootBranches)

                }
            })
        })
    }
    const handleSelectedBranch = () => {
        // update selected branches status

        // check if the branch already selected to remove . 
        if (selectedBranch) {
            const se = selectedBranches.filter((b) => {
                return b !== branch
            })
            setSelected(se)
            setIsSelected(false)
        } else {
            // new branch to array
            const temp = selectedBranches
            temp.push(branch)
            setSelected(temp)
            setIsSelected(true)
        }

    }

    const getCounter = () => {
        return (
            <div className={getCls('cW5I2ewdL')} style={{ textAlign: `${p.listAlign}` }}>
                <div className={getCls('wqN7qIpfw')} >
                    <span>{counted}</span>
                </div>
            </div>
        )
    }


    const getTextContent = () => {
        let inner = { __html: nBranchName.replace("<br>", "").replace(/\n\n/g, "<br>").replace(/\n/g, "<br>") }
        return (
            <div className={getCls('wrapper')} style={{ textAlign: `${p.listAlign}` }}>
                {/* counter  */}
                {p.numberedList && getCounter()}
                {/* link */}
                <Link to={"/" + branch._id} dangerouslySetInnerHTML={inner} className={`link branch-name ${isDark ? "dark-link" : "light-link"}`} style={{ direction: `${branchDir()}`, }}>
                </Link>
                {/* has child  */}
                {hasChild &&<i onClick={branchesListToggleBranchMenu}  className="fas fa-ellipsis-h" style={{marginBottom: 4, fontSize: 10}}></i>}

            </div>
        )
    }

    const getYoutubeSource = () => {
        return "https://www.youtube.com/embed/" + branch.name
    }

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    const getYoutubeContent = () => {
        // check client width : 
        if (getWindowDimensions().width > 600) {
            return <div className="youtube-container">
                <iframe width="560" height="315" src={getYoutubeSource()} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        } else {
            return <div className="youtube-container">
                <iframe width="300" height="250" src={getYoutubeSource()} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen='true'></iframe>
            </div>
        }
    }

    const getGistContent = () => {
        return <ReactEmbedGist gist={branch.name} titleClass="gist__title"
            contentClass="gist__content" />
    }

    const getOriginName = () => {
        return originTitle[0]
    }

    const getSoundName = () => {
        console.log(originTitle);
        return (
            <div className={getCls('zhwiWnUPj')}>
                {  branch.extra && branch.extra.songName &&
                    <div className={getCls('songName1')}>
                        {branch.extra.songName} - {getOriginName()}
                    </div>
                }
            </div>
        )
    }

    const getEWidth = () => {
        return 80
    }


    const getSoundContent = () => {
        return (
            <div className={getCls('q2Qj')}>
                <div className={getCls('dtl')}>
                    {getSoundName()}
                </div>
                <AudioPlayer
                    src={branch.name}
                // other props here
                />
            </div>
        )

    }

    const getImageContent = () => {
        // check client width : 
        if (getWindowDimensions().width > 600) {
            return <img style={{ maxWidth: 800 }} src={branch.name} alt="" />
        } else {
            return <img style={{ width: 300 }} src={branch.name} alt="" />
        }
    }

    const getVideoContent = () => {
        const e = <Player className="video-player">
            <source src={branch.name} />
        </Player>
        return e
    }
    const getLinkContent = () => {
        if (branch.extra && branch.extra.name) {
            const e = <a href={branch.name} className={isDark ? 'dark-link' : 'light-link'}>{branch.extra.name}</a>
            return e
        }

        const e = <a href={branch.name} className={isDark ? 'dark-link' : 'light-link'}>{branch.name}</a>
        return e
    }

    const getBranch = () => {
        let content;
        if (branch.type === 'text') {
            content = getTextContent()
        }
        if (branch.type === 'image') {
            content = getImageContent()
        }

        if (branch.type === 'youtube') {
            content = getYoutubeContent()
        }
        if (branch.type === 'gist') {
            content = getGistContent()
        }
        if (branch.type === 'sound') {
            content = getSoundContent()
        }
        if (branch.type === 'video') {
            content = getVideoContent()
        }
        if (branch.type === 'link') {
            content = getLinkContent()
        }

        return content
    }

    const branchExMenu = () => {
        setIsExMenu(!isExMenu)
    }

    const togglePinAPI = () => {
        tokenGet(p.apiBase + '/branch/tPinned?id=' + branch._id, { token: p.token }).then((d) => {
            setIsPinned(d.pinned)
            sendSuccess('pinned : ' + d.pinned)
        })
    }
    const togglePosAPI = () => {
        tokenGet(p.apiBase + '/branch/positive?id=' + branch._id, { token: p.token }).then((d) => {
            setIsPositive(d.positive)
            sendSuccess('positive : ' + d.positive)
        })
    }

    const getPinned = () => {
        if (!isPinned) {
            return (<div className={getCls('pinned')}>
                <span className='4Wt'>pinned</span>
                <span className="pinToggler" onClick={() => { togglePinAPI() }}>
                    <i className="fas fa-toggle-off"></i>
                </span>
            </div>)
        } else {
            return (<div className={getCls('pinned')}>
                <span>pinned</span>
                <span className="pinToggler" onClick={() => {
                    togglePinAPI()
                }}>
                    <i className="fas fa-toggle-on"></i>
                </span>
            </div>)
        }
    }

    const getPositive = () => {
        if (!isPositive) {
            return (<div className={getCls('positive')}>
                <span className='4Wt'>positive</span>
                <span className="posToggler" onClick={() => { togglePosAPI() }}>
                    <i className="fas fa-toggle-off"></i>
                </span>
            </div>)
        } else {
            return (<div className={getCls('positive')}>
                <span>positive</span>
                <span className="posToggler" onClick={() => { togglePosAPI() }}>
                    <i className="fas fa-toggle-on"></i>
                </span>
            </div>)
        }
    }


    /* 

    state  . 
    groups
    groupName
    selectedGroups

    - get all groups from the db 
    - create input to handle user input
    - filter groups by input
    - selection section
        - dis select on click o
    - results section


    - get branch groups to selected groups

    
    
    */

    const getRootActions = () => {
        return (
            <div className="branch-actions">


                {/* change position */}
                {!isMoving && <i className="fas fa-arrow-up branch-action branch-arrow-up" onClick={() => {
                    handleMoveBranch(1)
                }}></i>}
                {!isMoving && <i className="fas fa-arrow-down branch-action branch-arrow-down" onClick={() => {
                    handleMoveBranch(0)
                }}></i>}

                {/* delete */}
                {!isDeleting && <i className="fas fa-eraser branch-action branch-remove" onClick={() => {
                    handleBranchRemove()
                }}></i>}

                {/* show nested  */}
                <Link to={'/nested/' + branch._id} className={p.getCls('link')}><i className="fas fa-expand-alt branch-action" ></i></Link>

                {/* expanded Menu */}
                {!isExMenu && <i onClick={branchExMenu} className="fas fa-caret-square-down branch-action"></i>}

                {/* select */}
                {selectedBranch && <i className="far fa-check-square checkbox" onClick={() => {
                    handleSelectedBranch()
                }}></i>}
                {!selectedBranch && <i className="far fa-square checkbox" onClick={() => {
                    handleSelectedBranch()
                }}></i>}


            </div>
        )
    }

    function sendSuccess(msg) {
        setInfo(true)
        setSuccess(msg)
        setTimeout(() => {
            setInfo(false)
            setSuccess(false)
        }, 3000)
    }

    const saveNewName = () => {
        tokenPatch(p.apiBase + '/branch', { id: branch._id, name: nBranchName }, p.token).then((d) => {
            branch.name = d.name
            sendSuccess('Name Changed')
        })
    }

    function toggleGroup(group) {
        // remove group from the branch 
        tokenPost(p.apiBase + '/branch/toggleGroup', { id: branch._id, group: group._id }, p.token).then((d) => {
            setSGroups(d.groups)
        })
    }
    function togglePerson(person) {
        // remove group from the branch 
        tokenPost(p.apiBase + '/branch/togglePerson', { id: branch._id, person: person._id }, p.token).then((d) => {
            console.log(d);
            setSPeople(d.persons)
        })
    }

    function getSelectedGroups() {
        return (
            <div className={getCls('selectedGroups')}>
                {!selGroupLoading && <div>
                    {sGroups.map(group => (
                        <div
                            key={group._id}
                            className={getCls('group0')}
                            onClick={() => { toggleGroup(group) }}
                        >
                            <span className={getCls('v04TWL')}><i className="fas fa-check"></i></span>
                            <span className='grGP'>{group.name}</span>
                        </div>
                    ))}
                </div>}

            </div>
        )
    }

    function getSelectedPeople() {
        return (
            <div className={getCls('selectedGroups')}>
                {!selPeopleLoading && <div>
                    {sPeople.map(group => (
                        <div
                            key={group._id}
                            className={getCls('group0')}
                            onClick={() => { togglePerson(group) }}
                        >
                            <span className={getCls('v04TWL')}><i className="fas fa-check"></i></span>
                            <span className='grGP'>{group.fname}</span>
                        </div>
                    ))}
                </div>}

            </div>
        )
    }

    function groupEditChange(e) {
        const val = e.target.value
        setNGroupName(val)
        // get all groups from the db .
        tokenGet(p.apiBase + '/group/search?q=' + val, { token: p.token }).then((d) => {
            setRGroups(d)
            console.log(d)
        })
    }
    function personEditChange(e) {
        const val = e.target.value
        setNPersonName(val)
        // get all groups from the db .
        tokenGet(p.apiBase + '/person/search?q=' + val, { token: p.token }).then((d) => {
            setRPeople(d)
        })
    }

    function handleNewGroup(group) {
        // toggle group to branch 
        toggleGroup(group)
    }
    function handleNewPerson(person) {
        // toggle group to branch
        togglePerson(person)
    }

    function handleNewInputGroup() {
        tokenPost(p.apiBase + '/group', { name: nGroupName }, p.token).then((d) => {
            const temp = sGroups
            temp.push(d)
            setSGroups(temp)
        }
        )
    }
    function handleNewInputPerson() {
        tokenPost(p.apiBase + '/person', { fname: nPersonName }, p.token).then((d) => {
            const temp = sPeople
            temp.push(d)
            setSPeople(temp)
        }
        )
    }

    function getInputGroups() {
        return (
            <div className={getCls('kdW3')}>
                {/* input form */}
                <div className={getCls('form')}>
                    <Input1 value={nGroupName} placeholder='group name' type='text' onChange={(e) => { groupEditChange(e) }} />
                    <span className={getCls('lRb4')} onClick={handleNewInputGroup}>New</span>
                </div>
                {/* result container */}
                <div className={getCls('result')}>
                    {rGroups && rGroups.length > 0 && rGroups.map(g => (
                        <div key={g._id} className='GV' onClick={() => { handleNewGroup(g) }}>
                            {g.name}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    function getInputPeople() {
        return (
            <div className={getCls('kdW3')}>
                {/* input form */}
                <div className={getCls('form')}>
                    <Input1 value={nPersonName} placeholder='person name' type='text' onChange={(e) => { personEditChange(e) }} />
                    <span className={getCls('lRb4')}
                        onClick={() => { handleNewInputPerson() }}>New</span>
                </div>
                {/* result container */}
                <div className={getCls('result')}>
                    {rPeople.map(g => (
                        <div key={g._id} className='GV' onClick={() => { handleNewPerson(g) }}>
                            {g.fname}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    function getGroupsSection() {
        // selected groups section
        return (
            <div className={getCls('OcnAq')}>
                {getSelectedGroups()}
                {getInputGroups()}
            </div>
        )
    }

    function getPeopleSection() {
        // selected groups section
        return (
            <div className={getCls('OcnAq')}>
                {getSelectedPeople()}
                {getInputPeople()}
            </div>
        )
    }

    const setDir = () => {
        if (branch.lang === 'ar') return 'rtl'
        else return 'ltr'
    }
    const setTextAlign = () => {
        if (branch.lang === 'ar') return 'right'
        else return 'left'
    }

    const handleNameChange = (e) => {
        setNBranchName(e.target.innerText)
    }

    const getExMenu = () => {
        return (
            <div className={getCls('wrapper1')}>
                {/* close icon */}
                <i onClick={branchExMenu} className="far fa-times-circle branch-action"></i>
                {info && <div className={getCls('info-section')}>
                    {error && <div className={getCls('error-section')}>
                        {error}
                    </div>}
                    {success && <div className={getCls('success-section')}>
                        {success}
                    </div>}
                </div>}
                {/* name change */}
                <div className={getCls('input') + ' exMenuItem newNameEdit'}>

                    {/* <Input1 p={p} placeholder={branch.name} value={nBranchName} onChange={(e) => { setNBranchName(e.target.value) }} /> */}

                    <div className={getCls('edit-branch-wrapper')}>
                        <div className={getCls('edit-container')}>
                            <div contentEditable="true" id="branchName" className="input-name" onInput={(e) => handleNameChange(e)} style=
                                {
                                    { direction: `${setDir()}`, textAlign: `${setTextAlign()}` }}>
                                {oldBName}
                            </div>
                        </div>

                        <div className={getCls('submit-edit')}>
                            <span className={getCls('submitBranchName')} onClick={() => { saveNewName() }}>Save</span>
                        </div>
                    </div>


                </div>
                {/* pinned change */}
                <div className={getCls('pinned') + ' exMenuItem'}>
                    {getPinned()}
                </div>
                {/* positive change */}
                <div className={getCls('positive') + ' exMenuItem'}>
                    {getPositive()}
                </div>
                {/* groups change */}
                <div className={getCls('groups')}>
                    <span><b>Groups</b></span>
                    {getGroupsSection()}
                </div>
                <div className={getCls('people')}>
                    <span><b>People</b></span>
                    {getPeopleSection()}
                </div>
                {/* TODO Groups Tags and People */}
            </div>
        )
    }

    const gBranchActions = () => {
        return (
            <div className={getCls('actions-container')}>
                {p.branchesListIsBranchMenu &&
                    <div className={getCls('wrapper0')}>
                        {!isExMenu && getRootActions()}
                        {isExMenu && getExMenu()}
                    </div>
                }
            </div>
        )
    }

    return (
        <div className={getCls('branch-container')} style={{ marginBottom: p.branchMargin, backgroundColor: p.branchBKColor }}>
            {getBranch()}
            {gBranchActions()}
        </div>
    )
}


async function deleteFunc(url = '') {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
}


export default Single
