import React from "react";
import axios from "axios";


class Slides extends React.Component {
    constructor(props) {
        super(props);
        
        
    }


    render(){
        return (
            <div
          className="d-flex justify-content-center align-items-center"
          style={{
            padding: 0,
            backgroundColor: "black",
            width: "100vw",
            height:"100vh",
            maxHeight: "100vh",
            maxWidth: "100vw"
          }}
        >
          <img src={this.props.image} style={{
            maxHeight: "100vh",
            maxWidth: "100vw",
            width: "auto",
            height: "auto"
          }} alt=".." />
          
        </div>
        )
    }
}
export default Slides;