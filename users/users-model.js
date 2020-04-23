const db = require('../data/db-config.js')

module.exports = {
    get,
    getById,
    insert,
    update,
    remove
}

function get() {
    return db("users")
}

function getById(id) {
    return db('users')
        .where({ id })
        .first()
}

function insert(user) {
    return db("users")
        .insert(user, 'id')
        .then(([id]) => {
            return getById(id)
        })
}

function update(changes, id) {
    return db('users')
        .where({ id })
        .update(changes)
        .then(() => {
            return getById(id)
        })
}

function remove(id) {
    return db("users")
        .where({ id })
        .del()
}