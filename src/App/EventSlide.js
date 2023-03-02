import React from "react";

class EventSlide extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div
          className="d-flex justify-content-center align-items-center"
          style={{
            padding: 0,
            margin: 0,
            backgroundColor: "black",
            height:"100vh"
          }}
        >
          <div
            style={this.props.divstyle}
            className="eventDivText d-flex justify-content-center align-items-center"
          >
            <h1 style={{ fontSize: "60px" }}>
              <strong>{this.props.text1}</strong>
              <br />
              <strong>{this.props.text2}</strong>
              <br />
              <strong style={{ color: "red" }}>
                {this.props.text3}
              </strong>
            </h1>
          </div>
          <img
            style={{
              width: "100%",
              height: "auto"
            }}
            src={this.props.image}
            alt="..."
          />
        </div>
        )
    }
}

export default EventSlide;