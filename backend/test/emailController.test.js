const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();
chai.use(chaiHttp);

const requestData = {
  email: "tejesh6965@gmail.com",
  string: "hi this is a test string",
};

describe("POST request to Email sending function", () => {
  // Mocking the environment
  const originalEnv = process.env;
  before(() => {
    process.env = {
      EMAIL_AUTH: "dharamthokpranav@gmail.com",
      EMAIL_PASSWORD: "wrectzhamtdiqasj",
      EMAIL_SENDER_ADDRESS: "customerservice@clicksplit.com",
    };
  });

  it("should return a response", async () => {
    await chai
      .request(server)
      .post("/clicknsplit/api/send-email")
      .send(requestData)
      .then((res) => {
        should.exist(res.status);
        res.should.have.status(200);
        res.body.should.have.property("accepted");
        res.body.should.have.property("messageId");
      });
  });

  // Restoring the original environment
  after(() => {
    process.env = originalEnv;
  });
});

