export function getID(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function getSpinner() {
    return <i className="fas fa-spinner spinner"></i>
}
export function v2Spinner(name) {
    return <i className={"fas fa-spinner spinnerV2 " + name}></i>
}
export function startLine(w, h, classes) {
    return <div className={classes} style={{
        width: w + 'px',
        height: h + 'px'
    }}></div>
}



export async function deleteWHeader(url = '', headers) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        headers,
    })
    return response.json(); // parses JSON response into native JavaScript objects
}
export async function tokenPost(url = '', data = {}, token) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'token': token
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

export async function tokenPatch(url = '', data = {}, token) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'token': token
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

export async function tokenGet(url = '', headers) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        headers,
    })
    return response.json(); // parses JSON response into native JavaScript objects
}

export async function tokenDelete(url = '', token) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        headers: { token },
    })
    return response.json(); // parses JSON response into native JavaScript objects
}


async function asyncFor(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

export const AsyncForEach = async (arr, func) => {
    await asyncFor(arr, async (num) => {
        func()
    });
}

export function date1(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const dateObj = date;
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    let hour = dateObj.getMinutes() + 1;
    let min = dateObj.getHours()

    hour < 10 ? hour = "0" + hour : hour = hour
    min < 10 ? min = "0" + min : min = min

    return (
        <div className="qC8tN"><div className='XWusL-date'>
            <span className='qC8tN-'>{month}</span>
            <span className='qC8tN-'>{day}</span>
            <span className='qC8tN-'>{year}</span>
        </div>
            <div className='XWusL-time'>

                <span className='XWusL-m'>{min}</span>
                <span>:</span>
                <span className='XWusL-h'>{hour}</span>
            </div></div>

    )
}

export function date2(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const dateObj = date;
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    let min = dateObj.getMinutes() + 1;
    let hour = dateObj.getHours()
    let sec = dateObj.getSeconds()

    hour < 10 ? hour = "0" + hour : hour = hour
    min < 10 ? min = "0" + min : min = min
    sec < 10 ? sec = "0" + sec : sec = sec

    return (
        <div className="qC8tNgx8bx0dEav75JAWh"><div className='XWusL-date'>
            <span className='qC8tN-'>{month}</span>
            <span className='qC8tN-'>{day}</span>
            <span className='qC8tN-'>{year}</span>
        </div>
            <div className='XWusL-time'>
                <span className='XWusL-h'>{hour}</span>
                <span>:</span>
                <span className='XWusL-m'>{min}</span>
                <span>:</span>
                <span className='XWusL-s'>{sec}</span>

            </div></div>

    )
}