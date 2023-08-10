const { Butler } = require("butler-sdk");
const apiKey = process.env.APIKEY;
const queueId = process.env.QUEUEID;
const client = new Butler(apiKey);
const fs = require("fs");
var multer = require("multer");
const upload = multer({ dest: process.env.DEFAULT_IMAGE_PATH });

exports.scanReceipt = (req, res) => {
  let array = [];
  let arrayTemprory = [];
  let resp = [];
  if (req.file.path && typeof req.file.path != undefined) {
    const file = fs.createReadStream(req.file.path);

    client
      .extractDocument(queueId, file)
      .then((response) => {
        console.log(response);
        //res.send(response);
        let items = response.tables[0].rows;

        items.forEach((ele, ind) => {
          ele.cells.forEach((ele1, ind1) => {
            array.push({ name: ele1.columnName, value: ele1.value });
          });
          arrayTemprory.push(array);
          array = [];
        });

        arrayTemprory.forEach((ele, ind) => {
          resp.push({
            name: ele.find((todo) => todo.name == "Item Name").value,
            quantity: ele.find((todo) => todo.name == "Quantity").value,
            // unitprice: ele.find((todo) => todo.name == "Unit Price").value,
            value: ele.find((todo) => todo.name == "Total Price").value,
          });
        });
        console.log(resp);
        res.status(200).send(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    res.send("File does not exist");
  }
};

exports.uploadreceipt = (req, res) => {
  console.log(req.body);
  res.send("Image has been uploaded here : " + req.file.path);
};

exports.imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(process.env.NEW);
    cb(null, process.env.DEFAULT_IMAGE_PATH);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
