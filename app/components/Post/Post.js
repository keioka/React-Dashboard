import React from 'react';
import { hot } from 'react-hot-loader';
import { ResponsiveLine } from '@nivo/line';
import ListPosts from '@components/Lists/ListPosts';
import Button from '@components/Buttons/Button';
import Card from '@components/Cards/Card/Card';
import H1 from '@components/Texts/H1/H1';
import GraphLine from '@components/Graphs/GraphLine';
import classes from './Post.scss';

class Post extends React.Component {
  handleClickButton = () => {};

  render() {
    return (
      <div>
        <H1 className={classes.title}>Post</H1>
        <ListPosts />
        <Button onClick={this.handleClickButton} className={classes.button}>
          Hello
        </Button>
      </div>
    );
  }
}

export default hot(module)(Post);
