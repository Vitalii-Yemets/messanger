import React from 'react'
import './MembersModal.css'
import { makeRandomColorForString, isAddress } from '../../utils/utils'

const Member = ({ memberId, onRemoveMember }) => (
    <div className='member'>
        <span className='avatar'>
            <i className='material-icons' autoSave='off' autoComplete='off' style={{ color: makeRandomColorForString(memberId) }}>account_circle</i>
        </span>
        <div className='member-details'>
            <p>{memberId}</p>
        </div>
        <span onClick={() => onRemoveMember(memberId)} className='remove_from_chat'>
            <i className='material-icons'>delete</i>
        </span>
    </div>
)

const MembersModal = ({
    isOpenedMembersModal,
    chatMembers,

    onAddMember,
    onRemoveMember,
    onCloseMembersModal
}) => {

    if (!isOpenedMembersModal) {
        return false
    }

    const onSubmit = e => {
        e.preventDefault()

        const memberId = e.target.memberId.value.trim()

        if (isAddress(memberId) && !chatMembers.includes(memberId)) {
            onAddMember(memberId)
        }
    }

    return <div className='modal'>
        <div className='modal__dialog'>
            <div className='modal__dialog-head'>
                <p>add to chat</p>
                <span className='close' onClick={onCloseMembersModal}>&times;</span>
            </div>

            <form className='modal__dialog-input' onSubmit={onSubmit}>
                <input type='text' name='memberId' placeholder='Please enter User ID' autoComplete="off" />
                <button className="add_to_chat">
                    <i className="material-icons">person_add</i>
                </button>
            </form>

            <div className='modal__dialog-members'>
                {
                    chatMembers.map((memberId, key) => <Member
                        key={key}
                        memberId={memberId}
                        onRemoveMember={onRemoveMember} />)
                }
            </div>
        </div>
    </div>
}

export default MembersModal