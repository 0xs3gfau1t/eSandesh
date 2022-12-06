const { accountModel, userModel } = require('../model/user')

const MongooseAdapter = () => {
    return {
        async createUser(data) {
            const user = await userModel.create(data)
            return user.toObject()
        },
        async getUser(id) {
            try {
                const user = await userModel.findById(id).lean()
                if (!user) return null
                return user.toObject()
            } catch (err) {
                return null
            }
        },
        async getUserByEmail(email) {
            const user = await userModel.findOne({ email: email }).lean()
            if (!user) return null
            return user.toObject()
        },
        async getUserByAccount(data) {
            const account = await accountModel.findOne(data)
            if (!account) return null
            const user = await userModel.findById(account.userId).lean()
            if (!user) return null
            return user.toObject()
        },
        async updateUser(data) {
            const user = await userModel
                .findByIdAndUpdate(data.id, { name: data.name }, { new: true })
                .exec()
            if (user === null) {
                return {
                    id: data.id,
                    emailVerified: null,
                }
            }
            return user.toObject()
        },
        async deleteUser(id) {
            await Promise.all([
                accountModel.deleteMany({ userId: id }),
                userModel.findByIdAndDelete(id),
            ])
        },
        async linkAccount(data) {
            const account = await accountModel.create(data)
            return account.toObject()
        },
        async unlinkAccount(data) {
            const account = await accountModel.findOneAndDelete(data)
            if (account === null) {
                return
            }
            return account.toObject()
        },
        // Chaiye ma implement garamla
        async getSessionAndUser(_sessionToken) {
            return
        },
        async createSession(_data) {
            return
        },
        async updateSession(_data) {
            return
        },
        async deleteSession(_sessionToken) {
            return
        },
        async createVerificationToken(_data) {
            return
        },
        async useVerificationToken(_data) {
            return
        },
    }
}

module.exports = MongooseAdapter
