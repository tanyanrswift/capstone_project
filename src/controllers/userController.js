const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {
    create(req, res, next){
        let newUser = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConfirmation: req.body.passwordConfirmation
        };
        userQueries.createUser(newUser, (err, user) => {
            if(err){
                req.flash("error", err);
                res.redirect("/user/sign_up");
            } else {
                console.log(user);
                passport.authenticate("local")(req, res, () => {
                    req.flash("notice", "You've succesfully signed in!");
                    res.redirect("/");
                    console.log("User successfully created!");
                })
            }
        });
    },
    signUp(req, res, next){
        res.render("users/sign_up");
    },
    signInForm(req, res, next){
        res.render("users/sign_in");
    },
    signIn(req, res, next){
        passport.authenticate("local")(req, res, function () {
            if(!req.user){
                req.flash("notice", "Sign in failed. Please try again.")
                res.redirect("/users/sign_in");
            } else {
                console.log("Sign In Successful");
                console.log(user);
                req.flash("notice", "You've successfully signed in!");
                res.redirect("/");
            }
        })
    },
    signOut(req, res, next){
        req.logout();
        req.flash("notice", "You;'ve successfully signed out!");
        console.log("Sign Out Successful")
        res.redirect("/");
    }
}