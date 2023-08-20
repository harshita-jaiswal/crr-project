const { Butler } = require("butler-sdk");
const apiKey = process.env.APIKEY;
const queueId = process.env.QUEUEID;

const client = new Butler(apiKey);
const fs = require("fs");
var multer = require("multer");

function processExtractedData(data) {
	const extractedData = [];
	const tempDataArray = [];

	data.forEach((row) => {
		const rowData = [];
		row.cells.forEach((cell) => {
			rowData.push({ name: cell.columnName, value: cell.value });
		});
		tempDataArray.push(rowData);
	});

	tempDataArray.forEach((data) => {
		extractedData.push({
			name: data.find((item) => item.name === "Item Name").value,
			quantity: data.find((item) => item.name === "Quantity").value,
			value: data.find((item) => item.name === "Total Price").value,
		});
	});

	return extractedData;
}

exports.scanReceipt = (req, res) => {
	if (req.file.path && typeof req.file.path !== undefined) {
		const fileStream = fs.createReadStream(req.file.path);
		client.extractDocument(queueId, fileStream)
			.then((response) => {
				const items = response.tables[0].rows;

				const responseArray = processExtractedData(items, queueId);

				res.status(200).send(responseArray);
			})
			.catch((error) => {
				console.log(error);
			});
	} else {
		res.send("File does not exist");
	}
};

exports.uploadReceipt = (req, res) => {
	res.send("Image has been uploaded here: " + req.file.path);
};

exports.imageStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "img/");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
