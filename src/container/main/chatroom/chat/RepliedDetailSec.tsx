import React, { FC } from 'react'

import { RepliedDetail } from '../../interactiveSec/InteractiveSec'
import { icons } from '../../../../lib/icons'

type RepliedDetailSecProps = {
    replied: RepliedDetail
    handleRepliedDetailClose: () => void
}

const RepliedDetailSec: FC<RepliedDetailSecProps> = ({ replied, handleRepliedDetailClose }) => {
    return (
        <div className="message-list-replied-section">
            <div className="message-list-replied-section-body">
                <div className="message-list-replied-section-img-container">
                    <img src={replied.repliedAvatar} alt={replied.repliedAvatar} />
                </div>
                <div className="message-list-replied-section-content-container">
                    <div className="message-list-replied-section-name">{replied.repliedName}</div>
                    <div className="message-list-replied-section-content">
                        {replied.repliedContent.length > 40
                            ? replied.repliedContent.substring(0, 40) + '...'
                            : replied.repliedContent}
                    </div>
                </div>
                <button className="message-list-replied-section-close-btn" onClick={handleRepliedDetailClose}>
                    {icons.close()}
                </button>
            </div>
        </div>
    )
}

export default RepliedDetailSec
