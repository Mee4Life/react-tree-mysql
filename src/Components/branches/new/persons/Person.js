import React, { useState, useEffect } from 'react'
import List from './List'
import Input from './Input'


function Person(props) {
    const { p } = props
    let { ex } = props
    const getCls = (base) => { return p.getCls('QBBwJ-' + base) }

    const [vs, sVs] = useState(false)
    const [rPersons, setRPersons] = useState([])
    const [newGName, setNewGName] = useState(null)
    const [newGLName, setNewGLName] = useState(null)


    ex = {
        ...ex,
        newGName, setNewGName,
        newGLName, setNewGLName,
        rPersons, setRPersons
    }
    return (
        <div className={getCls('wrapper')}>
            <div className={getCls('title')}>
                <h2
                    className={getCls('tog-ti')}
                    onClick={() => { sVs(!vs) }}>
                    Persons
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

export default Person
