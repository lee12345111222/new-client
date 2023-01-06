/* eslint-disable react/prop-types */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react'
import { connect } from 'react-redux'

class PolyPlayer extends React.Component<any,any> {
    constructor(props: any) {
        super(props)
    }

    componentDidMount() {
        if (!window.polyvPlayer) {
            // https://player.polyv.net/script/player.js /* 點播 */
            // https://player.polyv.net/resp/live-h5-player/latest/liveplayer.min.js /* 直播 */
            this.loadScript('https://player.polyv.net/script/player.js').then(() => {
                this.loadPlayer()
            })
        } else {
            this.loadPlayer()
        }
    }

    // componentWillUnmount() {
    //     if (this.player) {
    //         this.player.destroy()
    //     }
    // }

    shouldComponentUpdate(nextProps, _nextState) {
        return nextProps.user.channelId !== this.props.user.channelId
    }

    componentDidUpdate() {
        this.loadPlayer()
    }

    loadPlayer() {
        //window.polyvPlayer /* 點播 */
        //window.polyvLivePlayer /* 直播 */
        this.player = window.polyvPlayer({
            wrap: '.player',
            uid: process.env.REACT_APP_POLYV_USER_ID,
            vid: "a428b9c908a2688369d00bd7b4755712_a",
            width: '100%',
            height: '100%',
            lang: 'en',
            autoplay: true,
            audioMode: false,
            // isAutoChange: true,
            // 點播
            // ban_seek: 'on',
            // ban_seek_by_limit_time: 'on',
            viewerInfo: {
                viewerId: this.props.user.code,
                viewerName: this.props.user.name,
            },
            param1: this.props.user.code,
            param2: this.props.user.name,
        })
    }

    loadScript(src) {
        const headElement = document.head || document.getElementsByTagName('head')[0]
        const _importedScript = {}

        return new Promise((resolve, reject) => {
            if (src in _importedScript) {
                resolve()
                return
            }
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.onerror = (_err) => {
                headElement.removeChild(script)
                reject(new URIError(`The Script ${src} is no accessible.`))
            }
            script.onload = () => {
                _importedScript[src] = true
                resolve()
            }
            headElement.appendChild(script)
            script.src = src
        })
    }

    render() {
        console.log(this.props.user.channelId)
        return (
            <div
                className="player content"
                id="player"
                style={{ width: '940px', height: '530px' }}
                // key={this.props.user.channelId}
            ></div>
        )
    }
}

const mapStateToPros = (state) => {
    return {
        user: {},
    }
}

export default connect(mapStateToPros, null)(PolyPlayer)
