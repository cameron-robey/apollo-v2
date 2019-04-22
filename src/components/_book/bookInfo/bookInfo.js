//React imports
import React, { Component } from 'react';

//Styles
import * as styles from './bookInfoStyles.js'

import * as API from './../../../api';

//Componenets
import {AccentedBox} from './../../';


class BookInfo extends Component {
    constructor() {
        super()
        this.state = {
            accent: 'accent3',
            informationBox: true,
            idBox: true,
            tagsBox: true,

            informationTitleColour: 'primary',
            informationAuthorColour: 'primary',
            informationPublisherColour: 'primary',

            idISBN10Colour: 'primary',
            idISBN13Colour: 'primary',

            bookTags: [],
            allTags: [],
            addTag: -1
        };

    }

    componentDidMount = () => {
        console.log(this.props)
        /*Really what I want to do is run

            let bookTags = await API.Books.getBookInfo(this.props.data._id);
            this.setState({bookTags: bookTags.data.tags})

        however, at this points, props doesnt contain .data._id

        This does work later on once they've 'loaded'?
        */
    }

    displayInformationBox = () => {
        this.setState({
            informationTitleColour: 'primary',
            informationAuthorColour: 'primary',
            informationPublisherColour: 'primary',
            informationBox: true
        });
    }

    displayIDBox = () => {
        this.setState({
            idISBN10Colour: 'primary',
            idISBN13Colour: 'primary',
            idBox: true
        });
    }

    formatDueDate = (date) => {
        let dueDate = new Date(date);
        return dueDate.getDate() + "/" + dueDate.getMonth() + "/" + dueDate.getFullYear();
    }

    updateData = async (type, val, ref, box) => {
        let col = 'accent6';
        if (val) {
            let data = await API.Books.editBook(this.props.data._id, type, val);
            if (data.message === 'Success') {
                ref.value = '';
                col = 'accent5';
            }
        }
        if (box === 'information') {
            if (type === 'title') this.setState({informationTitleColour: col});
            if (type === 'author') this.setState({informationAuthorColour: col});
            if (type === 'publisher') this.setState({informationPublisherColour: col});
            this.setState({informationBox: false});
        } else if (box === 'id') {
            if (type === 'ISBN10') this.setState({idISBN10Colour: col});
            if (type === 'ISBN13') this.setState({idISBN13Colour: col});
            this.setState({idBox: false});
        }
    }

    getData = async (box) => {
        await this.props.updateData()
        if (box === "information") this.displayInformationBox();
        if (box === "id") this.displayIDBox();
    }

    updateSelectedTag = (e) => {
        this.setState({addTag: e.target.value})
    }

    addTag = async () => {
        if (this.state.addTag === -1) {
            return;
        }
        let bookTags = await API.Books.getBookInfo(this.props.data._id);

        let data;
        let selected = bookTags.data.tags.find(x => x.id === this.state.addTag)

        if (selected === undefined) {
            console.log("Added tag")
            data = await API.Books.addBookTag(this.props.data._id, this.state.addTag);
        }

        bookTags = await API.Books.getBookInfo(this.props.data._id);

        if ((bookTags.message === 'Success') && data) {
            this.setState({bookTags: bookTags.data.tags})
            this.setState({tagsBox: true})
        }
    }

    displayTagBox = async () => {
        let allTags = await API.Tags.getAllTags();
        this.setState({allTags: allTags})
        this.setState({tagsBox: false})
    }

