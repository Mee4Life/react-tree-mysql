import { cleanup } from '@testing-library/react'
import React, { useState, useEffect } from 'react'
import { tokenGet, getSpinner } from '../../../../utils/functions'
import Item from './Item'


function List(props) {
    // extract the state 
    const { p } = props
    let { ex } = props
    const { rTags, setRTags } = ex
    const getCls = (base) => { return p.getCls('Pf5uzOkS-' + base) }

    // create state 
    const [loading, setLoading] = useState(false)

    // get branches
    useEffect(() => {
        const url = p.apiBase + '/tag/search?q=' + ex.newTName
        tokenGet(url, { token: p.token })
            .then((d) => {
                console.log(d)
                ex.setRTags(d)
            })
        return () => {
            cleanup()
        }
    }, [ex.newTName])


    return (
        <div className={getCls('wrapper')}>
            {!loading &&
                <div className={getCls('container')}>
                    {rTags.map((tag) => (
                        <Item p={p} ex={ex} tag={tag} key={tag._id} />
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

