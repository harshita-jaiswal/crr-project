let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
chai.use(chaiHttp);

let requestData2 = {
  email: "tejesh6965@gmail.com",
  string: "hi this is a test string",
};
describe("Post request to Email sending function", () => {
  // mocking an environment
  before(function () {
    env = process.env;
    process.env = {
      EMAIL_AUTH: "dharamthokpranav@gmail.com",
      EMAIL_PASSWORD: "wrectzhamtdiqasj",
      EMAIL_SENDER_ADDRESS: "customerservice@clicksplit.com",
    };
  });
  it("it should return a response", async () => {
    await chai
      .request(server)
      .post("/clicknsplit/api/send-email")
      .send(requestData2)
      .then(function (res) {
        should.exist(res.status);
        res.should.have.status(200);
        res.body.should.have.property("accepted");
        res.body.should.have.property("messageId");
      });
  });

  // restoring everything back
  after(function () {
    process.env = env;
  });
});
