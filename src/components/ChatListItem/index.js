import React from 'react'
import classNames from 'classnames'

const ChatListItem = ({
    chatId,
    lastMessage,
    timeLastMessage,
    colorPallet,

    selectedChatId,
    onChatSelected,
}) => {

    if (!colorPallet) {
        return false
    }

    const iconStyles = {
        backgroundColor: colorPallet.iconBackgroundColor,
        color: colorPallet.iconColor
    }

    return <>
        <li
            className={classNames("dialog__item", selectedChatId === chatId ? "selected" : "")}
            onClick={() => onChatSelected(chatId)}
        >
            <div className="dialog__item_link">
                <span className="dialog__avatar m-user__img_1 m-type_group" style={iconStyles}>
                    <i className="material-icons">supervisor_account</i>
                </span>
                <span className="dialog__info">
                    <span className="dialog__name">
                        {chatId}
                    </span>
                    <span className="dialog__last_message">
                        {lastMessage}
                    </span>
                </span>
                <span className="dialog_additional_info">
                    <span className="dialog__last_message_date">
                        {timeLastMessage}
                    </span>
                    <span className="dialog_unread_counter hidden">
                    </span>
                </span>
            </div>
        </li>   
    </>
}

export default ChatListItem