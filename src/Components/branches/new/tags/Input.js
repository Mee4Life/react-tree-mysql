import React, { useState } from 'react'
import { tokenPost, v2Spinner, tokenGet } from '../../../../utils/functions'
function Input(props) {

    const { p } = props
    let { ex } = props
    const getCls = (base) => { return p.getCls('pbLqqEh-' + base) }


    const { newTName, setNewTName } = ex
    const { rTags, setRTags } = ex
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)




    const newTClick = () => {
        setLoading(true)
        tokenPost(p.apiBase + '/tag', { name: newTName }, p.token)
            .then((d) => {
                setLoading(false)
            })
    }



    const handleQChange = (e) => {
        const tagName = e.target.value
        // update group name
        setNewTName(tagName)
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
                    placeholder='tag name'
                    onChange={(e) => { handleQChange(e) }} />
            </div>


            {/* submit section */}
            <div
                className={getCls('input1')}
                onClick={newTClick}>
                {/* new  */}
                {!loading && <span>new</span>}
                {/* loading spinner */}
                {loading && v2Spinner('aOaPeclmz')}
            </div>
        </div>
    )
}

export default Input

