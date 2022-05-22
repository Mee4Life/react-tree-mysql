import React, { useState } from 'react'
import './rightSide.css'
import BranchSearch from './search/Search'
import LatestBranches from './latest/LatestBranches'

function RightPanel(props) {
    // set state : 
    const [isVisible, setVisible] = useState(false)
    const { p } = props
    // append right side panel status
    p.rightVisible = isVisible
    p.setRightVisible = setVisible

    return (
        <div className={p.getCls('right-side-wrapper')}>
            {p.navSts.isVisibleNav && isVisible &&
                <div className={p.getCls('right-side-actions')}>
                    <span onClick={() => { setVisible(!isVisible) }} className={p.getCls('right-side-action')}><i className="far fa-times-circle"></i></span>
                </div>
            }
            {p.navSts.isVisibleNav && !isVisible &&
                <div className={p.getCls('right-side-toggle')}>
                    <span onClick={() => { setVisible(!isVisible) }} className={p.getCls('right-side-action')}><i className="fas fa-search"></i></span>
                </div>
            }
            {p.navSts.isVisibleNav && isVisible &&
                <div className={p.getCls('right-side-bar')}>
                    <div className={p.getCls('right-side-container')}>
                        <div className={p.getCls('right-side-header')}>
                            <BranchSearch p={p} />
                        </div>
                        <div className={p.getCls('right-side-latest')}>
                            <LatestBranches p={p} />
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}

export default RightPanel
