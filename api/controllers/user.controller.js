import User from "../models/user.model.js";
import createError from "../utils/createError.js";

export const updateUser = async (req, res, next) => {
    try{
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );
        const { password, ...others } = updateUser._doc;
        res.status(200).send(others);
    } catch(err){
        res.status(500).send({ message: err.message });
    }
}

export const deleteUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
  
        if (req.userId !== user._id.toString()) {
            return next(createError(403, "You can delete only your account!"));
        }
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("User has been deleted!");
    } catch(err){
        res.status(404).send({ message: err.message });
    }
};

export const getUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).send(others);
    } catch(err){
        res.status(404).send({ message: err.message });
    }
};