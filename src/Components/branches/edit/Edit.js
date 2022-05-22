import React, { useState } from 'react'
import '../new/new.css'

function Edit(props) {
    let { location, isDark, apiBase, setUpToDate, branch, setEdit } = props
    const [newBranchPending, setNewBranchPending] = useState(false)
    const [branchName, setBranchName] = useState('')
    const [linkName, setLinkName] = useState('')
    const [oldName, setOldName] = useState(branch.name)
    const [oldLinkName, setOldLinkName] = useState(
        branch.extra && branch.extra.name ? branch.extra.name : branch.name
    )
    const [branchType, setBranchType] = useState(branch.type)
    if (!location) location = ''



    const submitClick = () => {
        setNewBranchPending(true)
        const url = apiBase + '/branch'
        const data = {
            id: branch._id,
            name: branchName,
            type: branchType,
            origin: location
        }

        if(branchType === 'link'){
            data['extra'] ?  branchType = 'link' : data['extra'] = {}
            data['extra']['name'] = linkName
        }

        postData(url, data).then(res => {
            setNewBranchPending(false)

            // fetch new branches . 
            let url
            location.length > 0 ? url = apiBase + '/branch?id=' + location : url = apiBase + '/branch'
            fetch(url).then(d => {
                return d.json()
            }).then(e => {
                if (location.length > 0)
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
                setEdit(false)
            })

        })
    }

    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    const handleNameChange = (e) => {
        setBranchName(e.target.innerText)
    }
    const handleLinkNameChange = (e) => {
        setLinkName(e.target.innerText)
    }

    

    const branchTypeChange = (e) => {
        setBranchType(e.target.value)
    }


    const getSelectBranchType = () => {
        return (
            <select className="select-branch-type" name="type" onChange={(e) => {
                branchTypeChange(e)
            }}>
                <option value={branchType} selected="true">{branchType}</option>
                <option value="text">text</option>
                <option value="image">image</option>
                <option value="link">link</option>
                <option value="gist">gist</option>
                <option value="sound">sound</option>
                <option value="youtube">youtube</option>
                <option value="video">video</option>
            </select>
        )
    }


    const getEditLinkForm = () => {
        const form =
            (<div className="new-branch-form">
                <h2>Edit Link</h2>
                <div contentEditable="true" id="branchName" className="input-name" onInput={(e) => handleNameChange(e)}> {oldName} </div>
                <div contentEditable="true" className="input-name" onInput={(e) => handleLinkNameChange(e)}> {oldLinkName} </div>
                <button type="submit" onClick={() => {setEdit(false)}} className={`save-branch-btn ${isDark ? "cancel-edit-branch-dark" : "cancel-edit-branch-light"}`}>cancel</button>
                {getSelectBranchType()}
                <button type="submit" onClick={submitClick} className={`save-branch-btn ${isDark ? "save-branch-dark" : "save-branch-light"}`}>Save</button>
            </div>)
            return form
    }

    const getInputForm = () => {
        let form =
            (<div className="new-branch-form">
                <h2>Edit</h2>
                <div contentEditable="true" id="branchName" className="input-name" onInput={(e) => handleNameChange(e)}> {oldName} </div>
                {getSelectBranchType()}
                <button type="submit" onClick={submitClick} className={`save-branch-btn ${isDark ? "save-branch-dark" : "save-branch-light"}`}>Save</button>
            </div>)
        if (branchType === 'link') {
            form = getEditLinkForm()
        }
        return form
    }

    const getSpinner = (e) => {
        return (
            <i className="fas fa-spinner spinner save-branch-spinner"></i>
        )
    }

    return (
        <div className={`form-container ${isDark ? "dark-form-container" : "light-form-container"}`}>
            {!newBranchPending && getInputForm()}
            {newBranchPending && getSpinner()}
        </div>
    )
}

export default Edit
