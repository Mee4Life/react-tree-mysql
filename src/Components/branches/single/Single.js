import { React, useEffect, useState } from 'react'
import axios from 'axios';
import ReactEmbedGist from 'react-embed-gist';
import ReactAudioPlayer from 'react-audio-player';
import { Player } from 'video-react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Input1 from '../../Inputs/input1'

import { Link } from 'react-router-dom'
import './single.css'
import { tokenGet, axiosTokenJsonHeader, tokenPatch, tokenPost } from '../../../utils/functions';
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
    // result groups 
    const [rTags, setRTags] = useState([])
    // isLoading 
    const [selGroupLoading, setSelGroupLoading] = useState(true)
    // selected People
    const [sPeople, setSPeople] = useState([])
    // selected tags
    const [sTags, setSTags] = useState([])
    // new person name input
    const [nPersonName, setNPersonName] = useState('')
    // new tag name input
    const [nTagName, setNTagName] = useState('')
    // result people 
    const [rPeople, setRPeople] = useState([])
    // isLoading 
    const [selPeopleLoading, setSelPeopleLoading] = useState(true)
    // isLoading 
    const [selTagsLoading, setSelTagsLoading] = useState(true)
    // branch has children : 
    let hasChild = false
    if (branch && branch.children && branch.children.length > 0)
        hasChild = true

    useEffect(() => {

        // set selected groups
        tokenGet(p.apiBase2 + '/branches/branch-groups?id=' + branch.id, { Authorization: p.token })
            .then((d) => {
                setSGroups(d)
                setSelGroupLoading(false)
            })

    }, [])

    useEffect(() => {
        tokenGet(p.apiBase2 + '/branches/branch-people?id=' + branch.id, { Authorization: p.token })
            .then((d) => {
                setSPeople(d)
                setSelPeopleLoading(false)
            })

    }, [])

    useEffect(() => {
        tokenGet(p.apiBase2 + '/branches/branch-tags?id=' + branch.id, { Authorization: p.token })
            .then((d) => {
                setSTags(d)
                setSelTagsLoading(false)
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
        const url = p.apiBase2 + '/branches?id=' + branch.id
        deleteFunc(url, p.token).then(e => {
            // fetch new branches . 
            let url
            if (typeof (location) === 'number')
                url = p.apiBase2 + '/branches/nested?id=' + location
            else url = p.apiBase2 + '/branches/root'
            tokenGet(url, { Authorization: p.token }).then(e => {
                setData(e)
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
                <Link to={"/" + branch.id} dangerouslySetInnerHTML={inner} className={`link branch-name ${isDark ? "dark-link" : "light-link"}`} style={{ direction: `${branchDir()}`, }}>
                </Link>
                {/* has child  */}
                {hasChild && <i onClick={branchesListToggleBranchMenu} className="fas fa-ellipsis-h" style={{ marginBottom: 4, fontSize: 10 }}></i>}

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
                {branch.extra && branch.extra.soundName &&
                    <div className={getCls('songName1')}>
                        {branch.extra.soundName} - {getOriginName()}
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
            const e = <a href={branch.name} target="_blank" className={isDark ? 'dark-link' : 'light-link'}>{branch.extra.name}</a>
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
        if (isPinned == 1) {
            axios.patch(p.apiBase2 + '/branches', { id: branch.id, pinned: 0 }, axiosTokenJsonHeader(p.token)).then(e => {
                sendSuccess('pinned : false')
                setIsPinned(0)
            }).catch(e => console.log(e))
        }
        else if (isPinned == 0) {
            axios.patch(p.apiBase2 + '/branches', { id: branch.id, pinned: 1 }, axiosTokenJsonHeader(p.token)).then(e => {
                sendSuccess('pinned : true')
                setIsPinned(1)
            }).catch(e => console.log(e))
        }
    }
    const togglePosAPI = () => {
        if (isPositive == 1) {
            axios.patch(p.apiBase2 + '/branches', { id: branch.id, positive: 0 }, axiosTokenJsonHeader(p.token)).then(e => {
                sendSuccess('positive : false')
                setIsPositive(0)
            }).catch(e => console.log(e))
        }
        else if (isPositive == 0) {
            axios.patch(p.apiBase2 + '/branches', { id: branch.id, positive: 1 }, axiosTokenJsonHeader(p.token)).then(e => {
                sendSuccess('positive : true')
                setIsPositive(1)
            }).catch(e => console.log(e))
        }

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
        tokenPatch(p.apiBase2 + '/branches', { id: branch.id, name: nBranchName }, p.token).then((d) => {
            branch.name = d.name
            sendSuccess('Name Changed')
        })
    }

    function toggleGroup(group) {
        // remove group from the branch 
        // todo change base and the posted data
        tokenPost(p.apiBase2 + '/branches/toggle-group', { branchID: branch.id, groupID: group.id }, p.token).then((d) => {
            // set selected groups
            tokenGet(p.apiBase2 + '/branches/branch-groups?id=' + branch.id, { Authorization: p.token })
                .then((d) => {
                    setSGroups(d)
                    setSelGroupLoading(false)
                })
        })
    }
    function togglePerson(person) {
        // remove group from the branch 
        tokenPost(p.apiBase2 + '/branches/toggle-person', { branchID: branch.id, personID: person.id }, p.token).then((d) => {
            // set selected people
            tokenGet(p.apiBase2 + '/branches/branch-people?id=' + branch.id, { Authorization: p.token })
                .then((d) => {
                    setSPeople(d)
                })
        })
    }
    function toggleTag(tag) {
        // remove tag from the branch 
        tokenPost(p.apiBase2 + '/branches/toggle-tag', { branchID: branch.id, tagID: tag.id }, p.token).then((d) => {
            // set selected people
            tokenGet(p.apiBase2 + '/branches/branch-tags?id=' + branch.id, { Authorization: p.token })
                .then((d) => {
                    setSTags(d)
                })
        })
    }

    function getSelectedGroups() {
        return (
            <div className={getCls('selectedGroups')}>
                {!selGroupLoading && <div>
                    {sGroups.map(group => (
                        <div
                            key={group.id}
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
    function getSelectedTags() {
        return (
            <div className={getCls('selectedTags')}>
                {!selTagsLoading && <div>
                    {sTags.map(tag => (
                        <div
                            key={tag.id}
                            className={getCls('group0')}
                            onClick={() => { toggleTag(tag) }}
                        >
                            <span className={getCls('v04TWL')}><i className="fas fa-check"></i></span>
                            <span className='grGP'>{tag.name}</span>
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
        tokenGet(p.apiBase2 + '/groups/search?q=' + val, { Authorization: p.token }).then((d) => {
            setRGroups(d)
        })
    }
    function tagEditChange(e) {
        const val = e.target.value
        setNTagName(val)
        // get all tags from the db .
        tokenGet(p.apiBase2 + '/tags/search?q=' + val, { Authorization: p.token }).then((d) => {
            setRTags(d)
        })
    }
    function personEditChange(e) {
        const val = e.target.value
        setNPersonName(val)
        // get all groups from the db .
        tokenGet(p.apiBase2 + '/people/search?q=' + val, { Authorization: p.token }).then((d) => {
            setRPeople(d)
        })
    }

    function handleNewGroup(group) {
        // toggle group to branch 
        toggleGroup(group)
    }
    function handleNewTag(tag) {
        // toggle group to branch 
        toggleTag(tag)
    }
    function handleNewPerson(person) {
        // toggle group to branch
        togglePerson(person)
    }

    function handleNewInputGroup() {
        tokenPost(p.apiBase2 + '/groups', { name: nGroupName }, p.token).then((d) => {
        }
        )
    }
    function handleNewInputPerson() {
        tokenPost(p.apiBase2 + '/people', { fname: nPersonName }, p.token).then((d) => {
        }
        )
    }
    function handleNewInputTag() {
        tokenPost(p.apiBase2 + '/tags', { name: nTagName }, p.token).then((d) => {
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
                        <div key={g.id} className='GV' onClick={() => { handleNewGroup(g) }}>
                            {g.name}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    function getInputTags() {
        return (
            <div className={getCls('kdW3')}>
                {/* input form */}
                <div className={getCls('form')}>
                    <Input1 value={nTagName} placeholder='tag name' type='text' onChange={(e) => { tagEditChange(e) }} />
                    <span className={getCls('lRb4')} onClick={handleNewInputTag}>New</span>
                </div>
                {/* result container */}
                <div className={getCls('result')}>
                    {rTags && rTags.length > 0 && rTags.map(t => (
                        <div key={t.id} className='GV' onClick={() => { handleNewTag(t) }}>
                            {t.name}
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
    function getTagsSection() {
        // selected tags section
        return (
            <div className={getCls('OcnAq')}>
                {getSelectedTags()}
                {getInputTags()}
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
                <div className={getCls('tags')}>
                    <span><b>Tags</b></span>
                    {getTagsSection()}
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


async function deleteFunc(url = '', token) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        headers: {
            'Authorization': token
        },
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
}


export default Single
