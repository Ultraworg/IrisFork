import React, { memo } from 'react';
import { SmartList } from './SmartList';
import { GridItem } from './GridItem';

const Grid = memo(({
  items,
  className = '',
  mini,
  getLink,
  sourceIcon,
}) => {
  if (!items || !items.length) return null;

  return (
    <SmartList
      className={`grid grid--${items[0].type}s ${className} ${mini ? 'grid--mini' : ''}`}
      items={items}
      itemComponent={GridItem}
      itemProps={{
        getLink,
        sourceIcon,
      }}
    />
  );
});

export default {
  Grid,
};

export {
  Grid,
};
