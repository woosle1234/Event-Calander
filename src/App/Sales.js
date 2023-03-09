import React from "react";
import axios from "axios";
import listitem from "../Asset/List/ListItem.png"
import header from "../Asset/salesheader.png"
import item1 from "../Asset/item1.png"
import enditem from "../Asset/enditem.png"
import listitemMTG from "../Asset/List/ListItemMTG.png"
import listitemop from "../Asset/List/ListItemop.png"
import listitemdgm from "../Asset/List/ListItemdgm.png"
import listitempkmn from "../Asset/List/ListItempkmn.png"
import listitemweiss from "../Asset/List/ListItemweiss.png"
import listitemygo from "../Asset/List/ListItemygo.png"
import listitemvg from "../Asset/List/ListItemvg.png"


class Sales extends React.Component {
    constructor(props) {
        super(props);
        window.salesComponent = this;
        this.state = {
            images: {
                MTG: listitemMTG,
                Yugioh: listitemygo,
                "Weiss Schwarz": listitemweiss,
                Pokemon: listitempkmn,
                Digimon: listitemdgm,
                "One Piece": listitemop,
                Vanguard: listitemvg,
                "Magic: The Gathering": listitemMTG,
                blanklogo: listitem
              },
            productInfo: [{
                image: "",
                title: "",
                vendor: "",
                price: "",
                comparePrice: "",
                game: ""
            }, {
                image: "",
                title: "",
                vendor: "",
                price: "",
                comparePrice: "",
                game: ""
            }, {
                image: "",
                title: "",
                vendor: "",
                price: "",
                comparePrice: "",
                game: ""
            }, {
                image: "",
                title: "",
                vendor: "",
                price: "",
                comparePrice: "",
                game: ""
            }, {
                image: "",
                title: "",
                vendor: "",
                price: "",
                comparePrice: "",
                game: ""
            }, {
                image: "",
                title: "",
                vendor: "",
                price: "",
                comparePrice: "",
                game: ""
            }, {
                image: "",
                title: "",
                vendor: "",
                price: "",
                comparePrice: "",
                game: ""
            }, {
                image: "",
                title: "",
                vendor: "",
                price: "",
                comparePrice: "",
                game: ""
            }, {
                image: "",
                title: "",
                vendor: "",
                price: "",
                comparePrice: "",
                game: ""
            }, {
                image: "",
                title: "",
                vendor: "",
                price: "",
                comparePrice: "",
                game: ""
            }],
            loading: true
        }
    }

    async componentDidMount() {

        await axios
            .get(
                "https://store.401games.ca/collections/vaughan-display/products.json?limit=10"
            )
            .then(res => {
                let data = res.data.products;
                let products = this.state.productInfo;
                for (let i = 0; i < data.length; i++) {
                    products[i].image = data[i].images[0].src
                    products[i].title = data[i].title
                    products[i].vendor = data[i].vendor
                    products[i].price = data[i].variants[0].price
                    products[i].comparePrice = data[i].variants[0].compare_at_price
                    products[i].game = data[i].product_type
                }
                this.setState({ productInfo: products });
                this.setState({ loading: false })
            })
            .catch(err => {
                console.log(err)
            })
    }

