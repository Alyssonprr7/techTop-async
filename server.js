const express = require("express")
const routes = require("./src/routes")

const app = express();

app.use(express.json());

app.use(routes)
app.get("/status", (request, response) => {
	return response.send({message:"Connected"})
});

app.listen(3333)
