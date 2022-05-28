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
import './groups.css'
import Form from './Form'

function GroupsManager(props) {
    const { p } = props
    const getCls = (base) => { return p.getCls('uRM-' + base) }

    // cerate page state > 
    const [rGroups, setRGroups] = useState([])
    const [filter, SetFilter] = useState(null)
    const [filteredGroups, setFilteredGroups] = useState([])
    const [isPending, setIsPending] = useState(true)

    useEffect(() => {
        tokenGet(p.apiBase2 + '/groups', { Authorization: p.token }).then((d) => {
            setRGroups(d)
            setFilteredGroups(d)
            setIsPending(false)
        })
    }, [])

    let ex = {
        rGroups, setRGroups,
        filter, SetFilter,
        filteredGroups, setFilteredGroups
    }

    return (
        <div className={getCls('wrapper0')}>
            {!isPending && <div className={getCls('wrapper')}>
                {/* Title Section  */}
                <div className={getCls('title')}>
                    <h2>Groups</h2>
                </div>
                {/* input form */}
                <div className={getCls('form')}>
                    <Form p={p} ex={ex} />
                </div>
                {/* list */}
                <div className={getCls('CJ')}>
                    {filteredGroups.map(group => (
                        <GroupItem key={group.id} p={p} group={group} />
                    ))}
                </div>
            </div>}
            {isPending && 
                <div>
                    {getSpinner()}
                </div>
            }
        </div>

    )
}

export default GroupsManager
