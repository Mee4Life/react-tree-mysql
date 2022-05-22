import React, { useEffect, useState } from 'react'

function BranchesList(props) {
    // extract data from the store
    // p, id, branches, branch
    const data = props.data
    if (props.origin) data.branch = props.origin

    // create state
    const [loading, setLoading] = useState(true)
    const [children, setChildren] = useState(null)
    const [visible, setVisible] = useState(true)
    const [branch, setBranch] = useState(props.branch)

    // functions 
    const getCls = (base) => {
        return data.p.getCls('d1-' + base)
    }

    useEffect(() => {
        setLoading(false)
        setChildren(data.branches.filter((e) => {
            if (e.origin) {
                return e.origin._id === branch._id
            }
        }))
    }, [])

    const toggleList = () => {
        if(visible){
            
        }else{

        }
        setVisible(!visible)
    }

    // create component header . 
    const getHeader = () => {
        const element =
            <div className={getCls('branch-header') + `children`}>
                <div className={getCls('header')} onClick={toggleList} >
                    <div className={getCls('name-line')} > </div>
                    {branch.name}
                    <div className={getCls('name-line')} > </div>
                </div>
            </div>

        return element
    }


    // create children component. 
    const getCldList = () => {
        if (!visible || !children) return

        const arr = []

        children.forEach((d) => {
            if (!d.children || d.children.length <= 0) {
                const obj =
                    <div className={getCls('list-item')} key={d._id}>
                        {d.name}
                    </div>
                arr.push(obj)
            } else {

                arr.push(
                    <BranchesList data={data} branch={d} />
                )
            }

        })


        return arr
    }



    return (
        <div className={getCls('child-wrapper')}>
            {getHeader()}
            {getCldList()}
        </div>
    )


}

export default BranchesList

