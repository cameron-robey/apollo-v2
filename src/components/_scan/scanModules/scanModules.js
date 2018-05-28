//React imports
import React, { Component } from 'react';

//Styles
import * as styles from './scanModulesStyles.js'

import {Button} from './../../../globalStyles.js'

//Redux
import { connect } from 'react-redux'
import { actions } from './../../../store/actions.js'
import store from './../../../store'

const mapStateToProps = (state) => ({
    scannedBook: state.data.scannedBook,
    scanState: state.ui.scanState,
    scanStatesToShow: state.ui.scanStatesToShow
})

class ScanModules extends Component {
    constructor() {
        super()
        this.returnBook = this.returnBook.bind(this);
    }

    calculateScanModules() {
        let secondModule = null;
        let thirdModule = null;
        let fourthModule = null;
        let fifthModule = null;

        {this.props.scanStatesToShow.map((stateToShow, index) => {

                switch (stateToShow) {
                    case 0: //Initial state, just the search bar at the top of the page
                        break;
                    case 1: //Scanned barcode, display book info. Show the next options for either withdraw or return / renew
                        let buttonsToRender = null;

                        if (this.props.scannedBook.loanID) {
                            //Book IS on loan
                            buttonsToRender = <styles.OptionButtons>
                                <styles.OptionButton>
                                    <Button onClick={() => this.returnBook()} colour="accent5">Return</Button>
                                </styles.OptionButton>
                                <styles.OptionButton>
                                    <Button colour="accent4">Renew</Button>
                                </styles.OptionButton>
                            </styles.OptionButtons>
                        } else {
                            //Book IS NOT on loan
                            buttonsToRender = <styles.OptionButtons>
                                <styles.OptionButton>
                                    <Button colour="accent2">Select Student</Button>
                                </styles.OptionButton>
                                <styles.OptionButton>
                                    <Button colour="accent3">Date</Button>
                                </styles.OptionButton>
                            </styles.OptionButtons>
                        }

                        secondModule = <styles.SecondModule key={this.props.scanState}>
                            <styles.BookDetails>
                                <styles.BookTitle>{this.props.scannedBook.title}</styles.BookTitle>
                                <styles.BookAuthor>{this.props.scannedBook.author}</styles.BookAuthor>
                            </styles.BookDetails>
                            {buttonsToRender}
                        </styles.SecondModule>

                        break;
                    case 2: //WITHDRAW. Show options for selecting a student and the due date
                        thirdModule = <p>Im state 1</p>
                        break;
                    case 3: //RENEW. Show option for selecting how many weeks to renew book for
                        fourthModule = <p>Im state 1</p>
                        break;
                    case 4: //Thank you message before automatically moving on back to initial state
                        fifthModule = <p key={this.props.scanState}>Thank you!</p>
                        break;
                    default: //Default case for switch statement
                        combinedModules.push(<p>Please refresh the page</p>)
                }

            }
        )}

        let combinedModules = []

        combinedModules.push(secondModule);
        combinedModules.push(thirdModule);
        combinedModules.push(fourthModule);
        combinedModules.push(fifthModule);

        return combinedModules;
    }

    returnBook() {
        store.dispatch(actions.returnBook());
        store.dispatch(actions.setScanState(4));
    }

    render() {


        return (
            <div>
                {this.calculateScanModules().map((module, index) =>
                    (
                        <div key={index}>{module}</div>
                    )
                )}
            </div>
        );
    }
}

export default connect(mapStateToProps)(ScanModules);
