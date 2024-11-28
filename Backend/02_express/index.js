
import express from "express";

const app = express();
const port = 3000;
app.use(express.json());

let teaData = [];
let nextId = 1;

// Whenever you take any data the chances are high that you actually use post route. Not always compulsory but majority of the time when you want to save the data in the database or something post is better way. You can take the data in get route also but post is more standard way.
// add a new tea
app.post("/teas", (req, res) => {
  console.log("POST");
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

// get all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

//get a tea with id
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  res.status(200).send(tea);
});

//update tea

app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));

  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.send(200).send(tea);
});

//delete tea

app.delete("/teas/:id", (req, res) => {
  console.log("delete");
  console.log(req.params.id);
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("tea not found");
  }
  teaData.splice(index, 1);
  res.status(200).send("Tea has been successfullydeleted");
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}...`);
});