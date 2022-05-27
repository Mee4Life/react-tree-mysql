import React, {useState, useEffect} from 'react'
function Item(props) {
    // extract state
    let {ex} = props
    const {p} = props
    const {person} = props
    const {
        sePersons, setSePersons,
        rPersons, setRPersons
    } = ex
    const getCls = (base) => { return p.getCls('3u6oNHI-' + base) }

    // create state 
    const [se, setSe] = useState(false)


    const isChecked = () => {
        if(!sePersons) return false
        const temp = sePersons.filter((d) => {
            return d == person.id
        })
        return temp.length > 0
    }

    const toggle = () => {
        if(isChecked()){
            // remove item from arr
            const t = sePersons.filter((d) => {
                return d !== person.id
            })
            setSePersons(t)
            setSe(false)

        }else{
            // add item to arr
            const t = sePersons
            t.push(person.id)
            setSePersons(t)
            setSe(true)
        }
    }

    return (
        <div className={getCls('container')} onClick={toggle}>
            <div className={getCls('name')}>
                {person.fname}<br/>
            </div>
           {se && <div className={getCls('sel-icon')}>
                <i className="fas fa-check"></i>
            </div>}
        </div>
    )
}

export default Item

