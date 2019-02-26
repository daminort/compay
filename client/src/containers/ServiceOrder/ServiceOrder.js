import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject, PropTypes as PropTypesMobX } from 'mobx-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { find, cloneDeep, isEqual, compact } from 'lodash';

import { isEmptyArray } from '../../helpers/commonUtils';

import Toolbar from '../Toolbars/ServiceOrder';
import ListItem from './ListItem';
import { Wrapper } from './ServiceOrder.style';

class ServiceOrder extends Component {

  static propTypes = {
    Settings     : PropTypesMobX.observableObject.isRequired,
    ServicesList : PropTypesMobX.observableObject.isRequired,
    serviceOrder : PropTypes.array,
  }

  static defaultProps = {
    serviceOrder: [],
  }

  constructor(props) {
    super(props);
    this.createList  = this.createList.bind(this);
    this.reorderList = this.reorderList.bind(this);
    this.onDragEnd   = this.onDragEnd.bind(this);

    this.state = {
      list: this.createList(props),
    };
  }

  async componentDidMount() {
    const { ServicesList, Settings } = this.props;

    const { list } = ServicesList;
    const { serviceOrder } = Settings;

    if (isEmptyArray(list)) {
      await ServicesList.reloadList();
    }
    if (isEmptyArray(serviceOrder)) {
      await Settings.loadServiceOrder();
    }

    this.setState({
      list: this.createList(this.props),
    });
  }

  componentWillReceiveProps(nextProps) {
    const { serviceOrder } = this.props;
    if (isEqual(serviceOrder, nextProps.serviceOrder)) {
      return;
    }

    this.setState({
      list: this.createList(nextProps),
    });
  }

  // Service ------------------------------------------------------------------
  createList(props) {
    const { ServicesList, serviceOrder } = props;
    const { list } = ServicesList;
    if (isEmptyArray(serviceOrder)) {
      return list.map(item => {
        return {
          id   : item.id,
          icon : item.icon,
          name : item.name,
        };
      });
    }

    const result = serviceOrder.map(id => {
      const service = find(list, { id });
      if (!service) {
        return null;
      }

      return {
        id,
        icon: service.icon,
        name: service.name,
      };
    });

    return compact(result);
  }

  reorderList(startIndex, endIndex) {
    const { Settings } = this.props;
    const { list } = this.state;

    const result = cloneDeep(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    const serviceOrder = result.map(item => item.id);

    this.setState({ list: result });
    Settings.setServiceOrder(serviceOrder);
  }

  // Events -------------------------------------------------------------------
  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;
    this.reorderList(source.index, destination.index);
  }

  // Renders ------------------------------------------------------------------
  render() {
    const { list } = this.state;

    return (
      <Wrapper>
        <Toolbar />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided /*, snapshot*/) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {list.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided /*, snapshot*/) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ListItem
                          key={item.id}
                          id={item.id}
                          icon={item.icon}
                          name={item.name}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Wrapper>
    );
  }
}

export default inject(store => ({
  Settings     : store.Settings,
  ServicesList : store.ServicesList,
  serviceOrder : store.Settings.serviceOrder,
}))(observer(ServiceOrder));
