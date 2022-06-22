
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const dbConnectNoSql = require('./config/mongo');
const {dbConnectMySql} = require("./config/mysql");
const openApiConfiguration = require("./docs/swagger");
const app = express();

const ENGINE_DB = process.env.ENGINE_DB;

app.use(cors())
app.use(express.json())
app.use(express.static("storage"))

const port = process.env.PORT || 3000;

/**Definir ruta de documentacion */
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(openApiConfiguration));

/** Aqui invocamos a las rutas */
app.use("/api", require("./routes"))

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
});

(ENGINE_DB === 'nosql') ? dbConnectNoSql() : dbConnectMySql();