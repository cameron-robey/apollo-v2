//React imports
import React, { Component } from 'react';

//Styles
import * as styles from './tagItemStyles.js'

import * as API from './../../../api';

//Redux
import { connect } from 'react-redux'
import { actions } from './../../../store/actions.js'
import store from './../../../store'

const mapStateToProps = (state) => ({
    searchQuery: state.data.searchQuery,
    filteredTags: state.data.filteredTags
})

class TagItem extends Component {
    constructor() {
        super()
        this.toggleTagState = this.toggleTagState.bind(this);
    }

    async toggleTagState(tagName, tagID) {
        await store.dispatch(actions.updateFilterTags(tagID));
        await store.dispatch(actions.updateFilterTagsState(tagID));

        let searchResponse = await API.Books.searchBooks(this.props.searchQuery);
        
        if (searchResponse.message === "Success") {
            //Update redux state with new books
            store.dispatch(actions.pushCatalogueBooks(searchResponse.data));
        } else {
            store.dispatch(actions.pushCatalogueBooks([]));
        }

    };

    render() {
        return (
            <styles.FilterItem onClick={() => this.toggleTagState(this.props.tagName, this.props.tagID)} active={this.props.active}>
                <styles.Checkmark active={this.props.active}/>
                {this.props.tagName}
            </styles.FilterItem>
        );
    }
}

export default connect(mapStateToProps)(TagItem);
