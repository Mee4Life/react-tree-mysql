import { cleanup } from '@testing-library/react'
import React, { useState, useEffect } from 'react'
import { tokenGet, getSpinner } from '../../../../utils/functions'
import Item from './Item'


function List(props) {
    // extract the state 
    const { p } = props
    let { ex } = props
    const { rGroups, setRGroups } = ex
    const getCls = (base) => { return p.getCls('Pf5uzOkS-' + base) }

    // create state 
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const url = p.apiBase + '/group/search?q=' + ex.newGName
        tokenGet(url, { token: p.token })
            .then((d) => {
                console.log(d)
                setRGroups(d)
            })
        return () => {
            cleanup()
        }
    }, [ex.newGName])

    return (
        <div className={getCls('wrapper')}>
            {!loading &&
                <div className={getCls('container')}>
                    {rGroups.map((group) => (
                        <Item p={p} ex={ex} group={group} key={group._id} />
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

