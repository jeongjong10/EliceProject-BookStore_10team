export const OrderProduct = (orders) => {
  if (orders.orderList.legnth > 1) {
    orders.orderList.map((orderList, index) => {
      return `${orders.orderList[index].productName} / ${orders.orderList[index].count} 개`;
    });
  } else {
    return `${orders.orderList[0].productName} / ${orders.orderList[0].count} 개`;
  }
};
