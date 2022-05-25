import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BranchView from '../Components/branches/BranchView'
import { axiosTokenHeader, tokenGet } from '../utils/functions'
import Helmet from 'react-helmet'
import axios from 'axios'

function Branch(props) {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [branch, setBranch] = useState(false)
    const { isDark, apiBase, fontSize, apiBase2, token } = props.p
    const { id } = useParams()
    let url;
    if (id) {
        url = apiBase2 + '/branches/nested?id=' + id
    } else {
        url = apiBase2 + '/branches/root'
    }

    useEffect(() => {
        if (!id) return setBranch(false)
        const url = apiBase2 + '/branches?id=' + id
        axios.get(url, axiosTokenHeader(token)).then(e => setBranch(e.data)).catch(r => console.log(r))
    }, [id])

    const freshBranches = () => {
        tokenGet(url, { Authorization: token })
            .then(data => {
                setIsPending(false);
                setData(data);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    // auto catches network / connection error
                    setIsPending(false);
                    setError(err.message);
                }
            })
    }

    useEffect(() => { freshBranches() }, [url])

    const ex = { freshBranches }

    const getTitle = () => {
        if (branch && branch.name) return branch.name
        else return 'Notes'
    }

    return (
        <div>
            {data &&
                <div className={'wrapper'}>
                    <Helmet>
                        <title>{getTitle()}</title>
                    </Helmet>
                    <BranchView isDark={isDark} data={data} isPending={isPending} apiBase={apiBase} setUpToDate={setData} fontSize={fontSize} p={props.p} ex={ex} branch={branch} />
                </div>

            }
            {isPending && <i className="fas fa-spinner spinner"></i>}
            {error && <div> {error} </div>}
        </div>
    )
}

export default Branch
