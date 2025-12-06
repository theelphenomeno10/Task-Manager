const asyncWrapper = require("../wrappers/async")

const queryBuilder = asyncWrapper(async (req, res, next) => {
    req.filter = {}
    req.sort = {}
    req.pagination = {}

    let page = parseInt(req.query.page)
    if (isNaN(page) || page < 1) page = 1

    let limit = parseInt(req.query.limit)
    if (isNaN(limit) || limit < 1) limit = 10

    req.pagination.page = page
    req.pagination.limit = limit
    req.pagination.skip = (page - 1) * limit

    if (req.query.status){
        const validSort = ["pending", "in-progress", "done", "overdue"]

        if (!validSort.includes(req.query.status)){
            return res.status(400).json({msg: 'Invalid filter parameter on status'})
        }

        req.filter.status = req.query.status
    }

    if (req.query.priority){
        const DAY = 24 * 60 * 60 * 1000
        const now = new Date()
        const nowTime = now.getTime()

        const in1d = new Date(nowTime + 1 * DAY)
        const in3d = new Date(nowTime + 3 * DAY)
        const in1Week = new Date(nowTime + 7 * DAY)
        const in2Week = new Date(nowTime + 14 * DAY)

        switch (req.query.priority){
            case "emergency":{
                req.filter.expiry_date = {$gte: in1d, $lte: in3d}
                break
            }
            case "high":{
                req.filter.expiry_date = {$gt: in3d, $lte: in1Week}
                break
            }
            case "medium":{
                req.filter.expiry_date = {$gt: in1Week, $lte: in2Week}
                break
            }
            case "low":{
                req.filter.expiry_date = {$gt: in2Week}
                break
            }
            default:{
                return res.status(400).json({msg: 'Invalid filter parameter on priority'})
            }
        }
    }

    if (req.query.sort){
        const validSort = ["status", "expiry_date"]

        const fields = req.query.sort.split(",")
        fields.forEach(f => {
            const field = f.startsWith("-") ? f.substring(1) : f

            if (validSort.includes(field)){
                req.sort[field] = f.startsWith("-") ? -1 : 1
            }
        })
    }

    next()
})

module.exports = queryBuilder