/* 
pass :
text 
classes
onclick
p
*/

import React from 'react'
function Btn1(props) {
    const {p, classes, onclick, text} = props
    const getCls = (base) => { return p.getCls('w9TFL-' + base) }
    return (
        <div className={p.getCls('btn1') + classes} onClick={onclick}>
                {text}
        </div>
    )
}

export default Btn1

