import React from 'react';
import classnames from 'classnames';
import { ResponsiveLine } from '@nivo/line';

import classes from './GraphLine.scss';

const theme = {
  axis: {
    textColor: '#fff',
    fontSize: '14px',
    tickColor: '#fff',
  },
  grid: {
    stroke: 'none',
    strokeWidth: 1,
  },
};
const GraphLine = ({ className, children, data }) => (
  <div className={classnames(className, classes.element)}>
    <ResponsiveLine
      data={data}
      margin={{
        top: 50,
        right: 160,
        bottom: 50,
        left: 100,
      }}
      xScale={{
        type: 'point',
      }}
      yScale={{
        type: 'linear',
        stacked: true,
        min: 'auto',
        max: 'auto',
      }}
      curve="monotoneX"
      minY="auto"
      maxY="auto"
      stacked
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'transportation',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      dotSize={10}
      dotColor="inherit:darker(0.3)"
      dotBorderWidth={2}
      dotBorderColor="inherit:darker(0.3)"
      enableDotLabel
      dotLabel="y"
      dotLabelYOffset={-12}
      animate
      motionStiffness={90}
      motionDamping={15}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .2)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .02)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      theme={theme}
    />
  </div>
);

GraphLine.propTypes = {};

GraphLine.defaultProps = {};

export default GraphLine;
