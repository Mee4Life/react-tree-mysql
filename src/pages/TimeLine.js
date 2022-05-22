import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import getReqHeader from '../utils/getReqHeader'
import TimeLineHeader from '../Components/timeline/TimeLineHeader'
import TimeLineBody from '../Components/timeline/TimeLineBody'

function TimeLine(props) {
    // create state
    const [data, setData] = useState(null)
    const [isProg, setIsProg] = useState(false)
    const [isDate, setIsDate] = useState(false)

    const ex = {
        setData, branches:data, isProg, setIsProg, isDate, setIsDate
    }
    // extract date from the props
    const { fontSize, p } = props
    // extract url data
    const { id } = useParams()
    const { dir } = useParams()
    // get dataFrom the Database.
    const url = p.apiBase + '/branch/timeline?id=' + id + '&dir=' + dir
    useEffect(() => {
        setIsProg(true)
        getReqHeader(url, { token: props.p.token })
            .then((d) => {
                setData(d)
                setIsProg(false)
                console.log(d)
            })
        
    }, [])




    const getCls = (baseName) => {
        return p.getCls('p2time-line-' + baseName)
    }
    return (
        <div className={getCls('wrapper')}>
            <TimeLineHeader p={p} ex={ex} />
            {/* loaded successfully and there is data */}
            {!isProg && data && data.length > 0 &&
                <div className={getCls('container')}>
                    <TimeLineBody p={p} ex={ex} />
                </div>
            }
            {/* loaded successfully but not data founded */}
            {!isProg && data && data.length <= 0 &&
                <div className={getCls('empty-container')}>
                    there is no branches.
                </div>
            }
            {isProg &&
                <i className="fas fa-spinner spinner"></i>
            }
        </div>
    )
}

export default TimeLine
