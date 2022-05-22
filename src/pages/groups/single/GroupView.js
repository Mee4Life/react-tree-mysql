import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { tokenGet, tokenPost } from '../../../utils/functions'
import { useParams } from 'react-router'
import BranchView from '../../../Components/branches/BranchView'


function GroupView(props) {


    let { ex } = props
    const { p } = props
    const getCls = (base) => { return p.getCls('BbJlkadr-' + base) }


    const [pBranches, setPBranches] = useState([])
    const [group, setGroup] = useState({})
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)
    const [groupId, setGroupId] = useState(useParams().id)

    // get person
    useEffect(() => {
        const url = p.apiBase + '/group?id=' + groupId
        tokenGet(url, { token: p.token }).then((d) => {
            setGroup(d)
        })
    }, [])
    // get person branches
    useEffect(() => {
        const url = p.apiBase + '/group/branches?id=' + groupId
            tokenGet(url, { token: p.token }).then((d) => {
                setPBranches(d)
                setIsPending(false)
            })
    }, [])

    /* 
    fist get the person branches from the data base . 
     then create the list for the branches. 
    
    */

    const getTitle = () => {
        return group.name
    }

    ex = {...ex,
    
    }

    return (
        <div className={getCls('wrapper0')}>
            <div className={'wrapper'}>
                <Helmet>
                    <title>{getTitle()}</title>
                </Helmet>
            </div>
            { pBranches &&
                <div className={getCls('idyr0')}>
                    <BranchView p={p} ex={ex} isDark={p.isDark} data={pBranches} apiBase={p.apiBase} setUpToDate fontSize={p.fontSize} />
                </div>
            }
            { isPending && <i className="fas fa-spinner spinner"></i>}
            { error && <div> {error} </div>}
        </div>
    )
}

export default GroupView

