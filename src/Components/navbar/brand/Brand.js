import React from 'react'

function Brand(props) {
    const {p} = props
    return (
        <div className={p.getCls('brand')}>
            Me 4 Life
        </div>
    )
}

export default Brand
