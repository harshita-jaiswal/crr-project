let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
chai.use(chaiHttp);
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
describe("Post request to upload an image", () => {
	// mocking an environment
	let env;
	before(function () {
		env = process.env;
	});

	it("it should return a response", async () => {
		chai
			.request(server)
			.post("/clicknsplit/api/upload-receipt")
			.attach("image", fs.readFileSync("./test/bill.jpg"), "bill.jpg")
			.then(function (res) {
				should.exist(res);
				res.should.have.status(200);
			});
	});

	// restoring everything back
	after(function () {
		process.env = env;
	});
});
