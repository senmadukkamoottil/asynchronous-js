
let statusArray = [];
showWaiting();
axios.get('http://localhost:3000/api/orderStatuses').
  then(data => {
      statusArray = data.data;
      return axios.get('http://localhost:3000/api/orders');
  }).
  then(data => {
    let orders = [];
    orders = data.data.map(order => {
      return {
        ...order,
        orderStatus: statusArray.find(statusItem => {
          return statusItem.id === order.orderStatusId;
        }).description
      }
    });
    showOrderList('#order-list', orders);
  }).catch((err) => {
    return showError('#order-list', err)
  }).finally(() => {
    hideWaiting();
  });


  // then((orders) => {
  //   orders = orders;
  //   return 
  // }).
  // then((data) => {
  //     orders = orders.map(item => {
  //       ...item,
  //       orderStatus: data.find((item.orderStatusId === data.id ) => {
          
  //       },
  //     });
  //     showOrderList('#order-list', orders);
  // })

  // catch((err) => {
  //   return showError('#order-list', err)
  // });