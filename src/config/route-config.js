module.exports = {
    init(app){
        const staticRoutes = require("../routes/static");
        const userRoutes = require("../routes/users");
        const lessonRoutes = require("../routes/lessons");

        app.use(staticRoutes);
        app.use(userRoutes);
        app.use(lessonRoutes);
    }
}