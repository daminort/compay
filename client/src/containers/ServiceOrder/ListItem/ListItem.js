import React from 'react';
import PropTypes from 'prop-types';
import ServiceIcon from '../../../components/ServiceIcon';
import { Wrapper, Name } from './ListItem.style';

const ListItem = ({ id, icon, name }) => {

  return (
    <Wrapper>
      <ServiceIcon name={icon} size="medium" className="icon" />
      <Name>{name}</Name>
    </Wrapper>
  );
};

ListItem.propTypes = {
  id   : PropTypes.string.isRequired,
  icon : PropTypes.string.isRequired,
  name : PropTypes.string.isRequired,
};

export default ListItem;
