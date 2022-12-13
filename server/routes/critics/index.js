const express = require('express')
const router = express.Router()

router.get('/list', require('./listCritic'))
router.get('/', require('./getCritic'))
router.post('/', require('./addCritic'))
router.patch('/', require('./editCritic'))
router.delete('/', require('./deleteCritic'))

router.get('*', (_req, res) => {
    res.json({ message: 'yamete kudasai, critic san!' })
})

module.exports = router
