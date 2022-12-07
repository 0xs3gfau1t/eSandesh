const express = require('express')

const commentModel = require('../../model/comment')
const articleModel = require('../../model/article')

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
const addComment = async (req, res) => {
	const { articleId, content, commentId } = req.body
	// const { userId } = req.auth
	const userId = '6390122a8138df349bab6188'
	// This creates a comment on article
	if (articleId) {
		try {
			const comment = new commentModel({
				user: userId,
				content: content,
				article: articleId,
			})
			await comment.save()

			// Make sure it comment is updated on article
			await articleModel.findOneAndUpdate({_id: articleId}, {$push: { comments: comment._id }})

			return res.json({ message: 'success', comment: comment })
		} catch (e) {
			console.log(e)
			return res.status(500).json({ error: 'Something went wrong' })
		}
	}

	// This creates comment on other comments
	if (commentId) {
		try {
			const comment = new commentModel({
				user: userId,
				content: content,
				likes: 0,
			})
			await comment.save()
			console.log(comment)
			await commentModel.findOneAndUpdate(
				{ _id: commentId },
				{ $push: { subComments: comment._id } }
			)
			return res.json({ message: 'success', comment: comment })
		} catch (e) {
			console.log(e)
			return res.status(500).json({ error: 'Something went wrong' })
		}
	}

	res.json({ message: 'Invalid parameters' })
}

module.exports = addComment
module.exports = addComment
