const express = require('express');
const router = express.Router();
const pool = require('../../database');
const { isLoggedIn, isNotloggedIn } = require('../lib/auth');



router.get('/add', (req, res) => {
    res.render('frases/add');
});


router.post('/add', isLoggedIn, async (req, res) => {
    const { title, url, description } = req.body;
    const newFrase = {
        title,
        description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO frases set ?', [newFrase]);
    req.flash('success', 'Frase guardada con exito');
    res.redirect('/frases');
});

router.get('/', isLoggedIn, async (req, res) => {
    const frases = await pool.query('SELECT * FROM frases WHERE user_id = ?', [req.user.id]);
    res.render('frases/list', { frases });
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM frases WHERE ID = ?', [id]);
    req.flash('success', 'Frase Eliminada con exito');
    res.redirect('/frases');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const frases = await pool.query('SELECT * FROM frases WHERE id = ?', [id])
    res.render('frases/edit', { frase: frases[0] });
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const newFrase = {
        title,
        description,
    };
    await pool.query('UPDATE frases set ? WHERE id = ?', [newFrase, id]);
    req.flash('success', 'Frase Actualizada con exito');
    res.redirect('/frases');
});



module.exports = router;