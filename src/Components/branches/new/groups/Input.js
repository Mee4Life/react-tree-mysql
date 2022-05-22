import { cleanup } from '@testing-library/react'
import React, { useState } from 'react'
import { tokenPost, v2Spinner, tokenGet } from '../../../../utils/functions'
function Input(props) {

    const { p } = props
    let { ex } = props
    const getCls = (base) => { return p.getCls('pbLqqEh-' + base) }


    const { newGName, setNewGName } = ex
    const { rGroups, setRGroups } = ex
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)


    


    const newGClick = () => {
        setLoading(true)
        tokenPost(p.apiBase + '/group', { name: newGName }, p.token)
            .then((d) => {
                setLoading(false)
            })
    }

    const handleQChange = (e) => {
        console.log(e.target.value)
        const groupName = e.target.value
        // update group name
        setNewGName(groupName)
        // update list 
        
    }


    return (
        <div className={getCls('input-section')}>

            {/* info section */}
            {error &&
                <div className={getCls('error')}>
                    error
            </div>
            }

            {/* input section */}
            <div className={getCls('input0')}>
                <input
                    className={getCls('input')}
                    type="text"
                    placeholder='group name'
                    onChange={(e) => { handleQChange(e) }} />
            </div>


            {/* submit section */}
            <div
                className={getCls('input1')}
                onClick={newGClick}>
                {/* new  */}
                {!loading && <span>new</span>}
                {/* loading spinner */}
                {loading && v2Spinner('aOaPeclmz')}
            </div>
        </div>
    )
}

export default Input

