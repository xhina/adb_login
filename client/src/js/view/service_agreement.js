import React from 'react';
import {Container} from 'reactstrap';
import BaseView from './base_view';

let content;

class View extends BaseView {

  constructor(props) {
    super(props);
  }

  loadTextRes() {
    if (content != null) return;

    fetch(process.env.PUBLIC_URL + "/res/service_agreement_text")
    .then((r) => r.blob())
    .then((r) => {
      let reader = new FileReader();
      reader.onload = (ev) => {
        content = ev.target.result;
        super.renderTick(this.view());
      };
      reader.readAsText(r);
    })
    .catch((e)=>console.log(e));
  }

  componentDidMount() {
    super.pageRender(this.view());
    this.loadTextRes();
  }

  view() {
    return (
      <div className="page">
        {super.attachHeader('이용약관')}
        <div className="pre-scrollable">
          <Container>
            <pre style={style}>
              {content}
            </pre>
          </Container>
        </div>
      </div>
    );
  }

}

const style = {
  'whiteSpace':'pre-wrap',
};

export default View;
