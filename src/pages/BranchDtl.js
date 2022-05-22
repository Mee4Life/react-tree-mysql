/* 
another way to show branches.  
*/
import { useParams, Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import getReqHeader from '../utils/getReqHeader'
import BranchList from '../Components/branchDtl/BranchesList'

function BranchDtl(props) {
    const { p } = props
    let { id } = useParams()
    const [branches, setBranches] = useState(null)
    const [branch, setBranch] = useState(null)
    if(props.id) id = props.id
    // export 
    const data = {
        p, branches
    }

    // functions
    const getCls = (base) => {
        return p.getCls('br0' + base)
    }

    // connection
    useEffect(() => {
        getReqHeader(p.apiBase + '/branch')
            .then((d) => {
                // set branches source
                setBranches(d)
                // set target branch
                const b = d.find((e) => {
                    return e._id.toString() === id
                })
                setBranch(b)
            })
    }, [])


    /* 
   branch name 
   branch children 
   branch children children children
   */


    return (
        <div className={getCls('2')} style={{fontSize: p.fontSize}}>

            {/* branch container */}
            {branch &&
                <div className="">
                    {/* // branch children.  */}
                    <div className={getCls('ch-co')} >
                        <BranchList data={data} branch={branch} />
                    </div>
                </div>
            }
            { !branch && <i className="fas fa-spinner spinner"></i>}

        </div>


    )
}








export default BranchDtl
