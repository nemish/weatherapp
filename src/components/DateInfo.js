import React from 'react';
import { DAYS, MONTHS } from '../utils/constants';

const DateInfo = () => {
  const dt = new Date();
  return <div className='date-container margin-top-lg'>
    {`${DAYS[dt.getDay()]}, ${MONTHS[dt.getMonth()]} ${dt.getDate()}th ${dt.getFullYear()}`}
  </div>;
}

export default DateInfo;
