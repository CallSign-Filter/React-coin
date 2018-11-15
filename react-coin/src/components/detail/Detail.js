import React from "react";
import { API_URL } from "../../config";
import { handleResponse } from "../../helpers";
import Loading from '../common/Loading';
import "./Detail.css";

class Detail extends React.Component {
    constructor() {
        super();

        this.state = {
            id: "",
            marketCap: "",
            name: "",
            percentChange24h: "",
            price: 0,
            rank: 0,
            symbol: "",
            totalSupply: "",
            volume24h: "",
            loading: false,
            error: null
        }
    }


    componentDidMount() {
        const currencyId = this.props.match.params.id;

        this.setState({loading: true});

        console.log("currencyId", currencyId);

        fetch(`${API_URL}/cryptocurrencies/${currencyId.toLowerCase()}`)
        .then(handleResponse)
        .then(data => {
            const {
                id, 
                marketCap, 
                name, 
                percentChange24h, 
                price, 
                rank, 
                symbol, 
                totalSupply,
                volume24h
            } = data;

            this.setState({ 
                id, 
                marketCap, 
                name, 
                percentChange24h, 
                price, 
                rank, 
                symbol, 
                totalSupply,
                volume24h 
            });
            console.log("Success", data);
        })
        .catch(error => {
            this.setState({
                loading: false,
                error: error.errorMessage,
            });
            console.log("Error", error);
        });
    } 

    render() {
        const {loading, error } = this.state;

        if (loading) {
            return <div className="loading-container"><Loading /></div>
        }

        if (error) {
            return <div className="error">{error}</div>
        }
        return <div>Details</div>;
    }
}

export default Detail;
