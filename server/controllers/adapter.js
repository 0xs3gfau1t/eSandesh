const { accountModel, userModel } = require('../model/user')

const sanitize = object => {
    const newObject = {}
    for (const key in object) {
        const value = object[key]
        if (key === '_id') {
            newObject.id = value.toHexString()
        } else if (key === 'userId') {
            newObject[key] = value.toHexString()
        } else if (key !== '__v') {
            newObject[key] = value
        }
    }
    return newObject
}
const MongooseAdapter = () => {
    return {
        async createUser(data) {
            const user = await userModel.create(data)
            return sanitize(user)
        },
        async getUser(id) {
            try {
                const user = await userModel.findById(id).lean()
                if (!user) return null
                return sanitize(user)
            } catch (err) {
                return null
            }
        },
        async getUserByEmail(email) {
            const user = await userModel.findOne({ email: email }).lean()
            if (!user) return null
            return sanitize(user)
        },
        async getUserByAccount(data) {
            const account = await accountModel.findOne(data)
            if (!account) return null
            const user = await userModel.findById(account.userId).lean()
            if (!user) return null
            return sanitize(user)
        },
        async updateUser(data) {
            const user = await userModel
                .findByIdAndUpdate(data.id, { name: data.name }, { new: true })
                .exec()
            if (user === null)
                return {
                    id: data.id,
                    emailVerified: null,
                }
            return sanitize(user)
        },
        async deleteUser(id) {
            await Promise.all([
                accountModel.deleteMany({ userId: id }),
                userModel.findByIdAndDelete(id),
            ])
        },
        async linkAccount(data) {
            const account = await accountModel.create(data)
            return sanitize(account)
        },
        async unlinkAccount(data) {
            const account = await accountModel.findOneAndDelete(data)
            if (account === null) return
            return sanitize(account)
        },
        // Chaiye ma implement garamla
        async getSessionAndUser(_sessionToken) {
            console.error('====> UNIMPLEMENTED GET_SESSION_AND_USER')
            return
        },
        async createSession(_data) {
            console.error('====> UNIMPLEMENTED CREATE_SESSION')
            return
        },
        async updateSession(_data) {
            console.error('====> UNIMPLEMENTED UPDATE_SESSION')
            return
        },
        async deleteSession(_sessionToken) {
            console.error('====> UNIMPLEMENTED DELETE_SESSION')
            return
        },
        async createVerificationToken(_data) {
            console.error('====> UNIMPLEMENTED CREATE_VERIFICATION_TOKEN')
            return
        },
        async useVerificationToken(_data) {
            console.error('====> UNIMPLEMENTED USE_VERIFICATION_TOKEN')
            return
        },
    }
}

module.exports = { MongooseAdapter, sanitize }
