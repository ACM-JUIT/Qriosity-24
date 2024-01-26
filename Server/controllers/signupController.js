const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const signupController = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

            if (password !== confirmPassword) {
                res.status(400).json({ error: "Passwords do not match" });
                return;
            }

            let user = await User.findOne({email});
            if(user){
                res.status(400).json({ error: "User already exists" });
                return;
            }
            
            try {
                bcrypt.genSalt(saltRounds, function (saltError, salt) {
                    if (saltError) {
                        throw saltError
                        } else {
                        bcrypt.hash(password, salt, function(hashError, hash) {
                            if (hashError) {
                            throw hashError
                            } else {
                                const newUser = new User({ name, email, password: hash, points: 0 });
                                newUser.save();
                            }
                        })
                        }
                    })

                res.status(200).json({ msg: "success" });
            } catch (error) {
                console.error('Error during signup:', error);
                res.status(500).json({ error: "Internal Server Error" });
            }
}