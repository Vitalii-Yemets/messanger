import React from 'react'
import { lifecycle } from 'recompose'

const MessageSender = ({ onSendMessage }) => {
    return <>
        <div
            name="send_message"
            className="send_message"
            autoComplete="off">

            <textarea
                name="message_field"
                className="message_field"
                id="message_field"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                placeholder="Type a message"
                autoFocus="">
            </textarea>

            <div className="message__actions">
                <div className="attachments_preview"></div>
                <label htmlFor="attach_btn" className="attach_btn" style={{ visibility: 'hidden' }} >
                    <i className="material-icons">attachment</i>
                    <input type="file" id="attach_btn" name="attach_file" className="attach_input" accept="image/*" />
                </label>
                <button
                    className="send_btn"
                    id="send_btn"
                    onClick={() => {
                        const messageField = document.getElementById('message_field')
                        const text = messageField.value
                        onSendMessage(text)
                        messageField.value = ''
                    }}>send</button>
            </div>
        </div>
    </>
}

const withLifecycle = lifecycle({
    componentDidMount() {
        const messageField = document.getElementById('message_field')
        messageField.addEventListener('keyup', event => {
            if (event.keyCode === 13) {
                event.preventDefault()
                document.getElementById('send_btn').click()
            }
        })
    }
})(MessageSender)

export default withLifecycle