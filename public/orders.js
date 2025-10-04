let statusList = axios.get('http://localhost:3000/api/orderStatuses');
let addressesList = axios.get('http://localhost:3000/api/addresses1');
let statusArray = [];
let addressArray = [];
Promise.all([statusList, addressesList]).
  then((response) => {
    statusArray = response[0].data;
    addressArray = response[1].data;
    return axios.get('http://localhost:3000/api/orders');
  }).
  then(data => {
    let orders = [];
    orders = data.data.map(order => {
      return {
        ...order,
        orderStatus: statusArray.find(statusItem => {
          return statusItem.id === order.orderStatusId;
        }).description,
        shippingAddressText: () => {
          const address = addressArray.find(addressItem => addressItem.id === order.shippingAddress);
          return `${address.street}, ${address.city}, ${address.state}, ${address.zipCode}`;
        }
      }
    });
    showOrderList('#order-list', orders);
  }).catch((err) => {
    return showError('#order-list', err)
  }).finally(() => {
    hideWaiting();
  });



// let statusArray = [];
// showWaiting();
// axios.get('http://localhost:3000/api/orderStatuses').
//   then(data => {
//       statusArray = data.data;
//       return axios.get('http://localhost:3000/api/orders');
//   }).
//   then(data => {
//     let orders = [];
//     orders = data.data.map(order => {
//       return {
//         ...order,
//         orderStatus: statusArray.find(statusItem => {
//           return statusItem.id === order.orderStatusId;
//         }).description
//       }
//     });
//     showOrderList('#order-list', orders);
//   }).catch((err) => {
//     return showError('#order-list', err)
//   }).finally(() => {
//     hideWaiting();
//   });

