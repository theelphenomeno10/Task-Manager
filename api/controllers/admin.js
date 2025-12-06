const asyncWrapper = require('../middlewares/wrappers/async.js')
const User = require('../models/users.js')

const getAllUser = asyncWrapper(async (req, res, next) => {
    console.log(req.user.role)
    const filter = req.filter || {}
    const sort = req.sort || {}
    const {limit, page, skip} = req.pagination

    const user = await User.find(filter).sort(sort).skip(skip).limit(limit).lean()

    if (user.length === 0){
        return res.status(200).json({total: 0, page, limit, user: []})
    }

    const total = await User.countDocuments(filter)

    return res.status(200).json({total, page, limit, user})
})

module.exports = {getAllUser}