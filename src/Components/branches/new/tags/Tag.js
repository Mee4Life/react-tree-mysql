import React, { useState, useEffect } from 'react'
import List from './List'
import Input from './Input'

function Tag(props) {
    const { p } = props
    let { ex } = props
    const getCls = (base) => { return p.getCls('G2WLWX-' + base) }

    const [vs, sVs] = useState(false)
    const [rTags, setRTags] = useState([])
    const [newTName, setNewTName] = useState(null)

    
   ex = {...ex,
    rTags, setRTags, newTName, setNewTName
   }
    return (
        <div className={getCls('wrapper')}>
            <div className={getCls('title')}>
                <h2
                    className={getCls('tog-ti')}
                    onClick={() => { sVs(!vs) }}>
                    Tags
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

export default Tag
