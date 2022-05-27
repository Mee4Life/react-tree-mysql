import { cleanup } from '@testing-library/react'
import React, { useState, useEffect } from 'react'
import { tokenGet, getSpinner } from '../../../../utils/functions'
import Item from './Item'


function List(props) {
    // extract the state 
    const { p } = props
    let { ex } = props
    const {rPersons, setRPersons} = ex
    const getCls = (base) => { return p.getCls('Pf5uzOkS-' + base) }

    // create state 
    const [loading, setLoading] = useState(false)

    // get branches
    useEffect(() => {
        const url = p.apiBase2 + '/people/search?q=' + ex.newGName
        tokenGet(url, { Authorization: p.token })
            .then((d) => {
                setRPersons(d)
            })
        return () => {
            cleanup()
        }
    }, [ex.newGName])


    return (
        <div className={getCls('wrapper')}>
            {!loading &&
                <div className={getCls('container')}>
                    {rPersons.map((person) => (
                        <Item p={p} ex={ex} person={person} key={person.id} />
                    ))}
                </div>
            }
            {loading && 
                getSpinner()
            }
        </div>

    )
}


export default List

