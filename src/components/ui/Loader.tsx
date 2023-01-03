import React from 'react'
import { LottieJSON } from '../../utils/links'
import Lottie from 'react-lottie'

import '../../styles/loader.scss'

const Loader = () => {
    return (
        <div id="loader">
            <div id="lottie">
                <Lottie
                    isClickToPauseDisabled={true}
                    options={{
                        loop: true,
                        autoplay: true,
                        animationData: LottieJSON.LOADER,
                        // renderer: 'svg',
                    }}
                ></Lottie>
            </div>
        </div>
    )
}

export default Loader
