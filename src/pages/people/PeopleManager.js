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
import './people.css'
import Form from './Form'



function PeopleView(props) {
    const { p } = props
    const getCls = (base) => { return p.getCls('uRM-' + base) }


    // cerate page state > 
    const [rGroups, setRGroups] = useState([])
    const [filter, SetFilter] = useState(null)
    const [filteredPeople, setFilteredPeople] = useState([])
    const [isPending, setIsPending] = useState(true)

    useEffect(() => {
        tokenGet(p.apiBase2 + '/people', { Authorization: p.token }).then((d) => {
            setRGroups(d)
            setFilteredPeople(d)
            setIsPending(false)
        })
    }, [])

    let ex = {
        rGroups, setRGroups,
        filter, SetFilter,
        filteredPeople, setFilteredPeople
    }

    return (
        <div className={getCls('wrapper')}>
            {!isPending && <div className={getCls('wrapper1')}>
                {/* Title Section  */}
                <div className={getCls('title')}>
                    <h2>People</h2>
                </div>
                {/* input form */}
                <div className={getCls('form')}>
                    <Form p={p} ex={ex} />
                </div>
                {/* list */}
                <div className={getCls('CJ')}>
                    {filteredPeople.map(group => (
                        <GroupItem key={group.id} p={p} group={group} />
                    ))}
                </div>
            </div>}
            {isPending &&
                <div className={getCls('vi6c')}>
                    {getSpinner()}
                </div>
            }
        </div>

    )
}

export default PeopleView
