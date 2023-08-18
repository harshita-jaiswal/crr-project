exports.splitBill = (req, res) => {
  const requestData = req.body;
  const items = requestData.data;
  const people = requestData.totalPeopleInvolved;

  const sharedItems = {};
  const regexCurrency = /[^0-9.-]/gm;

  people.forEach((person) => {
    sharedItems[person] = { name: person, items: [], share: 0 };
  });

  items.forEach((item) => {
    const amount = parseFloat(item.price.replace(regexCurrency, ""));
    const sharePerPerson = amount / item.people_involved.length;

    item.people_involved.forEach((person) => {
      sharedItems[person].items.push(item.itemName);
      sharedItems[person].share += sharePerPerson;
    });
  });

  const result = Object.values(sharedItems);

  console.log(result);
  res.status(200).send(result);
};


