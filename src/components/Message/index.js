import React from 'react'
import { makeRandomColorForString, processString } from '../../utils/utils'
import './Message.css'

const config = [{
    regex: /(http|https):\/\/(\S+)\.([a-z]{2,}?)(.*?)( |,|$|\.)/gim,
    fn: (key, result) => <span key={key}>
        {/* eslint-disable-next-line */}
        <a target="_blank" href={`${result[1]}://${result[2]}.${result[3]}${result[4]}`}>{result[2]}.{result[3]}{result[4]}</a>{result[5]}
    </span>
}, {
    regex: /(\S+)\.([a-z]{2,}?)(.*?)( |,|$|\.)/gim,
    fn: (key, result) => <span key={key}>
        {/* eslint-disable-next-line */}
        <a target="_blank" href={`http://${result[1]}.${result[2]}${result[3]}`}>{result[1]}.{result[2]}{result[3]}</a>{result[4]}
    </span>
}]

const Message = ({
    userId,
    text
}) => {

    const processed = processString(config)(text)

    return <div className="message__wrap">
        <span className="message__avatar m-user__img_1">
            <i className="material-icons" style={{ color: makeRandomColorForString(userId) }}>account_circle</i>
        </span>
        <div className="message__content">
            <div className="message__sender_and_status">
                <p className="message__sender_name">
                    {userId}
                </p>
            </div>
            <div className="message__text_and_date">
                <div className="message__text_wrap">
                    <p className="message__text">
                        {processed}
                    </p>
                </div>
                <div className="message__timestamp">
                    00:00
                </div>
            </div>
        </div>
    </div>
}

export default Message