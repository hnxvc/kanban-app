import React from 'react';
import CardForm from '../CardForm/CardForm';
import { Map } from 'immutable';
import PropTypes from 'prop-types';

class EditCard extends React.Component {
  constructor(props) {
    super(props);

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
    this.props.cardCallbacks.updateCard(this.state);
    this.props.history.pushState(null, '/');
  }

  handleCloseModal() {
    this.props.history.pushState(null, '/');
  }

  componentWillMount() {
    let card = this.props.cards.find(card => card.id == this.props.params.card_id);
    this.setState({...card});
  }

  render() {
    return(
      <CardForm
        draftCard={this.state}
        buttonLabel="Update Card"
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleCloseModal={this.handleCloseModal}
      />
    );
  }
}

EditCard.PropTypes = {
  cardCallbacks: PropTypes.object
}

export default EditCard;
