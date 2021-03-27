"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_graphql_1 = require("express-graphql");
const schema_1 = __importDefault(require("./schema/schema"));
dotenv_1.default.config();
const app = express_1.default();
const PORT = process.env.PORT;
app.use("/graphql", express_graphql_1.graphqlHTTP({
    schema: schema_1.default,
    graphiql: true
}));
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
