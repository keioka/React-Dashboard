import React from 'react';
import { hot } from 'react-hot-loader';
import { ResponsiveLine } from '@nivo/line';

import Button from '@components/Buttons/Button';
import Card from '@components/Cards/Card/Card';
import H1 from '@components/Texts/H1/H1';
import GraphLine from '@components/Graphs/GraphLine';
import classes from './About.scss';

const data = [
  {
    id: 'japan',
    color: 'hsl(220, 70%, 50%)',
    data: [
      {
        x: 'January',
        y: 21,
      },
      {
        x: 'Feburary',
        y: 149,
      },
      {
        x: 'March',
        y: 142,
      },
      {
        x: 'April',
        y: 234,
      },
      {
        x: 'May',
        y: 272,
      },
      {
        x: 'June',
        y: 215,
      },
      {
        x: 'July',
        y: 277,
      },
      {
        x: 'August',
        y: 105,
      },
      {
        x: 'September',
        y: 161,
      },
      {
        x: 'October',
        y: 42,
      },
    ],
  },
  {
    id: 'france',
    color: 'hsl(173, 70%, 50%)',
    data: [
      {
        x: 'January',
        y: 276,
      },
      {
        x: 'Feburary',
        y: 145,
      },
      {
        x: 'March',
        y: 207,
      },
      {
        x: 'April',
        y: 25,
      },
      {
        x: 'May',
        y: 116,
      },
      {
        x: 'June',
        y: 59,
      },
      {
        x: 'July',
        y: 174,
      },
      {
        x: 'August',
        y: 20,
      },
      {
        x: 'September',
        y: 146,
      },
      {
        x: 'October',
        y: 226,
      },
    ],
  },
  {
    id: 'us',
    color: 'hsl(21, 70%, 50%)',
    data: [
      {
        x: 'January',
        y: 136,
      },
      {
        x: 'Feburary',
        y: 281,
      },
      {
        x: 'March',
        y: 108,
      },
      {
        x: 'April',
        y: 169,
      },
      {
        x: 'May',
        y: 32,
      },
      {
        x: 'June',
        y: 296,
      },
      {
        x: 'July',
        y: 216,
      },
      {
        x: 'August',
        y: 230,
      },
      {
        x: 'September',
        y: 224,
      },
      {
        x: 'October',
        y: 262,
      },
    ],
  },
  {
    id: 'germany',
    color: 'hsl(228, 70%, 50%)',
    data: [
      {
        x: 'January',
        y: 3,
      },
      {
        x: 'Feburary',
        y: 87,
      },
      {
        x: 'March',
        y: 149,
      },
      {
        x: 'April',
        y: 212,
      },
      {
        x: 'May',
        y: 86,
      },
      {
        x: 'June',
        y: 245,
      },
      {
        x: 'July',
        y: 141,
      },
      {
        x: 'August',
        y: 226,
      },
      {
        x: 'September',
        y: 44,
      },
      {
        x: 'October',
        y: 117,
      },
    ],
  },
  {
    id: 'norway',
    color: 'hsl(209, 70%, 50%)',
    data: [
      {
        x: 'January',
        y: 85,
      },
      {
        x: 'Feburary',
        y: 207,
      },
      {
        x: 'March',
        y: 206,
      },
      {
        x: 'April',
        y: 66,
      },
      {
        x: 'May',
        y: 23,
      },
      {
        x: 'June',
        y: 70,
      },
      {
        x: 'July',
        y: 237,
      },
      {
        x: 'August',
        y: 57,
      },
      {
        x: 'September',
        y: 69,
      },
      {
        x: 'October',
        y: 65,
      },
    ],
  },
];

class About extends React.Component {
  handleClickButton = () => {};

  render() {
    return (
      <div style={{ height: 500 }}>
        <H1 className={classes.title}>About</H1>
        <GraphLine data={data} />
        <Button onClick={this.handleClickButton} className={classes.button}>
          Hello
        </Button>
      </div>
    );
  }
}

export default hot(module)(About);
