//React imports
import React, { Component } from 'react';

import * as API from './../../../api';

//Styles
import * as styles from './userHistoryStyles.js'

import {ReportTable} from './../../';
import Loan from '../loan/loan';

class UserHistory extends Component {
    constructor() {
        super()

        this.state = {
            body: null,
            header: null
        };
    }

    componentDidMount = async () => {
        let data = await API.Users.getUserHistory(this.props.user);
        
        let tableData = data.data.map((item) => {
            return [
                {style: "normal", url: null, display: item.loan.returnDate ? "Return" : "Withdraw"},
                {style: "bold", url: "/book/" + item.book._id, display: item.book.title},
                {style: "normal", url: null, display: item.book.author},
                {style: "normal", url: null, display: this.formatDueDate(item.loan.dueDate)},
            ]
        });
        let header = ['Action','Book','Author','Due Date']
        this.setState({body: tableData, header: header});
    }

    formatDueDate = (date) => {
        let dueDate = new Date(date);
        return dueDate.getDate() + "/" + (dueDate.getMonth() + 1) + "/" + dueDate.getFullYear();
    }

    render = () => {
        return (
            <ReportTable body={this.state.body} header={this.state.header} />
        )
    }
}

export default UserHistory;