    getRow(row, key, clas) {
        
        let src = this.state.images[row.game]!==undefined?this.state.images[row.game]:this.state.images["blanklogo"];

        return (
            <tr  key={key} style={{ padding: "10px", margin: 0, width: "100vw" }}>
                <td className="align-middle" colSpan="100%" style={{ width: "inherit" }}>
                    <div className={clas} style={{ position: "relative", width: "100%", animationDelay:`${(key)*(5-(key*0.1))}s` }}>
                        <div style={{ width: "100%", margin: "auto", zIndex: 0 }}>
                            <img className="listitembg"style={{ width: "inherit", height: "auto" }} src={src} alt="..." />
                        </div>
                        <div style={{ position: "absolute", zIndex: 1, width: "100%", top: 0}}>
                            <div className="row ">
                                <div className="col-auto" >
                                    <div className="container" style={{ padding: "10px", height: "385px", width:"auto"}}>
                                        <img src={row.image} alt="..." style={{maxHeight:"295px", height:"100%", width:"auto", marginLeft:"40px", marginRight:"40px"}} />
                                    </div>
                                </div>
                                <div className="col">
                                    <div style={{height:"385px", maxHeight:"385px"}}>
                                        <b style={{ maxHeight:"385px", padding:"0 calc(50% - 160px)"}}>
                                            <h1 className="listItemTitle" style={{color:"white", fontSize:"45px"}} data-text={row.title}><b>{row.title}</b></h1>
                                            <h3 className="listItemVendor" style={{fontSize:"30px", backgroundColor:"rgba(255,255,255,0.6)",color:"darkgreen"}}><b>{row.vendor}</b></h3>
                                        </b>
                                    </div>
                                </div>
                                <div className="col-auto" >
                                    <div style={{height:"385px", maxHeight:"385px"}}>
                                    {row.comparePrice !== null && row.comparePrice !== "" ? (
                                        <strong style={{ maxHeight:"385px", padding:"0 calc(50% - 160px)"}}>
                                            <h1 style={{fontSize:"100px", color: "yellow", fontFamily: 'Karla' }}><b>${row.price}</b></h1>
                                            <h3 style={{fontSize:"50px", color: "red", fontFamily: 'Karla' }}><del><em>${row.comparePrice}</em></del></h3>
                                        </strong>
                                    ) : (
                                        <strong style={{ maxHeight:"385px", padding:"0 calc(50% - 160px)"}}>
                                            <h1 style={{ color: "yellow" , maxHeight:"385px"}}><b>${row.price}</b></h1>
                                        </strong>
                                    )
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>

            </tr>)
    }
    /*
    <div className="container">
                        <div className="row ">
                            <div className="col container-fluid " style={{ width: "315px", height: "315px" }}>
                                <img src={row.image} alt="..." className="saleImg" />
                            </div>
                            <div className="col">
                                <h1 style={{ color: "white" }}><b>{row.title}</b></h1>
                                <h3>{row.vendor}</h3>
                            </div>
                            <div className="col">
                                {row.comparePrice !== null && row.comparePrice !== "" ? (
                                    <strong>
                                        <h3 style={{ color: "red" }}><del><em>${row.comparePrice}</em></del></h3>
                                        <h1 style={{ color: "yellow" }}><b>${row.price}</b></h1>
                                    </strong>
                                ) : (
                                    <strong>
                                        <h1 style={{ color: "yellow" }}><b>${row.price}</b></h1>
                                    </strong>
                                )
                                }
                            </div>
                        </div>
                    </div>
    */
    playScroll() {
        let el = document.getElementById("productsTable");

    }


    resetScroll() {
        let el = document.getElementById("productsTable");


    }

    render() {
        return this.state.loading ? (
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        ) : (<div style={{ overflowY: "auto", minWidth: "100vw", minHeight: "100vh", backgroundColor: "rgba(71,138,64,255)" }}>
            <div className="d-flex align-items-center justify-content-center" style={{ width: "100vw", height: "150px", position: "absolute", zIndex: 10}}>

                <img style={{ height: "auto", width: "100%"}} src={header} alt="..." />

            </div>

            <table id="productsTable" className="table table-striped animate" style={{ position: "relative", animation: "example 130s", backgroundColor: "rgba(71,138,64,255)", width: "100%" }}>
                <tbody>
                    <tr colSpan="100%" key="-1" style={{ height: "300px", padding:0 }}>
                        <td style={{ padding:0, margin:0 }}>
                            <div style={{ width: "100%", height:"100%", padding:0, margin:0}}>
                                <img style={{ width: "100%", height: "auto" }} src={item1} alt="..." />
                            </div>
                        </td>
                    </tr>
                    {this.getRow(this.state.productInfo[0], 0, "listItem1")}
                    {this.getRow(this.state.productInfo[1], 1, "listItem2")}
                    {this.getRow(this.state.productInfo[2], 2, "listItem1")}
                    {this.getRow(this.state.productInfo[3], 3, "listItem2")}
                    {this.getRow(this.state.productInfo[4], 4, "listItem1")}
                    {this.getRow(this.state.productInfo[5], 5, "listItem2")}
                    {this.getRow(this.state.productInfo[6], 6, "listItem1")}
                    {this.getRow(this.state.productInfo[7], 7, "listItem2")}
                    {this.getRow(this.state.productInfo[8], 8, "listItem1")}
                    {this.getRow(this.state.productInfo[9], 9, "listItem2")}
                    <tr colspan="100%" key="10" style={{ height: "900px", padding:0 }}>
                        <td style={{ padding:0, margin:0 }}>
                            <div style={{ width: "100%", height:"100%", padding:0, margin:0}}>
                                <img style={{ width: "100%", height: "auto" }} src={enditem} alt="..." />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

        </div>)

    }
}

export default Sales;