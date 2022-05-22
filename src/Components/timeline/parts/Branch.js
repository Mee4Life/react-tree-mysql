import React from 'react'
import { Link } from 'react-router-dom'

function TimeLineBody(props) {
    const { p, branch } = props
    const {isDate} = props.ex
    const getCls = (base) => {
        return p.getCls("time-line-branch-" + base)
    }

    /* 
        branch body 
        branch footer
    */

    const getFormatDate = () => {
        if(!branch ) return
        const date = new Date(Date.parse(branch.createdAt))
        const mth = date.getMonth()+1
        const day = date.getDay()+1
        const hour = date.getDay()
        const min = date.getMinutes() + 1
        const fullDate = 'Month: ' + mth + '   Day: ' + day + '   Time: ' + hour + ':' + min
        // look w3 schools for more info
        return  fullDate
    }

    return (
        <div className={getCls('wrapper')} style={{ fontSize: p.fontSize }}>
            <div className={getCls('header')} >
                {isDate && <div className={getCls('time')} >{getFormatDate()}</div>}
            </div>
            <div className={getCls('body')} >
                <Link to={'/' + branch._id} className={(getCls('name') + ' ' + p.getCls('link'))} >{branch.name} </Link>
            </div>

        </div>
    )
}

export default TimeLineBody
