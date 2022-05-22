import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { tokenGet } from '../../utils/functions'
import htmlv from './htmlv.css'


function HTMLV(props) {
    const { p } = props
    const getCls = (base) => { return p.getCls('yFAmjB-' + base) }

    const [branch, setBranch] = useState(null)
    const [titleFontSize, setTitleFontSize] = useState(30)
    const [fontSize, setFontSize] = useState(20)
    const [padding, setPadding] = useState(16)
    const [isNumbered, setIsNumbered] = useState(false)

    const id = useParams().id
    useEffect(() => {
        // fetch branch from db 
        tokenGet(p.apiBase + '/branch?id=' + id).then((d) => {
            setBranch(d)
        })
    }, [])

    let counter = 0

    const getTitle = () => {
        return (
            <h3 className={getCls('title')} >{branch.name}</h3>
        )
    }

    const getContent = (b) => {
        return (
            <div key={b._id} className={getCls('cont1')} style={{ direction: 'rtl', fontSize: fontSize + 'px', paddingBottom: padding + 'px' }}>
                {isNumbered && <span className={getCls('counter')}>{++counter}</span>}
                <span className={getCls('name')}>{b.name}</span>
            </div>
        )
    }

    return (
        <div className={getCls('wrapper0')}>
            {/* view options */}
            <div className={getCls('actions')}>
                {/* large text */}
                <span className={getCls('action')} onClick={() => {
                    setFontSize(fontSize + 2)
                }} >large text {fontSize}</span>
                {/* small text */}
                <span className={getCls('action')} onClick={() => {
                    setFontSize(fontSize - 2)
                }} >small text {fontSize}</span>
                {/* large padding */}
                <span className={getCls('action')} onClick={() => {
                    setPadding(padding + 8)
                }} >bigger Padding {padding}</span>
                {/* small padding */}
                <span className={getCls('action')} onClick={() => {
                    setPadding(padding - 8)
                }} >smaller Padding {padding}</span>
                {/* show numbers     */}
                <span className={getCls('action')} onClick={() => {
                    setIsNumbered(!isNumbered)
                }} ><i className="fas fa-sort-numeric-down"></i></span>
            </div>

            {branch && <div className={getCls('wrapper')}>
                {/* title */}
                {getTitle()}
                {/* list */}
                {branch.children.map(b => (
                    getContent(b)
                ))}
            </div>}
        </div>

    )
}


export default HTMLV

