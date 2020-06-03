import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { GraphContainer } from '../../template/graphContainer/GraphContainer';
import { useAntParticipants } from '../../hooks/useAntParticipants';
import numeral from 'numeral';

export function AragonDaoChart() {
  const { isLight, lightTheme, darkTheme } = useContext(ThemeContext);
  const theme = isLight ? lightTheme : darkTheme;
  const { loading, error, data } = useAntParticipants();

  const renderChart = () => {
    if (loading) {
      return <>...</>;
    } else if (error) {
      return <>X_X</>;
    } else {
      const graphData = data.map((data) => {
        return {
          value: data.value,
          label: data.timestamp.toLocaleString({ month: 'long', day: '2-digit' }),
        };
      });
      const lastPoint = graphData[graphData.length - 1].value
      const lastParticipants = numeral(lastPoint).format('0.0a')
      return (
        <GraphContainer
          title="Participants"
          metric={lastParticipants}
          data={graphData}
          metricTitle={theme.firstInSeries}
          metricNumber={theme.metricNumbers}
          pointColor={theme.firstInSeriesPoint}
          axesColor={theme.axesGridLines}
        />
      );
    }
  };

  return (
    <div className="component-sub-container" style={{ borderColor: theme.borderColor }}>
      <div
        className="box-title"
        style={{
          backgroundColor: theme.metricBoxHeaderBg,
          borderColor: theme.borderColor,
        }}
      >
        <h3 style={{ color: theme.metricBoxHeaderTitle }}>ARAGON NETWORK DAO</h3>
        <h6 style={{ color: theme.metricBoxHelper }}>Read more</h6>
      </div>
      <div className="stats ant-metrics-stats" style={{ backgroundColor: theme.metricBoxBg }}>
        {renderChart()}
      </div>
    </div>
  );
}