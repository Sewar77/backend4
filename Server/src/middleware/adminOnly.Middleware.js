// receive req => owner or req => role="Admin" ? 

export const adminOnly = (req, res, next) => {
    const role = req.user.role
    if (role !== "admin") {
        return res.status(401).json({ message: "you are not allowed to do this action!" })
    }
    next() // امورك تمام، كمل 
}


