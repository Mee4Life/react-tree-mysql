import React from 'react'

function Brand(props) {
    const {p} = props
    return (
        <div className={p.getCls('brand')}>
            Notes
        </div>
    )
}

export default Brand
