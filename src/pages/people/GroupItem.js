import React, { useState } from 'react'
import { tokenPatch, tokenDelete } from '../../utils/functions'
import Input1 from '../../Components/Inputs/input1'
import {Link} from 'react-router-dom'

function GroupItem(props) {
    const { p, group } = props
    const getCls = (base) => { return p.getCls('IC-' + base) }



    // create state . 
    const [eName, setEName] = useState(group.fname)
    const [isChanged, setIsChanged] = useState(false)
    const [isRemoved, setIsRemoved] = useState(false)
    const [isRemoveMsg, setRemoveMsg] = useState(false)


    // functions 
    const handleSave = () => {
        tokenPatch(p.apiBase + '/person', { id: group._id, fname: eName }, p.token)
            .then((d) => {
                setIsChanged(true)
                setTimeout(() => {
                    setIsChanged(false)
                }, 3000);
            })
    }

    // get success msg container 
    const getSuccessMsg = (msg) => {
        return (
            <div className={getCls('success')}>
                <i className="fas fa-clipboard-check"></i>
                {msg}
            </div>

        )
    }

    // get error msg container 
    const getWarringMsg = (msg) => {
        return (
            <div className={getCls('wrg')}>
                <i className="fas fa-exclamation-triangle"></i>
                {msg}
            </div>

        )
    }

    // remove function. 
    const handleRemove = () => {
        tokenDelete(p.apiBase + '/person?id=' + group._id, p.token)
            .then((d) => {
                setIsRemoved(true)
                setRemoveMsg(true)
                setTimeout(() => {
                    setRemoveMsg(false)
                }, 3000);
            })
    }

    return (
        <div className={getCls('wrap')}>
            {/* info section and msgs  */}
            <div className={getCls('infoSection')}>
                {/* success re named info */}
                <div className={getCls('0Y4HRb')}>
                    {isChanged && getSuccessMsg('Name Changed Successfully. '
                    )}
                </div>
                {/* success re remove  */}
                <div className={getCls('B7GB6')}>
                    {isRemoveMsg && getWarringMsg('Tag Deleted . '
                    )}
                </div>
            </div>
            {/* group item */}
            {!isRemoved && <div className={getCls('c1')}>
                <div className={getCls('container')}>
                    {/* name as input */}
                    <div className={getCls('headers')}>
                        {/* group name input filed */}
                        <Input1
                            type="text"
                            value={eName}
                            onChange={((e) => {
                                setEName(e.target.value)
                            })}
                            classes="iName" />
                    </div>

                    <div className={getCls('actions')} >
                        {/* link */}
                        <Link
                            className={getCls('action') + ' link-action'}
                            to={'/person/' + group._id}>
                            <i className="fas fa-book-open"></i>
                        </Link>
                        {/* remove icon */}
                        <div onClick={handleRemove}
                            className={getCls('action') + ' remove-action'}>
                            <i className="fas fa-trash"></i>
                        </div>

                        {/* save btn */}
                        <div
                            className={getCls('action') + ' save-action'}
                            onClick={handleSave}>
                            <i className="far fa-save"></i>
                        </div>
                    </div>
                </div>
            </div>}

        </div >
    )
}

export default GroupItem

