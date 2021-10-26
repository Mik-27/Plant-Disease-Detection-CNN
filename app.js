const input = document.getElementById("formFile");

console.log("Running...");

const uploadFile = (file) => {
	// add file to FormData object
	const fd = new FormData();
	fd.append("formFile", file);

	// send `POST` request
	fetch("http://localhost:5000/predict", {
		method: "POST",
		body: fd,
	})
		.then((res) => res.json())
		.then((json) => console.log(json))
		.catch((err) => console.error(err));
};

const pr = document.querySelector("#predict");
console.log(pr);
pr.addEventListener("click", () => {
	uploadFile(input.files[0]);
	// console.log(input.files[0]);
	// console.log(input)
});
