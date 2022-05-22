import { React, useState } from 'react'

function BranchLang(props) {
    const { lang, setLang, branchType } = props


    const getSelectableLang = () => {
        return (
            <select className="select-branch-lang" name="lang" onChange={(e) => {
                setLang(e.target.value)
            }}>
                <option value="ar">Arabic</option>
                <option value="en">English</option>
            </select>
        )
    }

    const isTextBranch = () => {
        if (branchType === 'text') return true
        return false
    }

    return (
        <div>
            {isTextBranch && getSelectableLang()}
        </div>
    )
}

export default BranchLang
