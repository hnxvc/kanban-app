import React from 'react';
import CardForm from '../CardForm/CardForm';
import { Map } from 'immutable';
import PropTypes from 'prop-types';

class NewCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      status: 'todo',
      color: '#ffffff'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleChange(field, value) {
    this.setState({
      [field]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.cardCallbacks.addCard(this.state);
    this.props.history.pushState(null, '/');
  }

  handleCloseModal() {
    this.props.history.pushState(null, '/');
  }

  render() {
    return(
      <CardForm
        draftCard={this.state}
        buttonLabel="Create Card"
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleCloseModal={this.handleCloseModal}
      />
    );
  }
}

NewCard.PropTypes = {
  cardCallbacks: PropTypes.object
}

export default NewCard;
