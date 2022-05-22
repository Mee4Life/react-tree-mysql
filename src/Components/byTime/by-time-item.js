import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteWHeader } from '../../utils/functions'
import ReactEmbedGist from 'react-embed-gist';
import ReactAudioPlayer from 'react-audio-player';
import { Player } from 'video-react';


function ByTimeItem(props) {
    // extract data 
    const { branch, ex } = props
    const { isDark } = ex.p
    // create state 
    const [isDeleted, setIsDeleted] = useState(false)

    // functions
    const getCls = (base) => {
        return ex.p.getCls('by-time-item-' + base)
    }

    const getDate = () => {
        const date = new Date(branch.createdAt)
        let year, month, day, hour, min
        year = date.getFullYear()
        month = date.getMonth() + 1
        day = date.getDate() + 1
        hour = date.getHours() + 1
        min = date.getMinutes() + 1

        hour < 10 ? hour = '0' + hour : hour = hour
        min < 10 ? min = '0' + min : min = min
        day < 10 ? day = '0' + day : day = day
        month < 10 ? month = '0' + month : month = month

        return (
            <div className={getCls('date')}>
                <div className={getCls('date-date')} >{day} . {month} . {year} </div>
                <div className={getCls('date-time')} > {hour} : {min}  </div>
            </div>
        )
    }

    const handleRemove = () => {
        const url = ex.p.apiBase + '/branch?id=' + branch._id
        deleteWHeader(url, { token: ex.p.token })
            .then((d) => {
                console.log(d)
                setIsDeleted(true)
                console.log(d);
            })
    }

    const branchDir = () => {
        if (branch.lang == 'ar') return 'rtl'
        else return 'ltr'
    }

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }
    const getLinkContent = () => {
        let res = ''
        if (branch.extra && branch.extra.name) {
            res = (<Link className={ex.p.getCls('link')} to={'/' + branch.name}>{branch.extra.name}</Link>)
        } else {
            res = (<Link className={ex.p.getCls('link')} to={'/' + branch.name}>{branch.name}</Link>)
        }

        return res
    }



    const getTextContent = () => {
        return <div dangerouslySetInnerHTML={{ __html: branch.name.replace("<br>", "").replace(/\n\n/g, "<br>").replace(/\n/g, "<br>") }} className={`link branch-name-byTime ${isDark ? "dark-link" : "light-link"}`} style={{ direction: `${branchDir()}` }, {fontSize: ex.p.fontSize}}>
        </div>
    }

    const getYoutubeSource = () => {
        return "https://www.youtube.com/embed/" + branch.name
    }

    const getYoutubeContent = () => {
        // check client width : 
        if (getWindowDimensions().width > 600) {
            return <div className="youtube-container">
                <iframe width="auto" height="auto" src={getYoutubeSource()} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        } else {
            return <div className="youtube-container">
                <iframe width="300" height="250" src={getYoutubeSource()} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen='true'></iframe>
            </div>
        }
    }

    const getGistContent = () => {
        return <ReactEmbedGist gist={branch.name} titleClass="gist__title"
            contentClass="gist__content" />
    }

    const getSoundContent = () => {
        // 
        // {branch.name}
        const audio = <ReactAudioPlayer
            src={branch.name}
            controls
            loop
        />

        return audio
    }

    const getImageContent = () => {
        // check client width : 
        if (getWindowDimensions().width > 600) {
            return <img style={{ maxWidth: 300 }} src={branch.name} alt="" />
        } else {
            return <img style={{ width: 300 }} src={branch.name} alt="" />
        }
    }

    const getVideoContent = () => {
        const e = <Player className="video-player">
            <source src={branch.name} />
        </Player>
        return e
    }

    const getBranch = () => {
        let content;
        if (branch.type === 'text') {
            content = getTextContent()
        }
        if (branch.type === 'image') {
            content = getImageContent()
        }

        if (branch.type === 'youtube') {
            content = getYoutubeContent()
        }
        if (branch.type === 'gist') {
            content = getGistContent()
        }
        if (branch.type === 'sound') {
            content = getSoundContent()
        }
        if (branch.type === 'video') {
            content = getVideoContent()
        }
        if (branch.type === 'link') {
            content = getLinkContent()
        }

        return content
    }


    return (
        <div >
            {!isDeleted &&
                <div className={getCls('container')}>
                    <div className={getCls('more-container')}><Link className={getCls('more')} to={"/" + branch._id} target="_blank">المزيد</Link> <span className={getCls('remove')} onClick={handleRemove} >حذف</span>
                    </div>

                    <div className={getCls('name')} >{getBranch()}</div>
                    <div className={getCls('date-container')} >{getDate()}</div>
                </div>
            }
        </div>
    )
}

export default ByTimeItem
