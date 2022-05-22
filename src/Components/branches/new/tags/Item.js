import React, {useState, useEffect} from 'react'
function Item(props) {
    // extract state
    let {ex} = props
    const {p} = props
    const {tag} = props
    const {seTags, setSeTags} = ex
    const getCls = (base) => { return p.getCls('3u6oNHI-' + base) }

    // create state 
    const [se, setSe] = useState(false)


    const isChecked = () => {
        const temp = seTags.filter((d) => {
            return d === tag._id.toString()
        })
        console.log(temp);
        return temp.length > 0
    }

    const toggle = () => {
        if(isChecked()){
            // remove item from arr
            const t = seTags.filter((d) => {
                return d !== tag._id
            })
            setSeTags(t)
            setSe(false)

        }else{
            // add item to arr
            const t = seTags
            t.push(tag._id)
            setSeTags(t)
            setSe(true)
        }
    }

    return (
        <div className={getCls('container')} onClick={toggle}>
            <div className={getCls('name')}>
                {tag.name}
            </div>
           {se && <div className={getCls('sel-icon')}>
                <i className="fas fa-check"></i>
            </div>}
        </div>
    )
}

export default Item

