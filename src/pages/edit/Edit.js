import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import Form from './Form'
import {tokenGet} from '../../utils/functions'
import { cleanup } from '@testing-library/react'

function Edit(props) {
    const {p} = props
    const getCls = (base) => { return p.getCls('6glf-' + base) }
    const id = useParams().id
    
    
    const [branch, setBranch] = useState(null)
    
    useEffect(() => {
        const url = p.apiBase + '/branch?id=' + id
        tokenGet(url, {token: p.token})
        .then((d) => {
            setBranch(d)
        })
        return () => {
            cleanup()
        }
    }, [])
    
    let ex = {id, getCls, branch}

    return (
        <div className={getCls('wrapper')}>
            <div className={getCls('container')}>
                <h1 className={getCls('Title')}>
                    Edit
                </h1>
               {branch &&  <Form p={p} ex={ex} />}
            </div>
        </div>
    )
}

export default Edit

