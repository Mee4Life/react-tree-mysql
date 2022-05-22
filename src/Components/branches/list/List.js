import { React, useEffect, useState } from 'react'
import Single from '../single/Single'
import New from '../new/New'
import Edit from '../edit/Edit'
import './list.css'

function List(props) {
    const { branches, isDark, location, apiBase, setUpToDate, fontSize, p, ex } = props
    const { sBranches, setSBranches } = ex
    const [isEdit, setEdit] = useState(false)
    const [branchToEdit, setBranchToEdit] = useState(null)


    const getCls = (base) => {
        return p.getCls('avGSVSTAflist-' + base)
    }

    let counted = 0

    return (
        <div className="list">
            
            {!isEdit &&
                <New location={location} isDark={isDark} apiBase={apiBase} setUpToDate={setUpToDate} p={p} />
            }

            <div className={getCls('branchesW') + " branches-wrapper"}>
                <div className={getCls('branchesC') + " branches-container"} style={{ fontSize: fontSize }}>

                    {branches.map(branch => (
                        <Single key={branch._id} branch={branch} isDark={isDark} apiBase={apiBase} location={location} setData={setUpToDate} setEdit={setEdit} setBranch={setBranchToEdit} selectedBranches={sBranches} setSelected={setSBranches} p={p} counted={++counted} ex={ex} />
                    ))}
                </div>
                {/* <Navi apiBase={apiBase} handleMove={handleMove} resMsg={resMsg} setResMsg={setResMsg} /> */}
            </div>

            {isEdit &&
                <Edit location={location} isDark={isDark} apiBase={apiBase} setUpToDate={setUpToDate} branch={branchToEdit} setEdit={setEdit} />
            }
        </div>
    )
}

export default List
