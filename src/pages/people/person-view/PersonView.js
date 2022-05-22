import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { tokenGet, tokenPost } from '../../../utils/functions'
import { useParams } from 'react-router'
import BranchView from '../../../Components/branches/BranchView'


function PersonView(props) {


    let { ex } = props
    const { p } = props
    const getCls = (base) => { return p.getCls('BbJdr-' + base) }


    const [pBranches, setPBranches] = useState([])
    const [person, setPerson] = useState({})
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)
    const [personId, setPersonId] = useState(useParams().id)

    // get person
    useEffect(() => {
        const url = p.apiBase + '/person?id=' + personId
        tokenGet(url, { token: p.token }).then((d) => {
            setPerson(d)
        })
    }, [])
    // get person branches
    useEffect(() => {
        const url = p.apiBase + '/person/branches?id=' + personId
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
        return person.fname
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

export default PersonView

