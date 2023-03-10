const router = require('express').Router()

router.post('/', require('./addMod'))
router.delete('/', require('./deleteMod'))
router.patch('/', require('./editMod'))
router.get('/', require('./getMod'))
router.get('/list', require('./listMods'))

module.exports = router
