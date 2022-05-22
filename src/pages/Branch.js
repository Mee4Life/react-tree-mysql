import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import BranchView from '../Components/branches/BranchView'
import { tokenGet } from '../utils/functions'
import Helmet from 'react-helmet'

function Branch(props) {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const { isDark, apiBase, fontSize } = props.p
    const { id } = useParams()
    let url;
    if (id) {
        url = apiBase + '/branch?id=' + id
    } else {
        url = apiBase + '/branch?origin=null'
    }

    const freshBranches = () => {
        tokenGet(url)
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

    useEffect(() => {

        freshBranches()

    }, [url])

    const ex = {
        freshBranches
    }

    const getTitle = () => {
        if (data && data.name) return data.name
        else return 'Me 4 Life'
    }

    return (
        <div>
            { data &&
            <div className={'wrapper'}>
                <Helmet>
                    <title>{ getTitle() }</title>
                </Helmet>
                <BranchView isDark={isDark} data={data} isPending={isPending} apiBase={apiBase} setUpToDate={setData} fontSize={fontSize} p={props.p} ex={ex} />
            </div>
                
            }
            { isPending && <i className="fas fa-spinner spinner"></i>}
            { error && <div> {error} </div>}
        </div>
    )
}

export default Branch
