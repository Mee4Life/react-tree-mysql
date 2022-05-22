import React from 'react'

function Quizlet(props) {

    const { p, ex } = props
    const { data, setIsAction } = props.ex

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

    const getQuizletText= () => { 
        const list = data.children
        if(list.length <= 0) return 
        let d = ''
        let counter = 0
        list.forEach(e => {
            counter ++ 
            d = d + e.name + ',:'
        });
        return d
    } 
    const getQuizletTextWithCounter= () => { 
        const list = data.children
        if(list.length <= 0) return 
        let d = ''
        let counter = 0
        list.forEach(e => {
            counter ++ 
            d = d + counter + ',' + e.name + ':'
        });
        return d
    }

    return (
        <div className={getCls('container')}>
            <div className={getCls('actions')}>
                {exitBtn()}
            </div>
            <div className={getCls('content')}>
                <h2>Content : </h2>
                {getQuizletText()}
                <h2>With Counter </h2>
                {getQuizletTextWithCounter()}
            </div>
        </div>
    )
}

export default Quizlet
