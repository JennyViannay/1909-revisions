// REQUIRE what we need :
const express = require("express")
const connection = require('../../config/config')
const router = express.Router()

// ENTRY POINT :
router.get('/', (req, res) => {
    res.send("Route = /article").status(200)
})


//CRUD FOR ARTICLE 

//POST / CREATE
router.post('/create', (req, res)=> {
    const article = req.body
    connection.query('INSERT INTO article SET ?', article, (err, results) => {
        if (err) {
            res.status(500).send(`Erreur lors de la création de l'article !!`)
        } else {
            res.status(200).send('L\'artcle a bien été enregistré', results)
        }
    })
})

//GET / Get All && Get on by id

// GET ALL -------------
router.get('/get-all', (req, res)=> {
    connection.query('SELECT * FROM article', (err, results) => {
        if (err) {
            res.status(500).send(`Erreur lors de la récupération de la liste des articles !!`)
        } else {
            res.status(200).send(results)
        }
    })
})

//GET ONE BY ID ----------------
router.get('/:id', (req, res)=> {
    const id = req.params.id
    connection.query('SELECT * FROM article WHERE id = ?', id, (err, results) => {
        if (err) {
            res.status(500).send(`Erreur lors de la récupération de l'article !!`)
        } else {
            res.status(200).send(results)
        }
    })
})


//UPDATE / update by id
router.put('/:id', (req, res)=> {
    const id = req.params.id
    const article = req.body
    connection.query('UPDATE article SET ? WHERE id = ?', [article, id], (err, results) => {
        if (err) {
            res.status(500).send(`Erreur lors de la modification de l'article !!`)
        } else {
            res.status(200).send('L\'article a bien été modifié')
        }
    })
})

//DELETE / delete on by id || multiple delete [array d'id]
router.delete('/:id', (req, res)=> {
    const id = req.params.id
    connection.query('DELETE FROM article WHERE id = ?', id, (err, results) => {
        if (err) {
            res.status(500).send(`Erreur lors de la suppression de l'article !!`)
        } else {
            res.status(200).send('L\'article a bien été supprimé')
        }
    })
})

module.exports = router
