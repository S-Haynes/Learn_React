import React, { Component } from 'react';
import Order from '../../components/Burger/Order/Order';
import axios from '../../axios-orders'

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  }
  componentDidMount() {
    let orders = []
    axios.get('/orders.json')
          .then(res => {
            for(let key in res.data){
              orders.push({
                id: key,
                ...res.data[key]
              })
            }
            this.setState({loading: false, orders: orders})
          })
        .catch(err => {
          this.setState({loading: false})
        }) 
  }
  
  render () {

    const orders = this.state.orders.map(order => {
      return <Order key={order.id} ingredients={order.ingredients} price={order.price} customer={order.orderData.name}/>
    })
    return (
      <div>
        {orders}
      </div>
    )
  }
}

export default Orders