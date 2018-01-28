import React from 'react';
import {ImageRes} from '../../res-link';

class view extends React.Component {

  render() {
    return (
      <div id="indicator" style={{display:"none"}}>
        <img src={ImageRes.loding_indicator} alt="" />
      </div>
    );
  }
}

export default view;
