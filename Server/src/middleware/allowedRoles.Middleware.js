// receive req => owner or req => role="Admin" ? 

export const allowedRoles = (...roles) => { // send array [role1, role2]
    return (req, res, next) => {
        const role = req.user?.role // role3
        if (!roles.includes(role)) {
            return res.status(401).json({ message: "you are not allowed!" })
        }
        next()
    }
}


