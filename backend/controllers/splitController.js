let requestData = {
  totalPeopleInvolved: ["Sam", "Ram", "Sham", "Param", "Sharuk"],
  totalBillAmount: 500,
  data: [
    {
      people_count: 2,
      price: 15,
      people_involved: ["Sam", "Sham"],
      itemName: "Apple",
    },

    {
      people_count: 1,
      price: 20,
      people_involved: ["Sam"],
      itemName: "Banana",
    },
    {
      people_count: 2,
      price: 30,
      people_involved: ["Sham", "Param", "Sharuk"],
      itemName: "grapes",
    },
    {
      people_count: 2,
      price: 30,
      people_involved: ["Sham", "Param", "Sharuk"],
      itemName: "watermelon",
    },
    {
      people_count: 2,
      price: 30,
      people_involved: ["Sam", "Ram", "Sham"],
      itemName: "pear",
    },
    {
      people_count: 2,
      price: 150,
      people_involved: ["Ram", "Sham", "Param"],
      itemName: "pineapple",
    },
    {
      people_count: 2,
      price: 225,
      people_involved: ["Sham", "Ram"],
      itemName: "nuts",
    },
  ],
};

exports.splitBill = (req, res) => {
  let requestData = req.body;
  let items = requestData.data;

  let people = requestData.totalPeopleInvolved;

  let No_of_People = requestData.totalPeopleInvolved.length;
  let Total_bill_amount = requestData.totalBillAmount;
  let obj = [];
  let a = {};
  for (var i = 0; i < No_of_People; i++) {
    a = { name: people[i], items: [], share: 0 };
    obj.push(a);
    a = {};
  }

  let price = 0;
  let regexcurrency = /[^0-9.-]/gm;
  items.forEach((element) => {
    let amount = element.price.replace(regexcurrency, "");
    price = amount / element.people_involved.length;

    for (var j = 0; j < element.people_involved.length; j++) {
      for (var k = 0; k < obj.length; k++) {
        if (element.people_involved[j] === obj[k].name) {
          obj[k].items.push(element.itemName);
          obj[k].share = obj[k].share + price;
        }
      }
    }
  });
  console.log(obj);
  res.status(200).send(obj);
};
