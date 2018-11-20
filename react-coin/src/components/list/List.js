import React from 'react';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import Table from './Table';
import Pagination from './Pagination';

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

        this.handlePaginationClick = this.handlePaginationClick.bind(this);
    }

    componentDidMount() {
        this.fetchCurrencies();
    }

    fetchCurrencies() {
        this.setState({ loading: true });

        const { page} = this.state;

        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
        .then(handleResponse)
        .then((data) => {
            const {currencies, totalPages, page} = data;

            this.setState({
                currencies,
                loading: false,
                totalPages,
                page,
            });

            //This is equal to the above
            // this.setState({
            //     currencies: data.currencies,
            //     loading: false,
            //     totalPages: data.totalPages,
            //     page: data.page,
            // });

        })
        .catch((error) => {
            this.setState({
                error: error.errorMessage,
                loading: false,
            });
        });
    }

    handlePaginationClick(direction) {
        let nextPage = this.state.page;
        if (direction ===  'next') {
            nextPage ++;
        } else {
            nextPage --;
        }
        this.setState({page: nextPage}, () => {

            this.fetchCurrencies();
        });
        
    }

    render() {
        const{ loading, error, currencies, page, totalPages } = this.state;

        //renders the loading only if loading: true
        if (loading) {
            return <div className="loading-container"><Loading /></div>
        }
        //renders only the error if there is an error
        if (error) {
            return <div className="error">{error}</div>
        }
        return (
            <div>
                <Table
                    currencies={currencies}                    
                />
                <Pagination 
                    totalPages={totalPages}
                    page={page}
                    handlePaginationClick={this.handlePaginationClick}
                />
            </div>
        );
    }
}

export default List;
