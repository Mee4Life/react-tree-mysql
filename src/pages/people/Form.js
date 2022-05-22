import React, { useState } from 'react'
import Input1 from '../../Components/Inputs/input1'
import Btn1 from '../../Components/buttons/Btn1'
import { tokenPost, tokenGet } from '../../utils/functions'

function Form(props) {
    const { p, ex } = props
    const getCls = (base) => { return p.getCls('goM-' + base) }

    const [name, setName] = useState('')
    const [searchV, setSearchV] = useState('')

    const handleSave = () => {
        tokenPost(p.apiBase + '/person', { fname: name }, p.token)
            .then((d) => {
                tokenGet(p.apiBase + '/person', { token: p.token })
                    .then((d) => {
                        ex.setRGroups(d)
                    })
            })
    }

    const handleSChange = (e) => {
        const v = e.target.value
        setSearchV(v)
        if (v.trim().length <= 0) {
            ex.setFilteredPeople(ex.rGroups)
            return
        }
        const result = ex.filteredPeople.filter((d) => {
            return d.fname.search(v) >= 0
        })
        ex.setFilteredPeople(result)
    }

    const handleChange = (e) => {
        setName(e.target.value)
        // check empty string : 
        if (e.target.value.trim().length === 0) {
            tokenGet(p.apiBase + '/person', { token: p.token })
                .then((d) => {
                    ex.setRGroups(d)
                })
            return
        }

        // get groups array rGroups, setRGroups
        const re = new RegExp(e.target.value, "ig")
        const ar1 = ex.rGroups.filter((d) => {
            if (!d.fname.match(re)) return false
            return d.fname.match(re).length > 0
        })
        ex.setRGroups(ar1)
    }

    return (
        <div className={getCls('wrapper0')}>

            <div className={getCls('w1')}>
                {/* form section */}
                <div className={getCls('wrapper')}>
                    {/* input */}
                    <Input1 type="text" value={searchV} classes='XildWaIau' onChange={(e) => { handleSChange(e) }} placeholder='search' />
                </div>
            </div>


            <div className={getCls('w1')}>
                {/* form section */}
                <div className={getCls('wrapper')}>
                    {/* input */}
                    <Input1 type="text" value={name} classes='XildWIau' onChange={(e) => { handleChange(e) }} placeholder='person name' />
                    {/* save */}
                    <Btn1 text='حفظ' p={p} onclick={handleSave} />
                </div>
            </div>
        </div>
    )
}
export default Form

