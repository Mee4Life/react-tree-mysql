import React, {useState, useEffect} from 'react'
function Item(props) {
    // extract state
    let {ex} = props
    const {p} = props
    const {group} = props
    const {seGroups, setSeGroups} = ex
    const getCls = (base) => { return p.getCls('3u6oNHI-' + base) }

    // create state 
    const [se, setSe] = useState(false)


    const isChecked = () => {
        const temp = seGroups.filter((d) => {
            return d === group._id.toString()
        })
        console.log(temp);
        return temp.length > 0
    }

    const toggle = () => {
        if(isChecked()){
            // remove item from arr
            const t = seGroups.filter((d) => {
                return d !== group._id
            })
            setSeGroups(t)
            setSe(false)

        }else{
            // add item to arr
            const t = seGroups
            t.push(group._id)
            setSeGroups(t)
            setSe(true)
        }
    }

    return (
        <div className={getCls('container')} onClick={toggle}>
            <div className={getCls('name')}>
                {group.name}
            </div>
           {se && <div className={getCls('sel-icon')}>
                <i className="fas fa-check"></i>
            </div>}
        </div>
    )
}

export default Item

