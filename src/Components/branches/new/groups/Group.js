import { cleanup } from '@testing-library/react'
import React, { useState, useEffect } from 'react'
import List from './List'
import Input from './Input'

function Group(props) {
    const { p } = props
    let { ex } = props
    const getCls = (base) => { return p.getCls('G2WLWX-' + base) }

    const [vs, sVs] = useState(false)
    const [rGroups, setRGroups] = useState([])
    const [newGName, setNewGName] = useState(null)
    

    
   ex = {...ex,
    newGName, setNewGName, rGroups, setRGroups
   }
    return (
        <div className={getCls('wrapper')}>
            <div className={getCls('title')}>
                <h2
                    className={getCls('tog-ti')}
                    onClick={() => { sVs(!vs) }}>
                    Groups
                </h2>
                {vs &&
                    <div className={getCls('fMWt94')}>
                        <Input ex={ex} p={p} />
                        <List ex={ex} p={p} />
                    </div>
                }

            </div>

        </div>
    )
}

export default Group
