const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {
    signUp(req, res, next){
        res.render("users/sign_up");
    },
    create(req, res, next){
        let newUser = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConfirmation: req.body.passwordConfirmation
        };
        userQueries.createUser(newUser, (err, user) => {
            console.log("userController create User");
            if(err){
                req.flash("error", err);
                res.redirect("/user/sign_up");
            } else {
                passport.authenticate("local")(req, res, () => {
                    req.flash("notice", "You've succesfully signed in!");
                    res.redirect("/");
                    console.log("User successfully created!");
                })
            }
        });
    }
}