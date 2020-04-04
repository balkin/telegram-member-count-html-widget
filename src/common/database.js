const mongoose = require('mongoose');
const { mongo } = require('../config');

mongoose.connect(mongo.addr, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

const Chat = mongoose.model('Chat', {
    id: Number,
    name: String,
    username: String,
    region: String,
    members: Number,
    date: Date
});

/**
 * Add new chat to collection
 * @param {Object} _chat chat data
 * @returns {Promise<Document>}
 */
const add = async _chat => {
    const exists = await Chat.findOne({ username: _chat.username.toLowerCase() }).exec();
    if (exists) throw new Error('Chat exists!');
    const chat = new Chat({ ..._chat, username: _chat.username.toLowerCase() });
    return chat.save();
}

const updateCount = (username, members) => {
    return Chat.findOneAndUpdate({ username: username.toLowerCase() }, { members, date: new Date });
}

const updateName = (username, name) => {
    return Chat.findOneAndUpdate({ username: username.toLowerCase() }, { name });
}

const updateId = (username, id) => {
    return Chat.findOneAndUpdate({ username: username.toLowerCase() }, { id });
}

const findOne = username => {
    return Chat.findOne({ username: username.toLowerCase() }).exec();
}

const get = () => {
    return Chat.find({ id: { $exists: true } });
}

module.exports = {
    add,
    updateCount,
    updateName,
    updateId,
    findOne,
    get
};
