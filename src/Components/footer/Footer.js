import React from 'react'
import './main.css'
function Footer(props) {
    const { p } = props
    const getCls = (base) => { return p.getCls('footer-' + base) }
    return (
        <div className={getCls('wrapper')}>
            <div className={getCls('line-1')}>
                <div className={getCls('julia')}>
                    Notes
                </div>
                <div className={getCls('copy')}>
                    copyright reserved &#xa9; Notes 2022
                </div>
            </div>
        </div>
    )
}

export default Footer

