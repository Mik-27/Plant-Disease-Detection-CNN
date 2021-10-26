const fs = require("fs");
// const path = require("path");
const express = require("express");
const multer = require("multer");
const app = express();

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, __dirname + "/uploads/images/");
	},
	filename: function (req, file, cb) {
		file.originalname = "test.jpg";
		cb(null, file.originalname);
	},
});

const upload = multer({ storage: storage });

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/uploads/images"));
// app.set("view engine", "html");

app.get("/", (req, res) => {
	res.redirect("/predict");
});

app.get("/predict", (req, res) => {
	res.render("index.ejs");
});

app.post("/predict", upload.single("file"), (req, res) => {
	const data = req.file;
	const spawn = require("child_process").spawn;
	var process1 = spawn("python", ["./predict.py"]);
	process1.stdout.on("data", (data) => {
		console.log("Piping Data...");
		// return res.redirect("/results");
		const result = data.toString();
		console.log(result);
	});
	process1.on("close", (code) => {
		console.log("Process Closed.");
		// res.render("results.ejs");
		// window.location.assign("/results");
	});
	// res.sendStatus(200);
	// res.redirect("/results");
});

app.get("/results", (req, res) => {
	var data = fs.readFileSync("results.txt").toString();
	// var image = fs.readFileSync("./uploads/images/test.jpg");
	console.log(data);
	res.render("results.ejs", { result: data });
});

app.listen(5000, () => {
	console.log("Application Running...");
});
