import React, { useEffect, useState } from 'react'
import getReqHeader from '../../../utils/getReqHeader'
import './style.css'
import BranchItem from '../branch/BranchItem'

function LatestBranches(props) {
    const { p } = props
    const getCls = (base) => { return p.getCls('RBfdg-' + base) }
    const [latest, setLatest] = useState([])
    const [isReady, setReady] = useState(false)
    const [isVisi, setIsVisi] = useState(false)
    useEffect(() => {
        const header = { token: p.token }
        const url = p.apiBase + '/branch/latest?limit=300'
        getReqHeader(url, header).then((d) => {
            // create temp arr
            const temp = []
            d.forEach(branch => {
                if (branch.type === 'text')
                    temp.push(branch)
            });
            setLatest(temp)
            setReady(true)
        })
    }, [])
    let latestCount = 1


    const toggleLatest = () => {
        setIsVisi(!isVisi)
    }

    return (
        <div className={p.getCls('latest-branches-wrapper')} >
            <h3 onClick={toggleLatest} className={getCls('title')}>Latest Branches</h3>
            {isVisi && isReady  &&
                <div className={p.getCls('latest-branches-right-side')}  >
                    {latest.map(branch => (
                        <BranchItem key={latestCount++} position={latestCount} branch={branch} p={p} />
                    ))}
                </div>
            }
            {!isReady && isVisi && 
                <i className="fas fa-spinner spinner"></i>
            }
        </div>
    )
}

function getRandId() {
    return Math.random() * (200000 - 0) + 0
}

export default LatestBranches
