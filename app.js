const express = require("express");
const createHttpErrors = require("http-errors");

const app = express();

require("./configs/app.configs")(app);
const appRouter = require("./routes/app.routes");

app.use("/user", appRouter);

app.use((req, res, next) => {
    next(createHttpErrors.NotFound("Page you are looking for is not found."));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        ERROR: {
            status: err.status || 500,
            message: err.message || "Something Went Wrong.",
        },
    });
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`server is running at port : ${PORT}`);
});
