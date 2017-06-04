import React from 'react';
import './CardForm.css';
import PropTypes from 'prop-types';

class CardForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleSubmit() {
    this.props.handleSubmit();
  }

  handleCloseModal() {
    this.props.handleCloseModal();
  }

  handleChange(field, e) {
    this.props.handleChange(field, e.target.value);
  }

  render() {
    return(
      <div>
        <div className="CardForm CardForm--big">
          <form onSubmit={this.props.handleSubmit}>
            <input type="text"
              placeholder="title"
              required={true}
              onChange={this.handleChange.bind(this, 'title')}
              value={this.props.draftCard.title}
            />
            <textarea
              cols="30"
              rows="2"
              placeholder="Description"
              required={true}
              onChange={this.handleChange.bind(this, 'description')}
              value={this.props.draftCard.description}
            >
            </textarea>
            <label htmlFor="status">Status</label>
            <select id="status"
              onChange={this.handleChange.bind(this, 'status')}
              value={this.props.draftCard.status}
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In progress</option>
              <option value="done">done</option>
            </select><br/>
            <label htmlFor="color">Color</label>
            <input type="color"
              onChange={this.handleChange.bind(this, 'color')}
              value={this.props.draftCard.color}
            />
            <div className="actions">
              <button type="submit">{this.props.buttonLabel}</button>
            </div>
          </form>
        </div>
        <div className="overlay"
          onClick={this.handleCloseModal}
        ></div>
      </div>

    );
  }
}

CardForm.PropTypes = {
  handleSubmit: PropTypes.func,
  handleCloseModal: PropTypes.func,
  handleChange: PropTypes.func,
  draftCard: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    color: PropTypes.string,
  }),
  buttonLabel: PropTypes.string
}

export default CardForm;
