const { Butler } = require("butler-sdk");

const apiKey = process.env.APIKEY;
const queueId = process.env.QUEUEID;

const client = new Butler(apiKey);
const fs = require("fs");
var multer = require("multer");

exports.scanReceipt = (req, res) => {
  let extractedData = [];
  let tempDataArray = [];
  let responseArray = [];

  if (req.file.path && typeof req.file.path !== undefined) {
    const fileStream = fs.createReadStream(req.file.path);

    client
      .extractDocument(queueId, fileStream)
      .then((response) => {
        console.log(response);
        const items = response.tables[0].rows;

        items.forEach((row) => {
          row.cells.forEach((cell) => {
            extractedData.push({ name: cell.columnName, value: cell.value });
          });
          tempDataArray.push(extractedData);
          extractedData = [];
        });

        tempDataArray.forEach((data) => {
          responseArray.push({
            name: data.find((item) => item.name === "Item Name").value,
            quantity: data.find((item) => item.name === "Quantity").value,
            value: data.find((item) => item.name === "Total Price").value,
          });
        });
        console.log(responseArray);
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
  console.log(req.body);
  res.send("Image has been uploaded here: " + req.file.path);
};

exports.imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'img/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});


