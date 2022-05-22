import React, { useState } from 'react'
import './search.css'
import getReqHeader from '../../../utils/getReqHeader'
import BranchItem from '../branch/BranchItem'

function BranchSearch(props) {
    const { p } = props
    const [q, setQ] = useState('')
    const [inProg, setProg] = useState(false)
    const [response, setRes] = useState(null)

    const handleCommandSearch = (v) => { 
        if (v.trim().length <= 0) {
            // clean response. 
            setRes(null)
            return
        }
        // set prog
        setProg(true)
        // send request
        const url = p.apiBase + '/branch?command=' + v
        console.log(url);
        getReqHeader(url, { token: p.token }).then((d) => {
            // set response
            setRes(null)
            setRes(d)
            // end progress
            setProg(false)
        })

    }

    const handleSearch = (e) => {
        const v = e.target.value
        // check q
        if (e.target.value.trim().length <= 0) {
            // clean response. 
            setRes(null)
            return
        }
        // check command search . 
        if(v[0] === '#'){
            handleCommandSearch(v.replace('#', ''))
            return
        }
        // set url from state on input text changed
        let url = p.apiBase + '/branch/search?q=' + q
        if (e) {
            // set state
            setQ(e.target.value)
            // set url from the input text 
            url = p.apiBase + '/branch/search?q=' + e.target.value
        }
        // set prog
        setProg(true)
        // send request
        getReqHeader(url, { token: p.token }).then((d) => {
            // set response
            setRes(null)
            setRes(d)
            // end progress
            setProg(false)
        })
    }

    let latestCount = 1
    return (
        <div className={p.getCls('search-branch-wrapper')}>
            <h3>Search</h3>
            <div className={p.getCls('search-branch-container')} >
                <input type="text" onChange={(e) => handleSearch(e)} className={p.getCls('search-branch-q-input')} />
                <span className={p.getCls('search-branch-q-search')} onClick={handleSearch} >
                    <i className="fas fa-search"></i>
                </span>
            </div>
            {inProg &&
                <i className="fas fa-spinner spinner"></i>
            }
            {response && response.map(branch => (
                <BranchItem key={latestCount++} position={latestCount} branch={branch} p={p} />
            ))}

        </div>
    )
}

export default BranchSearch
