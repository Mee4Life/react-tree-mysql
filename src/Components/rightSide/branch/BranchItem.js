import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

function BranchItem(props) {
    const { p, branch, position } = props

    return (
        <div className={p.getCls('right-panel-branch-item')} >
            <Link className={p.getCls('branch-item-name')} to={'/' + branch._id}>
                {branch.name}
            </Link>
            {branch.origin &&
                <Link className={p.getCls('branch-item-origin')} to={'/' + branch.origin._id}>
                    {branch.origin.name}
                </Link>
            }
        </div>
    )
}

export default BranchItem
