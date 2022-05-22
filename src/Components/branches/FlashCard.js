import React, { useState } from 'react'

function FlashCard(props) {


    const { p, ex } = props
    const { data, setIsAction } = props.ex
    // branches array
    let els = []
    // current position in the array
    const [position, setPosition] = useState(0)

    const getElements = () => {
        // check if the data has array 
        if (data.children.length <= 0) return
        els = data.children
    }

    const getCls = (base) => {
        return p.getCls('fc-' + base)
    }

    const exit = () => {
        setIsAction(false)
    }

    const exitBtn = () => {
        return (
            <div className={getCls('action-cont') + ' fs-close-icon'}>
                <i className={getCls('exit') + ' far fa-times-circle'}
                    onClick={() => { exit() }}></i>
            </div>
        )
    }

    const changePosition= (delta)=> {
        let p1
        p1 = delta + position
        if(position === els.length -1 ) p1 = 0
        if(position === 0 ) if(delta < 0) p1 = els.length - 1
        setPosition(p1)
        

    }

    

    return (
        <div className={getCls('container')}>
            <div className={getCls('actions')}>
                {exitBtn()}
            </div>
            {getElements()}
            <div className={getCls('flash-section')}>
                <div onClick={() => {changePosition(-1)}} className={getCls('up-btn') + " dir-controller"}>
                    <i className="fas fa-arrow-alt-circle-up"></i>
                </div>

                <div className={getCls('name')} style={{ fontSize: p.fontSize }}>
                    {els[position].name}
                </div>
                <div onClick={() => {changePosition(1)}} className={getCls('down-btn') + " dir-controller"}>
                    <i className="fas fa-arrow-alt-circle-down"></i>
                </div>
            </div>
        </div>
    )
}

export default FlashCard
