module.exports = {
    init(app){
        const staticRoutes = require("../routes/static");
        const userRoutes = require("../routes/users");

        app.use(staticRoutes);
        app.user(userRoutes);
    }
}