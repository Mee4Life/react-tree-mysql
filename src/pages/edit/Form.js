import React, { useState } from 'react'
function Form(props) {
    const { p } = props
    let { ex } = props
    const { getCls, branch } = ex


    const [name, setName] = useState(branch.name)
    const [pinned, setPinned] = useState(branch.pinned)
    const [pos, setPos] = useState(branch.positive)
    const [tags, setTags] = useState(branch.tags)
    const [groups, setGroups] = useState(branch.groups)
    const [persons, setPersons] = useState(branch.persons)
    


    return (
        <div className={getCls('wrapper')}>
            <div className={getCls('container')}>

                <div className={getCls('name')}>
                    <input type="text" placeholder='name' value={branch.name} dir="rtl" />
                </div>
                <div className={getCls('pinned')}>
                    pinned
                </div>
                <div className={getCls('pos')}>
                    positive
                </div>
                <div className={getCls('tags')}>
                    tags
                </div>
                <div className={getCls('groups')}>
                    groups
                </div>
                <div className={getCls('persons')}>
                    persons
                </div>

            </div>
        </div>
    )
}


export default Form

