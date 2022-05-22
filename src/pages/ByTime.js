import React, { useEffect, useState } from 'react'
import getWHeader from '../utils/getReqHeader'
import { getSpinner } from '../utils/functions'
import ByTimeList from '../Components/byTime/by-time-list'
import '../Components/byTime/style.css'
import DateTimePicker from 'react-datetime-picker';

function ByTime(props) {
    // extract the data from the props
    const p = props.p
    // create state. 
    const [time, setTime] = useState(null)
    const [loading, setLoading] = useState(false)
    const [targetBranches, setTargetBranches] = useState([])
    const [newestDir, setNewestDir] = useState('up')
    const [oldestDir, setOldestDir] = useState('up')


    // functions
    const getCls = (base) => {
        return p.getCls('by-time-' + base)
    }


    const handleChange = (e) => {
        if (!e || e.Date) return
        setTime(e)
    }

    // change branches direction. 
    const changeNewestDirection = () => {
        // toggle directions
        if (newestDir === 'up') setNewestDir('down')
        else { setNewestDir('up') }

        if (time) {
            setLoading(true)
            const url = p.apiBase + '/branch/byTimeNewest?time=' + time + '&dir=' + newestDir
            getWHeader(url, { token: p.token })
                .then(d => {
                    setTargetBranches(d)
                    setLoading(false)
                })
        }
    }
    const changeOldestDirection = () => {
        // toggle directions
        if (oldestDir === 'up') setOldestDir('down')
        else { setOldestDir('up') }

        if (time) {
            setLoading(true)
            const url = p.apiBase + '/branch/byTimeOldest?time=' + time + '&dir=' + oldestDir
            getWHeader(url, { token: p.token })
                .then(d => {
                    setTargetBranches(d)
                    setLoading(false)
                })
        }
    }

    const ex = {
        p, getCls, targetBranches
    }

    return (
        <div>
            {!loading &&
                <div>
                    <div className={getCls('form')}>
                        <span onClick={changeOldestDirection} className={getCls('change-dir')}><i className="fas fa-sort-amount-down"></i></span>
                        <DateTimePicker
                            onChange={handleChange}
                            value={time}
                            className={getCls('picker')}
                        />
                        <span onClick={changeNewestDirection} className={getCls('change-dir')}><i className="fas fa-sort-amount-up"></i></span>
                    </div>
                    <div className={getCls('list')}>
                        <ByTimeList ex={ex} />
                    </div>
                </div>
            }
            {loading && getSpinner()}
        </div>
    )
}

export default ByTime
