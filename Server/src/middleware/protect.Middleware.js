import jwt from "jsonwebtoken";
export const protect = async (req, res, next) => {
    // next => allow without action, go to thr NEXT function
    // read tokems from req
    const tokens = req.headers.authorization.split(" ")[1];
    if (!tokens) {
        return res.status(403).json({ message: "you are not allowed" });
    }
    try {
        const payload = await jwt.verify(tokens, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "internal server error on tokenss" });
    }
};
