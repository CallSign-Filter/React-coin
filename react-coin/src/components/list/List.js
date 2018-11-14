import React from 'react';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import Table from './Table';

class List extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            currencies: [],
            error: null,
            totalPages: 0,
            page: 1,
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        const { page} = this.state;

        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
            .then(handleResponse)
            .then((data) => {
                this.setState({
                    currencies: data.currencies,
                    loading: false,
                });
            })
            .catch((error) => {
                this.setState({
                    error: error.errorMessage,
                    loading: false,
                });
            });
    }

    renderChangePercent(percent) {
        if (percent > 0) {
            return <span className="percent-raised">{percent}% &uarr;</span>
        } else if(percent < 0) {
            return <span className="percent-fallen">{percent}% &darr;</span>
        } else {
            return <span className="percent-unchanged">{percent}%</span>
        }
    }

    render() {
        const{ loading, error, currencies } = this.state;

        console.log(this.state);
        //renders the loading only if loading: true
        if (loading) {
            return <div className="loading-container"><Loading /></div>
        }
        //renders only the error if there is an error
        if (error) {
            return <div className="error">{error}</div>
        }
        return (
            <Table
                currencies={currencies}
                renderChangePercent={this.renderChangePercent}
            />
        );
    }
}

export default List;
