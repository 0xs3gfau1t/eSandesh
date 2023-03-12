const express = require('express')
const router = express.Router()

const withPublisher = require('@/middlewares/withPublisher')

router.get('/list', require('./listCritic'))
router.get('/', require('./getCritic'))
router.post('/', withPublisher, require('./addCritic'))
router.patch('/', withPublisher, require('./editCritic'))
router.delete('/', withPublisher, require('./deleteCritic'))
router.post('/approve', withPublisher, require('./approveCritic'))

router.get('*', (_req, res) => {
    res.json({ message: 'yamete kudasai, critic san!' })
})

module.exports = router
