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
  before(function () {
    env = process.env;
    process.env = {
      APIKEY:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnb29nbGUtb2F1dGgyfDExMTgxNjkwNDQ0OTMxMDYzOTkxMCIsImVtYWlsIjoic2FtdXNlcjMwMTBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImlhdCI6MTY2NTIwNjAyMzUwMX0.dD2tdk9rTCSjR-AIN5nA4XUQq07IAXA9fvhPl2PiLQM",
      QUEUEID: "bc490258-dbc2-457d-8a7e-d4c71081bb4e",
      DEFAULT_IMAGE_PATH: "img/",
      DEFAULT_IMAGE_PATH: "./uploads",
    };
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
