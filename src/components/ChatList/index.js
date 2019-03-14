import React from 'react'

import ChatListHeader from '../../components/ChatListHeader'
import ChatListItem from '../../components/ChatListItem'

import './ChatList.css'

const ChatList = ({
    chats,
    selectedChatId,
    onCreateChat,
    onChatSelected
}) => {
    return <div className="sidebar">
        <ChatListHeader />
        <div className="sidebar__inner">
            <div className="sidebar__content">
                <ul className="sidebar__tabs">
                    <li className="sidebar__tab">
                        <a href="/" className="sidebar__tab_link active">chats</a>
                    </li>
                    <li className="sidebar__tab sidebar__tab_button_wrap m-sidebar__tab_new">
                        <button onClick={onCreateChat} className="sidebar__tab_button m-sidebar__tab_link_new">
                            <i className="material-icons">
                                add_circle_outline
                            </i>
                        </button>
                    </li>
                </ul>
                <ul className="sidebar__dilog_list">
                    {
                        chats && chats.map((chatListItemModel, key) => {
                            const chatListItemProps = {
                                ...chatListItemModel,
                                onChatSelected,
                                selectedChatId
                            }
                            return <ChatListItem key={key} {...chatListItemProps} />
                        })
                    }
                </ul>
            </div>
        </div>
    </div>
}

export default ChatList