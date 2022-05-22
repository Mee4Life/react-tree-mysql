import { React, useState } from 'react'
import "./style.css"
import Branch from './parts/Branch'

function TimeLienBody(props) {
    const { p } = props
    const { branch, branches, isDate} = props.ex

    const getCls = (base) => {
        return p.getCls("time-line-body-" + base)
    }
    return (
        <div className={getCls('wrapper')} style={{ fontSize: p.fontSize }}>
            {branches &&
                branches.map(branch => (
                    <Branch p={p} branch={branch} key={branch._id} ex={props.ex} />
                ))
            }
        </div>
    )
}

export default TimeLienBody
