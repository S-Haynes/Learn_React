import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './CheckoutForm.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';

class CheckoutForm extends Component {

  state = {
    orderForm: {
          name: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Your Name'
            },
            value: '',
            validation: {
              required: true
            },
            valid: false,
            touched: false
          },
          street: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Street'
            },
            value: '',
            validation: {
              required: true
            },
            valid: false,
            touched: false
          },
          zip: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
              required: true,
              minLength: 5,
              maxLength: 5
            },
            valid: false,
            touched: false
          },
          email: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Email Address'
            },
            value: '',
            validation: {
              required: true
            },
            valid: false,
            touched: false
          },
          deliveryMethod: {
            elementType: 'select',
            elementConfig: {
               options: [
                {value: 'fastest', displayValue: 'Fastest'},
                {value: 'cheapest', displayValue: 'Cheapest'}
              ]
            },
            value: 'fastest',
            validation: {},
            valid: true,
          },
    },
    loading: false,
    formIsValid: false
  }

  checkValidity = (value, rules) => {
    let isValid = true;

    if(rules.required){
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  orderHandler = (e) => {
    e.preventDefault();
    console.log(this.props.ingredients)
    this.setState({loading: true})
      let ingredientsObj = null
      const formData = {};
      for (let key in this.state.orderForm) {
        formData[key] = this.state.orderForm[key].value
      }
    setTimeout(() => {
        const ingredients = [...this.props.ingredients]
        const mappedIngredients = ingredients.map(ingredient => {
        return {[ingredient.type]: ingredient.quantity}
      })
      
      ingredientsObj = Object.assign({}, ...mappedIngredients)
        
      const order = {
        price: this.props.price,
        ingredients: ingredientsObj,
        orderData: formData
        }

      axios.post('/orders.json', order)
        .then(res => 
          {this.setState({loading: false});
          this.props.history.push('/')
      })
        .catch(err => this.setState({loading: false}))
     }, 2000) 
  }

  inputChangedHandler = (e, inputIdentifier) => {
    const formData = {
      ...this.state.orderForm
    };

    const updatedFormData = {
      ...formData[inputIdentifier]
    };

    updatedFormData.value = e.target.value;
    updatedFormData.valid = this.checkValidity(updatedFormData.value, updatedFormData.validation);
    updatedFormData.touched = true;
    formData[inputIdentifier] = updatedFormData;
    
    let formIsValid = true;

    for (let key in formData){
      formIsValid = formData[key].valid && formIsValid;
    }

    this.setState({
      orderForm: formData,
      formIsValid: formIsValid
    })
  }

  render () {

    const formElementsArray = [];
    for(let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
        <form onSubmit={this.orderHandler}> 
          {formElementsArray.map(formElement => {
            return <Input elementType={formElement.config.elementType}
                          elementConfig={formElement.config.elementConfig}
                          value={formElement.config.value}
                          key={formElement.id}
                          invalid={!formElement.config.valid}
                          touched={formElement.config.touched}
                          changed={(event) => (this.inputChangedHandler(event, formElement.id))}
            />
          })}
          <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
        </form>
    );

    if(this.state.loading){
      form = <Spinner />
    }
    return (
      <div className={classes.CheckoutForm}>
      <h3>Enter your Contact Info</h3>
      {form}   
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    price: state.totalPrice
  }
}

export default connect(mapStateToProps)(withRouter(CheckoutForm));