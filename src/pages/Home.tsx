import React from "react";
import FieldCard from '../components/FieldCard/FieldCard';

import "antd/dist/antd.css";
import "./HomeStyle.scss";

class Home extends React.Component {
  render() {
    return (
      <div className="container">
          <h1 className="title">Webamboos Challange</h1>
          <div className="content">
            <FieldCard/>
          </div>
      </div>
    );
  }
}

export default Home;
