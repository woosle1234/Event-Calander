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
      currentSlide: 0
    };
  }

  async componentDidMount() {
    this.loopSlide();
  }

  loopSlide() {
    let curr = this.state.currentSlide;
    if (curr === 0) {
      setTimeout(() => {
        if (this.state.currentSlide === curr)
          this.setState({ currentSlide: curr + 1 });
      }, 25000);
    } else {
      setTimeout(() => {
        if (this.state.currentSlide === curr) {
          let nextSlide = curr + 1;
          if (nextSlide > 6) nextSlide = 0;
          this.setState({ currentSlide: nextSlide });
        }
      }, 10000);
    }
  }

  calanaderChange(idx) {
    this.setState({ currentSlide: idx });
    switch (idx) {
      case 0:
        window.calanderComponent.playScroll();
        this.loopSlide();
        break;
      case 1:
        this.setState({
          yugiohText: window.calanderComponent.getYugiohEvents()
        });
        this.loopSlide();
        break;
      case 2:
        this.setState({
          magicText: window.calanderComponent.getMagicEvents()
        });
        this.loopSlide();
        break;
      case 3:
        this.setState({
          pokemonText: window.calanderComponent.getPokemonEvents()
        });
        this.loopSlide();
        break;
      case 4:
        this.setState({
          digimonText: window.calanderComponent.getDigimonEvents()
        });
        this.loopSlide();
        break;
      case 5:
        this.setState({
          weissText: window.calanderComponent.getWeissEvents()
        });
        this.loopSlide();
        break;
      case 6:
        this.setState({
          onepieceText: window.calanderComponent.getOnePieceEvents()
        });
        this.loopSlide();
        window.calanderComponent.resetScroll();
        break;
      default:
        this.loopSlide();
        window.calanderComponent.resetScroll();
        break;
    }
  }

  render() {
    return (
      <Carousel
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
        <div
          style={{
            width: "100vw",
            height: "100vh",
            padding: 0
          }}
        >
          <strong>
            <div className="row  bg-dark" style={{ color: "yellow" }}>
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
        </div>
        <EventSlide divstyle={{
          width: "44vw",
          height: "46vh",
          right: "8vw",
          bottom: "13vh"
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
          bottom: "10vh"
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
          bottom: "10vh"
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
          bottom: "10vh"
          
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
          bottom: "10vh"
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
          bottom: "10vh"
        }}
          text1={this.state.onepieceText[0]}
          text2={this.state.onepieceText[1]}
          text3={this.state.onepieceText[2]}
          image={slide6}
        />

      </Carousel>
    );
  }
}

export default Main;