    render = () => {
        return (
            <styles.BookInfoContainer>
                {
                    (this.state.informationBox) ?
                    <AccentedBox
                        title="Book Information"
                        gradFrom="accent5"
                        gradTo="accent4"
                        data={ {
                            title: this.props.data.title,
                            data1: this.props.data.author,
                            data2: this.props.data.publisher
                        } }
                        callback={() => this.setState({informationBox: false})}
                        type="bookTitleAuthorPublisher"
                    /> : [
                    <AccentedBox title="Book Information" gradFrom="accent5" gradTo="accent4" />,
                    <styles.InputWrapper>
                        <styles.SearchWrapper>
                            <styles.SearchLabel>Title:  </styles.SearchLabel>
                            <styles.SearchBar innerRef={(input) => { this.title = input }} ></styles.SearchBar>
                            <styles.SearchButton onClick={() => this.updateData('title', this.title.value, this.title, 'information')} colour={this.state.informationTitleColour}>Update</styles.SearchButton>
                        </styles.SearchWrapper>
                        <styles.SearchWrapper>
                            <styles.SearchLabel>Author:  </styles.SearchLabel>
                            <styles.SearchBar innerRef={(input) => { this.author = input }} ></styles.SearchBar>
                            <styles.SearchButton onClick={() => this.updateData('author', this.author.value, this.author, 'information')} colour={this.state.informationAuthorColour}>Update</styles.SearchButton>
                        </styles.SearchWrapper>
                        <styles.SearchWrapper>
                            <styles.SearchLabel>Publisher:  </styles.SearchLabel>
                            <styles.SearchBar innerRef={(input) => { this.publisher = input }} ></styles.SearchBar>
                            <styles.SearchButton onClick={() => this.updateData('publisher', this.publisher.value, this.publisher, 'information')} colour={this.state.informationPublisherColour}>Update</styles.SearchButton>
                        </styles.SearchWrapper>
                        <styles.SearchWrapper>
                            <styles.SearchButton onClick={() => this.getData('information')} colour={'accent3'}>Done</styles.SearchButton>
                        </styles.SearchWrapper>
                    </styles.InputWrapper>
                    ]
                }
                {
                    (this.state.idBox) ?
                    <AccentedBox
                        title="ISBN and ID"
                        gradFrom="accent1"
                        gradTo="accent2"
                        data={ {
                            data1: "ID: " + this.props.data._id,
                            data2: "ISBN10: " + this.props.data.ISBN10,
                            data3: "ISBN13: "+ this.props.data.ISBN13
                        } }
                        callback={() => this.setState({idBox: false})}
                        type="bookIDs"
                    /> : [
                        <AccentedBox title="ISBN and ID" gradFrom="accent1" gradTo="accent2" />,
                        <styles.InputWrapper>
                            <styles.SearchWrapper>
                                <styles.SearchLabel>ISBN10:  </styles.SearchLabel>
                                <styles.SearchBar innerRef={(input) => { this.isbn10 = input }} ></styles.SearchBar>
                                <styles.SearchButton onClick={() => this.updateData('ISBN10', this.isbn10.value, this.isbn10, 'id')} colour={this.state.idISBN10Colour}>Update</styles.SearchButton>
                            </styles.SearchWrapper>
                            <styles.SearchWrapper>
                                <styles.SearchLabel>ISBN13:  </styles.SearchLabel>
                                <styles.SearchBar innerRef={(input) => { this.isbn13 = input }} ></styles.SearchBar>
                                <styles.SearchButton onClick={() => this.updateData('ISBN13', this.isbn13.value, this.isbn13, 'id')} colour={this.state.idISBN13Colour}>Update</styles.SearchButton>
                            </styles.SearchWrapper>
                            <styles.SearchWrapper>
                                <styles.SearchButton onClick={() => this.getData('id')} colour={'accent3'}>Done</styles.SearchButton>
                            </styles.SearchWrapper>
                        </styles.InputWrapper>
                    ]

                }
                {(this.state.tagsBox) ?
                    (this.state.bookTags.length) ?
                    <AccentedBox
                        title="Tags"
                        gradFrom="accent3"
                        gradTo="accent4"
                        data={ {
                            tags: this.props.data.tags
                        } }
                        callback={() => this.displayTagBox()}
                        type="tags"
                    /> :
                    <AccentedBox
                        title="Tags"
                        gradFrom="accent3"
                        gradTo="accent4"
                        callback={() => this.displayTagBox()}
                        type="noTags"
                    />
                : [
                    <AccentedBox title="Tags" gradFrom="accent3" gradTo="accent4" />,
                    <styles.InputWrapper>
                        <styles.SearchWrapper>
                            <styles.SearchLabel>Tag to add:  </styles.SearchLabel>
                            <styles.Dropdown onChange={(e) => this.updateSelectedTag(e)} defaultValue="default">
                                <option value="default" disabled hidden>Choose tag</option>
                                {this.state.allTags.map((tag, index) =>
                                    <option value={tag.id} key={tag.id}>{tag.name}</option>
                                )}
                            </styles.Dropdown>
                            <styles.SearchButton onClick={() => this.addTag('tag', this.state.addTag)} colour={this.state.idISBN10Colour}>Add</styles.SearchButton>
                        </styles.SearchWrapper>
                        <styles.SearchWrapper>
                            <styles.SearchButton onClick={() => this.setState({tagsBox: true})} colour={'accent3'}>Done</styles.SearchButton>
                        </styles.SearchWrapper>
                    </styles.InputWrapper>
                ]
                }
            </styles.BookInfoContainer>
        )
    }
}

export default BookInfo;
