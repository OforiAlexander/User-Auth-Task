import jwt from 'jsonwebtoken';
import User from '../models/user.js';

class userAuthController {
    static async register(req, res) {
        try {
            const user = await User.create({
                username: req.body.username,
                password: req.body.password
            });
            res.status(201).json({
                status: 'success',
                message: 'User registered successfully',
                data: {
                    id: user.id,
                    username: user.username
                }
            });
        } catch (error) {
            if (error.name === "SequelizeUniqueContraintError") {
                return res.status(409).json({
                    status: 'error',
                    message: 'Username already exists'
                });
            }

            if (error.name === "SequelizeValidationError") {
                return res.status(400).json({
                    status: "error",
                    message: error.errors[0].message
                });
            }
        }
    }

    static async login(req, res) {
        try {
            const user = await User.findOne({
                where: {
                    username: req.body.username
                }
            });
            if (!user) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Invalid username or password'
                });
            }
            const validPassword = await user.validatePassword(req.body.password);
            if (!validPassword) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Invalid username or password'
                });
            }
            const token = jwt.sign(
                { id: user.id, username: user.username },
                process.env.JWT_SECRET, {
                    expiresIn: '1h'
            });
            res.status(200).json({
                status:'success',
                message: 'User logged in successfully',
                data: {
                    token
                }
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Internal server error',
                error: process.env.Node_ENV === "development" ? error.message : underfined
            });
        }
    }}

    export default userAuthController;