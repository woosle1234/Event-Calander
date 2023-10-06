import React from "react";
import Calander from "./Calander.js";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import slide1 from "../Asset/slides/slide 1.png";
import slide2 from "../Asset/slides/slide 2.png";
import slide3 from "../Asset/slides/slide 3.png";
import slide4 from "../Asset/slides/slide 4.png";
import slide5 from "../Asset/slides/slide 5.png";
import slide6 from "../Asset/slides/slide 6.png";
import EventSlide from "./EventSlide.js";
import Sales from "./Sales.js";
import Slides from "./Slides.js";
import axios from "axios";

let timer = null

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      yugiohText: "Test",
      magicText: "Test",
      pokemonText: "Test",
      digimonText: "Test",
      weissText: "Test",
      onepieceText: "Test",
      currentSlide: 0,
      salesComponent: <div style={{ width: "100vw", height: "100vh" }}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>,
      calanderComponent: <div style={{ width: "100vw", height: "100vh" }}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>,
      addOnSlide: [],
      loading: true,
      timer: null
    };
  }

  async componentDidMount() {
    this.loopSlide(0);
    await axios.get("https://vaughan-display-server.vercel.app/ids")
      .then(res => {
        this.setState({ addOnSlide: res.data });
        setTimeout(() => {
          this.setState({ loading: false })
          this.setState({ calanderComponent: <div
            style={{
              width: "100%",
              height: "100vh",
              padding: 0
            }}
          >
            <strong>
              <div className="row bg-dark" style={{ color: "yellow", position: "absolute", zIndex:10, width:"101%" }}>
                <div className="col">
                  <h2>Sunday</h2>
                </div>
                <div className="col">
                  <h2>Monday</h2>
                </div>
                <div className="col">
                  <h2>Tuesday</h2>
                </div>
                <div className="col">
                  <h2>Wednesday</h2>
                </div>
                <div className="col">
                  <h2>Thursday</h2>
                </div>
                <div className="col">
                  <h2>Friday</h2>
                </div>
                <div className="col">
                  <h2>Saturday</h2>
                </div>
              </div>
            </strong>
            <Calander />;
          </div> })
        }, 1);
      })
      .catch(err => {
        console.log(err)
      })
  }

  loopSlide(idx) {

    let curr = idx;

    if(timer !== null)
      clearTimeout(timer);

    if (curr === 0) {
      timer=setTimeout(() => {
        this.setState({ currentSlide: 1 });
      }, 30000)
      /*setTimeout(() => {
        if (this.state.currentSlide === curr)
          this.setState({ currentSlide: curr + 1 });
      }, 25000);*/
    } else if (curr === 7) {
      timer=setTimeout(() => {
          if (this.state.addOnSlide.length <= 0) {
            this.setState({ currentSlide: 0 });
          }else{
            this.setState({ currentSlide: this.state.currentSlide + 1 });
          }
      }, 52000)
      /*
        setTimeout(() => {
          if (this.state.currentSlide === curr) {
            if (this.state.addOnSlide.length <= 0) {
              this.setState({ currentSlide: 0 });
            }else{
              this.setState({ currentSlide: curr + 1 });
            }
          }
        }, 52000);
        */
    } else {
      timer=setTimeout(() => {
        
          let nextSlide = this.state.currentSlide + 1;
          if (nextSlide > 7 + this.state.addOnSlide.length) 
            nextSlide = 0;
          this.setState({ currentSlide: nextSlide });
          this.setState({ calanderComponent: <div
            style={{
              width: "100vw",
              height: "100vh",
              padding: 0
            }}
          >
            <strong>
              <div className="row  bg-dark" style={{ color: "yellow", position: "absolute", zIndex:10, width:"100vw" }}>
                <div className="col">
                  <h2>Sunday</h2>
                </div>
                <div className="col">
                  <h2>Monday</h2>
                </div>
                <div className="col">
                  <h2>Tuesday</h2>
                </div>
                <div className="col">
                  <h2>Wednesday</h2>
                </div>
                <div className="col">
                  <h2>Thursday</h2>
                </div>
                <div className="col">
                  <h2>Friday</h2>
                </div>
                <div className="col">
                  <h2>Saturday</h2>
                </div>
              </div>
            </strong>
            <Calander />;
          </div> })
        
      }, 15000)
      /*
      setTimeout(() => {
        if (this.state.currentSlide === curr) {
          let nextSlide = curr + 1;
          if (nextSlide > 7 + this.state.addOnSlide.length) 
            nextSlide = 0;
          this.setState({ currentSlide: nextSlide });
        }
      }, 10000);
      */
    }
    
  }

  calanaderChange(idx) {
    this.setState({ currentSlide: idx });
    
    switch (idx) {
      case 0:
        this.setState({
          calanderComponent: <div style={{ width: "100vw", height: "100vh" }}>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        })
        setTimeout(() => {
          this.setState({ calanderComponent: <div
            style={{
              width: "100vw",
              height: "100vh",
              padding: 0
            }}
          >
            <strong>
              <div className="row  bg-dark" style={{ color: "yellow", position: "absolute", zIndex:10, width:"100vw" }}>
                <div className="col">
                  <h2>Sunday</h2>
                </div>
                <div className="col">
                  <h2>Monday</h2>
                </div>
                <div className="col">
                  <h2>Tuesday</h2>
                </div>
                <div className="col">
                  <h2>Wednesday</h2>
                </div>
                <div className="col">
                  <h2>Thursday</h2>
                </div>
                <div className="col">
                  <h2>Friday</h2>
                </div>
                <div className="col">
                  <h2>Saturday</h2>
                </div>
              </div>
            </strong>
            <Calander />;
          </div> })
        }, 1)
        this.loopSlide(idx);
        break;
      case 1:
        this.setState({
          yugiohText: window.calanderComponent.getYugiohEvents()
        });
        this.loopSlide(idx);
        
        break;
      case 2:
        this.setState({
          magicText: window.calanderComponent.getMagicEvents()
        });
        this.loopSlide(idx);
        break;
      case 3:
        this.setState({
          pokemonText: window.calanderComponent.getPokemonEvents()
        });
        this.loopSlide(idx);
        break;
      case 4:
        this.setState({
          digimonText: window.calanderComponent.getDigimonEvents()
        });
        this.loopSlide(idx);
        break;
      case 5:
        this.setState({
          weissText: window.calanderComponent.getWeissEvents()
        });
        this.loopSlide(idx);
        break;
      case 6:
        this.setState({
          onepieceText: window.calanderComponent.getOnePieceEvents()
        });
        this.loopSlide(idx);

        break;
      case 7:
        
        this.loopSlide(idx);
        this.setState({
          salesComponent: <div style={{ width: "100vw", height: "100vh" }}>
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        })
        setTimeout(() => {
          this.setState({ salesComponent: <Sales /> })
        }, 1)
        
        break;
      default:
        this.loopSlide(idx);
        
        break;
    }

  }

  render() {
    return this.state.loading ? (<div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>) :
      (<Carousel
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        showArrows={false}
        interval={30000}
        autoPlay={false}
        infiniteLoop={true}
        autoFocus={true}
        useKeyboardArrows={true}
        selectedItem={this.state.currentSlide}
        onChange={(idx, arg) => this.calanaderChange(idx)}
      >
        {this.state.calanderComponent}
        <EventSlide divstyle={{
          width: "44vw",
          height: "46vh",
          right: "8vw",
          bottom: "13vh",
          padding: 0,
          margin: 0
        }}
          text1={this.state.yugiohText[0]}
          text2={this.state.yugiohText[1]}
          text3={this.state.yugiohText[2]}
          image={slide1}
        />

        <EventSlide divstyle={{
          width: "44vw",
          height: "46vh",
          left: "6vw",
          bottom: "10vh",
          padding: 0,
          margin: 0
        }}
          text1={this.state.magicText[0]}
          text2={this.state.magicText[1]}
          text3={this.state.magicText[2]}
          image={slide2}
        />

        <EventSlide divstyle={{
          width: "44vw",
          height: "46vh",
          right: "6vw",
          bottom: "10vh",
          padding: 0,
          margin: 0
        }}
          text1={this.state.pokemonText[0]}
          text2={this.state.pokemonText[1]}
          text3={this.state.pokemonText[2]}
          image={slide3}
        />

        <EventSlide divstyle={{
          width: "44vw",
          height: "46vh",
          left: "6vw",
          bottom: "10vh",
          padding: 0,
          margin: 0

        }}
          text1={this.state.digimonText[0]}
          text2={this.state.digimonText[1]}
          text3={this.state.digimonText[2]}
          image={slide4}
        />

        <EventSlide divstyle={{
          width: "44vw",
          height: "46vh",
          right: "6vw",
          bottom: "10vh",
          padding: 0,
          margin: 0
        }}
          text1={this.state.weissText[0]}
          text2={this.state.weissText[1]}
          text3={this.state.weissText[2]}
          image={slide5}
        />

        <EventSlide divstyle={{
          width: "44vw",
          height: "46vh",
          left: "6vw",
          bottom: "10vh",
          padding: 0,
          margin: 0
        }}
          text1={this.state.onepieceText[0]}
          text2={this.state.onepieceText[1]}
          text3={this.state.onepieceText[2]}
          image={slide6}
        />

        <div
          style={{
            width: "100vw",
            height: "100vh",
            padding: 0,
            margin: 0
            
          }}
        >
          {this.state.salesComponent}
        </div>
        {
          this.state.addOnSlide.map((v, i) => {
            return <Slides image={"https://vaughan-display-server.vercel.app/image/" + v._id} />
          })
        }


      </Carousel>);
  }
}

export default Main;
