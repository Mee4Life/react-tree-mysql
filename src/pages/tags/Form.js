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
        tokenPost(p.apiBase2 + '/tags', { name }, p.token)
            .then((d) => {
                tokenGet(p.apiBase2 + '/tags', { Authorization: p.token })
                    .then((d) => {
                        ex.setRGroups(d)
                        ex.setFiltered(d)
                        setName('')
                    })
            })
    }

    const handleChange = (e) => {
        setName(e.target.value)
        // check empty string : 
        if (e.target.value.trim().length === 0) {
            tokenGet(p.apiBase + '/tag', { token: p.token })
                .then((d) => {
                    ex.setRGroups(d)
                })
            return
        }

        // get groups array rGroups, setRGroups
        const re = new RegExp(e.target.value, "ig")
        const ar1 = ex.rGroups.filter((d) => {
            if (!d.name.match(re)) return false
            return d.name.match(re).length > 0
        })
        ex.setRGroups(ar1)
    }


    const handleSChange = (e) => {
        const v = e.target.value
        setSearchV(v)
        if (v.trim().length <= 0) {
            ex.setFiltered(ex.rGroups)
            return
        }
        const result = ex.filtered.filter((d) => {
            return d.name.search(v) >= 0
        })
        ex.setFiltered(result)
    }

    return (
        <div className={getCls('wrapper0')}>
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
                        <Input1 type="text" value={name} classes='XildWIau' onChange={(e) => { handleChange(e) }} placeholder='Tag name' />
                        {/* save */}
                        <Btn1 text='حفظ' p={p} onclick={handleSave} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Form

