import React, { useEffect, useState } from 'react'
import List from './list/List'
import { Link } from 'react-router-dom'
import RightPanel from '../rightSide/RightPanel'
import FlashCard from './FlashCard'
import Quizlet from './Quizlet'
import { tokenPatch, AsyncForEach, tokenGet, date1 } from '../../utils/functions'

function BranchView(props) {
    const { isDark, data, apiBase, setUpToDate, fontSize, p } = props
    let { ex } = props
    const { getCls } = p
    const { freshBranches } = ex
    const [sBranches, setSBranches] = useState([])
    const [moveTarget, setMoveTarget] = useState('')
    const [resMsg, setResMsg] = useState(null)
    const [isFlashCard, setIsFlashCard] = useState(false)
    const [isQuizlet, setIsQuizlet] = useState(false)
    const [isAction, setIsAction] = useState(false)
    const [parents, setParent] = useState([])
    let branchTitle = []
    if (data && data.name)
        branchTitle = data.name.split('\n')


    const createDate = () => {
        if (!data || !data.createdAt) return ''
        const date = new Date(data.createdAt)
        const typed = date1(date)
        return typed

    }

    const flashCardReq = () => {
        setIsAction(true)
        setIsFlashCard(true)
        setIsQuizlet(false)

    }

    const quizletReq = () => {
        setIsAction(true)
        setIsQuizlet(true)
        setIsFlashCard(false)
    }

    const bOrigin = () => {
        return (
            <div className={getCls('BNBKece')}>
                {data.origin &&
                    <Link to={"/" + data.origin._id} className={`link ${isDark ? "dark-link" : "light-link"}`}>{data.origin.name}</Link>
                }

                {!data.origin &&
                    <Link to={"/"} className={`link ${isDark ? "dark-link" : "light-link"}`}><i className="fas fa-home"></i></Link>

                }
            </div>
        )
    }

    const listActions = () => {
        return (
            <div className={getCls('container')}>
                {p.navSts.isVisibleNav &&
                    <div className={getCls('branch-list-header-actions')}>
                        <div className={getCls('list-action')} onClick={() => { flashCardReq() }}>flash card</div>
                        <div className={getCls('list-action')} onClick={() => { quizletReq() }}>Quizlet</div>
                    </div>
                }
            </div>
        )
    }

    const getCommand = () => {
        if (data.command) return '#' + data.command
        return ''
    }

    const getList = () => {
        return (
            <div className={getCls('gDhZZyqJTsAcIbvq')}>
                {/* time */}
                <div className={getCls('time')}>
                    {createDate()}
                </div>

                {/* branch roots branches */}
                <div className={getCls('parentW1')}>
                    <div className={getCls('U7q')}>
                        {parents.length > 0 && parents.map(parent => (
                            <Link to={'/' + parent._id} key={parent._id} className={getCls('link') + ' VH9sY'}>
                                <span className='mDCcQ'>/</span>
                                <span className='JpN'>{parent.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>


                {/* branch title */}
                <div className={getCls('branch-list-header')} style={{ textAlign: `${p.listAlign}` }}>
                    <h1> {branchTitle.map(e => (
                        <div key={getRandId()} className={getCls('branch-list-title')}>{e}</div>
                    ))} </h1>
                    {/* command */}
                    <div className={getCls('YmOebB8')}>
                        {getCommand()}
                    </div>
                </div>


                {
                    data.children &&
                    <List branches={data.children} isDark={isDark} location={data._id} apiBase={apiBase} setUpToDate={setUpToDate} fontSize={fontSize} p={p} ex={ex} />
                }

                {
                    !data.children &&
                    <List branches={data} isDark={isDark} location={data._id} apiBase={apiBase} setUpToDate={setUpToDate} fontSize={fontSize} p={p} ex={ex} />
                }
            </div>
        )
    }

    const handleMove = () => {
        AsyncForEach(sBranches, () => {
            sBranches.forEach((branch) => {
                const url = apiBase + '/branch'
                const data = {
                    id: branch._id,
                    origin: moveTarget
                }
                tokenPatch(url, data, p.token).then((d) => {
                    if (d && d._d) console.log(d._id);
                })
            });
        })
        freshBranches()
        setSBranches([])


    }

    useEffect(() => {
        if (!data._id) return
        tokenGet(p.apiBase + '/branch/pBranch?id=' + data._id)
            .then((d) => {
                if (d.reason) return
                setParent(d.reverse())
            })
    }, [data])

    ex = {
        ...ex,
        data, setIsAction, sBranches, setSBranches, freshBranches, branchTitle
    }


    const getListWrapperWidth = () => {
        if (p.navSts.isVisibleNav) {
            return 43
        } else {
            return 90
        }
    }

    const getMoveSection = () => {
        return (
            <div className={getCls('wrapper')}>
                {p.navSts.isVisibleNav &&
                    <div className={getCls('move')}>
                        <div className={getCls('input')}>
                            <input type="text" className={getCls('VaqSI')} value={moveTarget} onChange={(e) => { setMoveTarget(e.target.value) }} />
                        </div>
                        <div className={getCls('move1')} onClick={handleMove}>
                            Move
                        </div>
                    </div>
                }
            </div>

        )
    }

    return (
        <div>
            {data &&
                <div className={p.getCls('branch-view-wrapper')}>
                    <div className={getCls('Rta6QukC')}>
                        {/* right panel */}
                        <RightPanel p={p} />
                        {/* move */}
                        {getMoveSection()}
                    </div>

                    {!isAction &&
                        /* origin name and list actions */
                        < div className={p.getCls('branch-view-container')} style={{ width: getListWrapperWidth() + 'vw' }}>
                            <div className={getCls('root-section')}>
                                {bOrigin()}
                                {listActions()}
                            </div>


                            {getList()}


                        </div>
                    }




                    {isAction && isFlashCard &&
                        <div className={getCls('flash-card-wrapper')}>
                            <FlashCard p={p} ex={ex} />
                        </div>
                    }
                    {isAction && isQuizlet &&
                        <div className={getCls('flash-card-wrapper')}>
                            <Quizlet p={p} ex={ex} />
                        </div>
                    }
                </div>
            }
        </div >
    )
}

function getRandId() {
    return Math.random() * (200000 - 0) + 0
}

export default BranchView
