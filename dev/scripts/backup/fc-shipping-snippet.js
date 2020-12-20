rates.removeDayTimeframes();

for (let d in cart["_embedded"]["fx:discounts"]) {
  const code = cart["_embedded"]["fx:discounts"][d]["code"];
  const country = cart["_embedded"]["fx:shipment"]["country"];
  const total_price = cart["_embedded"]["fx:shipment"]["total_item_price"];

  if (code == "Thanks" && country == "US" && total_price >= 75) {
    rates
      .filter("USPS")
      .price(0)
      .service("Free Shipping");
  }
}
