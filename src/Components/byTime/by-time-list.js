import React from 'react'
import ByTimeItem from './by-time-item'

function ByTimeList(props) {
    // extract data from the state 
    const branches = props.ex.targetBranches
    const p = props.ex.p


    // functions
    const getCls = (base) => {
        return p.getCls('by-time-list-' + base)
    }

    const ex = {
        p
    }

    return (
        <div className={getCls('wrapper')}>
            {branches && branches.map((branch) => (
                <ByTimeItem ex={ex} branch={branch} />
            ))}
        </div>
    )
}

export default ByTimeList
