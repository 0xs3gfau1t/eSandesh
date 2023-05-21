const express = require('express')
const articleModel = require('../../model/article')
const { ObjectId } = require('mongodb')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
const delArticle = async (req, res) => {
    const { id } = req.query

    const { user } = req.session

    const filter = { _id: ObjectId(id) }

    // If the user is not admin then
    // they can't delete others article
    if (user.roles.isRoot !== true) filter.createdBy = user.id

    try {
        articleModel.deleteOne(filter, (e,d)=>{
            if(d.deletedCount === 0)
                return res.status(401).json({message: "Cannot delete / Record Not found"})

            return res.json({ message: 'success' })
        })

    } catch (err) {
        console.error(err)
        return res.status(500).json({ error: 'Something went wrong.' })
    }
}

module.exports = delArticle
