import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
//connect allows react components to get state from redux
import { connect } from 'react-redux'
import { getItems, deleteItem } from '../actions/itemActions';
//PropTypes is just part of react. Whenever you have component properties you should put them inside of prop-types which basically is a form of validation.
import PropTypes from 'prop-types';


class ShoppingList extends Component {

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick=(id)=>{
    this.props.deleteItem(id);
  }
  // () => {
  //   this.setState(state => ({
  //     items:state.items.filter(item => item.id !==id)
  //   }));                    
  // }

  render() {
    const { items } = this.props.item;
    return(
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={150} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)}
                  >&times;</Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

ShoppingList.propTypes ={
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item
})

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);

// <Button 
// color="dark"
// style={{ marginBottom: '2rem' }}
// onClick={() => {
//   const name = prompt('Enter Item');
//   if (name) {
//     this.setState(state => ({
//       items:[...state.items, { id: uuid(), name}]
//     }));
//   }
// }}
// >
// AddItem
// </Button>