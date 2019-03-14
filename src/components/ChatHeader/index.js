import React from 'react'
import { includes } from '../../utils/utils'

import './ChatHeader.css'

const ChatHeader = ({
    selectedChatId,
    chatsAdmin,
    chatMembers,
    onOpenMembersModal
}) => {

    const isChatAdmin = includes(chatsAdmin, selectedChatId)

    const memberCount = !!chatMembers ? chatMembers.length : 1

    return <div className="content__title">
        <button className="open_sidebar"></button>
        <h1 className="dialog__title ">
            {!!selectedChatId ? `${memberCount} members` : 'Welcome to ONTMessanger!'}
        </h1>
        <div className="actions">
            {
                isChatAdmin &&
                <span onClick={onOpenMembersModal} className="persons">
                    <i className="material-icons">group</i>
                </span>
            }
        </div>
    </div>
}

export default ChatHeader