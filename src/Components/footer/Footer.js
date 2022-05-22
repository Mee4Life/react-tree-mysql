import React from 'react'
import './main.css'
function Footer(props) {
    const {p} = props
    const getCls = (base) => { return p.getCls('footer-' + base) }
    return (
        <div className={getCls('wrapper')}>
            <div className={getCls('line-1')}>
                <div className={getCls('julia')}>
                Me 4 Life
                </div>
                <div className={getCls('copy')}>
                    copyright reversed &#xa9; Me 4 Life
                </div>
            </div>
        </div>
    )
}

export default Footer

