const Constants = {
    // SMART_CONTRACT: '8677975d12735d50a08c922228a841ccc3d73183',
    // SMART_CONTRACT: 'e0d8e6b2ba78c3925aa721a75d80f176eadb8377', 
    SMART_CONTRACT: '154701b838ce746348b18e7d9452bf2bd247fad2',
    GAS_PRICE: 500,
    GAS_LIMIT: 100000000,
    SMART_CONTRACT_METHODS: {
        CREATE_CHAT: 'create_chat',
        GET_CHATS_BY_USER_ID: 'my_chats',
        GET_MESSAGE_COUNT: 'get_messages_count',
        RECAIVE_MESSAGES: 'get_messages',
        SEND_MESSAGE: 'set_message',
        GET_CHAT_ADMIN: 'get_chat_admin',
        GET_CHAT_MEMBERS: 'get_all_chat_mambers',
        ADD_MEMBER: 'add_member',
        REMOVE_MEMBER: 'delete_member'
    }
}

export default Constants