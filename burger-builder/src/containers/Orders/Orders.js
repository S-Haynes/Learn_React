import React, { Component } from 'react';
import Order from '../../components/Burger/Order/Order';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/orders';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
 
  componentDidMount() {
    this.props.getOrders();
  }
  
  render () {
    let orders = null;
    if(this.props.loading) {
      orders = <Spinner />
    }
   if(this.props.orders){
   orders = this.props.orders.map(order => {
      return <Order key={order.id} ingredients={order.ingredients} price={order.price} customer={order.orderData.name}/>
    })
   }
    return (
      <div>
      {orders}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(actions.getOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)