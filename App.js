import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import {getNews} from './src/news';
import Article from './src/components/Article';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      refreshing: true,
    };
    this.fetchNews = this.fetchNews.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    this.fetchNews();
  }

  fetchNews() {
    getNews()
      .then(articles => {
        this.setState({
          articles: articles,
          refreshing: false,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          refreshing: false,
        });
      });
  }

  handleRefresh() {
    this.setState(
      {
        refreshing: true,
      },
      () => this.fetchNews(),
    );
  }

  render() {
    return (
      <Text>
        <FlatList
          data={this.state.articles}
          renderItem={({item}) => <Article article={item} />}
          keyExtractor={item => item.url}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
      </Text>
    );
  }
}
