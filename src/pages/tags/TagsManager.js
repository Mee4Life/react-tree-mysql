/* 
page 
list
item
input
remove 
save 


*/


import React, { useEffect, useState } from 'react'
import { getSpinner, tokenGet } from '../../utils/functions'
import GroupItem from './GroupItem'
import './tags.css'
import Form from './Form'



function TagManager(props) {
    const { p } = props
    const getCls = (base) => { return p.getCls('uRM-' + base) }

    // cerate page state > 
    const [rGroups, setRGroups] = useState([])
    const [filter, SetFilter] = useState(null)
    const [filtered, setFiltered] = useState([])
    const [isPending, setIsPending] = useState(true)

    useEffect(() => {
        tokenGet(p.apiBase + '/tag', { token: p.token }).then((d) => {
            setRGroups(d)
            setFiltered(d)
            setIsPending(false)
            console.log(d)
        })
    }, [])

    let ex = {
        rGroups, setRGroups,
        filter, SetFilter,
        filtered, setFiltered
    }

    return (
        <div className={getCls('wrapper0')}>
            {!isPending &&
                <div className={getCls('wrapper')}>
                    {/* Title Section  */}
                    <div className={getCls('title')}>
                        <h2>Tags</h2>
                    </div>
                    {/* input form */}
                    <div className={getCls('form')}>
                        <Form p={p} ex={ex} />
                    </div>
                    {/* list */}
                    <div className={getCls('CJ')}>
                        {filtered.map(group => (
                            <GroupItem key={group.name} p={p} group={group} />
                        ))}
                    </div>
                </div>
            }
            {isPending && 
                <div className={getCls('xcKrrXdi')}>
                    {getSpinner()}
                </div>
            }
        </div>

    )
}

export default TagManager
