import { React, useState } from 'react'
import "./style.css"
import getReqHeader from '../../utils/getReqHeader'


function TimeLineHeader(props) {
    const { p } = props
    const [location, setLocation] = useState('/timeline')
    const { setData, setIsProg, isDate, setIsDate } = props.ex
    const [inputVal, setInputVal] = useState(null)

    const handleBranchChange = (e) => {
        // store input value to the state
        setInputVal(e.target.value)
    }

    const getCls = (base) => {
        return p.getCls("time-line-header-" + base)
    }


    const downClk = () => {
        // check if url id
        if (location === '/timeline') {

        }
        // check if input id
        if (inputVal.trim().length > 3) {
            setIsProg(true)
            // send request. 
            const url = p.apiBase + '/branch/timeline?id=' + inputVal + '&dir=before'
            getReqHeader(url, { token: p.token }).then(d => {
                setData(d)
                setIsProg(false)
            })

        }
    }
    const upClk = () => {
        // check if url id
        if (location === '/timeline') {

        }
        // check if input id
        if (inputVal.trim().length > 3) {
            setIsProg(true)
            // send request. 
            const url = p.apiBase + '/branch/timeline?id=' + inputVal + '&dir=after'
            getReqHeader(url, { token: p.token }).then(d => {
                setIsProg(false)
                setData(d)
            })

        }
    }

    const toggleDate = () => {
        setIsDate(!isDate)
    }

    return (
        <div className={getCls('wrapper')}>
            <button onClick={() => downClk()}> before </button>
            <input type="text" onChange={(e) => { handleBranchChange(e) }} />
            <button onClick={() => upClk()}> after </button>
            <span onClick={() => toggleDate()} className=""><i className="fas fa-clock "></i></span>
             
        </div>
    )
}

export default TimeLineHeader
