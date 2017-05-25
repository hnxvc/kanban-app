import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';
import CheckList from './CheckList/CheckList';
import classNames from 'classnames';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetails: true
    }
  }
  render() {
    let titleClass = classNames(
      'Card__title',
      {'Card__title--is-open': this.state.isShowDetails}
    );
    return(
      <div className="Card">
        <h4 className={titleClass}
          onClick={()=> this.setState({isShowDetails: !this.state.isShowDetails})}
          >{this.props.title}</h4>
        <CSSTransitionGroup
          transitionName="fadeTransition"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          {
            this.state.isShowDetails &&
            <div className="Card__details">
              <p className="Card__descrition">{this.props.description}</p>
              <CheckList id={this.props.id} tasks={this.props.tasks}/>
            </div>
          }
        </CSSTransitionGroup>
      </div>
    );
  }
}

Card.defaultProps = {
  children: 0
};

Card.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  task: PropTypes.arrayOf(PropTypes.object)
};

export default Card;
