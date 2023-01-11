/* eslint-disable react/prop-types */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import { connect } from 'react-redux';

class WistiaPlayer extends React.Component {
    componentDidMount() {
        this.handleLoadScript(
            'https://fast.wistia.com/assets/external/E-v1.js',
        ).then(() => {
            this.handlePlayerConfigOptions();
        });
    }

    handlePlayerConfigOptions() {
        const headElement =
            document.head || document.getElementsByTagName('head')[0];

        const script = document.createElement('script');
        script.type = 'text/javascript';

        script.innerText = `window._wq = window._wq || []; _wq.push({id: ${this.props.user.channelId}, options: {playerColor: '669DF6',volumeControl: false, playbackRateControl:false, playbar: false, videoFoam: true,controlsVisibleOnLoad:false, }});`;

        headElement.appendChild(script);
    }

    shouldComponentUpdate(nextProps, _nextState) {
        return nextProps.user.channelId !== this.props.user.channelId;
    }

    handleLoadScript(src: string) {
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

            script.src = src;
            script.async = true;
            script.onload = () => {
                _importedScript[src] = true;
                resolve();
            };

            document.body.appendChild(script);
        });
    }

    render() {
        return (
            <div key={this.props.user.channelId}>
                <div
                    className="wistia_responsive_padding"
                    style={{ padding: '56.25% 0 0 0', position: 'relative' }}
                >
                    <div
                        className="wistia_responsive_wrapper"
                        style={{
                            height: '100%',
                            left: '0',
                            position: 'absolute',
                            top: '0',
                            width: '100%',
                        }}
                    >
                        <div
                            className={`wistia_embed wistia_async_${this.props.user.channelId} playlistLinks=auto videoFoam=true email=${this.props.user.name}`}
                            style={{
                                height: '100%',
                                position: 'relative',
                                width: '100%',
                            }}
                        ></div>

                        {/* <a href="#wistia_y0lpcj3a7h">1</a>
                        <br />
                        <a href="#wistia_30q7n48g4f">2</a>
                        <br />
                        <a href="#wistia_342jss6yh5?time=30">3</a> */}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToPros = state => {
    return {
        user: state.user.user,
    };
};

export default connect(mapStateToPros, null)(WistiaPlayer);
