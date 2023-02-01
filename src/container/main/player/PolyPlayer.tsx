/* eslint-disable react/prop-types */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import { connect } from 'react-redux';

class PolyPlayer extends React.Component<any, any, any> {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        if (!window.polyvPlayer || !window.polyvLivePlayer) {
            // https://player.polyv.net/script/player.js /* 點播 */
            // https://player.polyv.net/resp/live-h5-player/latest/liveplayer.min.js /* 直播 */
        } else {
            this.loadPlayer();
        }
    }

    // componentWillUnmount() {
    //     if (this.player) {
    //         this.player.destroy()
    //     }
    // }

    // shouldComponentUpdate(nextProps, _nextState) {
    // return nextProps.user.channelId !== this.props.user.channelId;
    // }

    componentDidUpdate(pre) {
        if (pre.video !== this.props.video) {
            if (this.props.video.isLive && !window.polyvLivePlayer) {
                this.loadScript(
                    'https://player.polyv.net/resp/live-h5-player/latest/liveplayer.min.js',
                ).then(() => {
                    this.loadPlayer(true);
                });
            } else if (
                this.props.video.isLive === false &&
                !window.polyvPlayer
            ) {
                this.loadScript(
                    'https://player.polyv.net/script/player.js',
                ).then(() => {
                    this.loadPlayer(false);
                });
            }
        }
    }

    loadPlayer(live) {
        const { video = {} } = this.props;
        const { vid, uid } = video;
        const user = JSON.parse(sessionStorage.getItem('user'));
        //window.polyvPlayer /* 點播 */
        //window.polyvLivePlayer /* 直播 */
        if (live) {
            this.player = window?.polyvLivePlayer({
                wrap: '.player',
                uid,
                vid,
                width: '100%',
                height: '100%',
                lang: 'en',
                // audioMode: false,
                isAutoChange: true,
                // 點播
                // ban_seek: 'on',
                // ban_seek_by_limit_time: 'on',
                viewerInfo: {
                    viewerId: user.code,
                    viewerName: user.name,
                },
                param1: user.code,
                param2: user.name,
            });
            // this.player.on('s2j_onInitOver', e => {
            //     console.log(e, 's2j_onInitOver');
            //     this.props.playerComplete();
            // });
            this.player.on('s2j_onStartPlay', e => {
                console.log(e, 's2j_onStartPlay');
                this.props.playerComplete();
            });
            
        } else {
            this.player = window?.polyvPlayer({
                wrap: '.player',
                uid,
                vid,
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
                    viewerId: user.code,
                    viewerName: user.name,
                },
                param1: user.code,
                param2: user.name,
            });

            this.player.on('s2j_onPlayerInitOver', e => {
                this.props.playerComplete();
            });

            this.player.on('serverError', e => {
                console.log(e, 'e serverError');
                this.props.playerComplete();
            });
        }
    }

    loadScript(src) {
        const headElement =
            document.head || document.getElementsByTagName('head')[0];
        const _importedScript = {};

        return new Promise((resolve, reject) => {
            if (src in _importedScript) {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.onerror = _err => {
                headElement.removeChild(script);
                reject(new URIError(`The Script ${src} is no accessible.`));
            };
            script.onload = () => {
                _importedScript[src] = true;
                resolve();
            };
            headElement.appendChild(script);
            script.src = src;
        });
    }

    render() {
        return (
            <div
                className="player content"
                id="player"
                style={{ width: '940px', height: '530px' }}
            ></div>
        );
    }
}

export default PolyPlayer;
