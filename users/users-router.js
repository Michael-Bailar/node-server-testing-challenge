const express = require('express')

const Users = require('./users-model.js')

const router = express.Router()

router.get('/', (req, res) => {
    Users.get()
        .then(users => {
            res.json(users)
        })
        .catch(error => {
            res.status(500).json({ message: "failed to get users" })
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id

    Users.getById(id)
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                res.status(404).json({ message: 'could not find user with the given id' })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "failed to get users", errorMessage: error })
        })
})

router.post('/', (req, res) => {
    const userData = req.body
    console.log(req.body)
    Users.insert(userData)
        .then(user => {
            res.status(201).json({ message: "user created successfully", user })
        })
        .catch(error => {
            res.status(500).json({ message: "failed to create new user", errorMessage: error.message})
        })
})

router.put("/:id", (req, res) => {
    const id = req.params.id
    const changes = req.body

    Users.getById(id)
        .then(user => {
            if(user) {
                Users.update(changes, id)
                    .then(updatedUser => {
                        res.status(201).json(updatedUser)
                    })
            } else {
                res.status(404).json({ message: "could not find user with the given id"})
            }
        })
        .catch(error => {
            res.status(500).json({ message: "failed to update user", errorMessage: error})
        })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id

    Users.remove(id)
        .then(deleted => {
            if(deleted) {
                res.json({ message: "delete successful", removedCount: deleted })
            } else {
                res.status(404).json({ message: "could not find a user with the given id"})
            }
        })
        .catch(error => {
            res.status(500).json({ message: "failed to delete user", errorMessage: error})
        })
})


module.exports = router;
