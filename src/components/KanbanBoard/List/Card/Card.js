import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';
import CheckList from './CheckList/CheckList';
import classNames from 'classnames';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import marked from 'marked';
import { DragSource, DropTarget } from 'react-dnd';
import {Link} from 'react-router';
import constants from '../../../../constants';

const cardDragSpec = {
  beginDrag(props) {
    return {
      cardId: props.cardId,
      status: props.status
    };
  },

  endDrag(props) {
    props.cardCallbacks.persistCardDrag(props.cardId, props.status);
  }
}

const cardDropSpec = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().cardId;
    props.cardCallbacks.updateCardPosition(draggedId, props.cardId);
  }
}

let collectDrag = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource()
  }
}

let collectDrop = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetails: true
    }
  }
  render() {

    const { connectDragSource, connectDropTarget } = this.props;

    let titleClass = classNames(
      'Card__title',
      {'Card__title--is-open': this.state.isShowDetails}
    );

    let sideColor = {
      position: 'absolute',
      zIndex: -1,
      top: 0,
      bottom: 0,
      left: 0,
      width: 7,
      backgroundColor: this.props.color
    };

    return connectDropTarget(connectDragSource(
      <div className="Card">
        <div style={sideColor}/>
        <div className="Card__edit"><Link to={'/edit/'+this.props.cardId}>&#9998;</Link></div>
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
              <p className="Card__descrition" dangerouslySetInnerHTML={{__html: marked(this.props.description)}} />
              <CheckList
                cardId={this.props.cardId}
                tasks={this.props.tasks}
                taskCallbacks={this.props.taskCallbacks}
              />
            </div>
          }
        </CSSTransitionGroup>
      </div>
    ));
  }
}

Card.defaultProps = {
  children: 0
};

Card.propTypes = {
  cardId: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  task: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.objectOf(PropTypes.func),
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired
};


const dragHighOrderCard = DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);
const dragDropHighOrderCard = DropTarget(constants.CARD, cardDropSpec, collectDrop)(dragHighOrderCard);
export default dragDropHighOrderCard;
