// STEP 1 - Include Dependencies
// Include react
import React from "react";


// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);


/*const chartData = [
  {
    label: "HTML",
    value: "13"
  },
  {
    label: "CSS",
    value: "23"
  },
  {
    label: "Javascript",
    value: "80"
  },

];*/



// STEP 3 - Creating the JSON object to store the chart configurations


const ExampleChart = ({ data }) => {
  const chartConfigs = {
    type: "doughnut2d", // The chart type
    width: "400", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption also chart head message 
        caption: "Star per Language",
        //pieRadius to increase the size of the pie size it self 
        doughnutRadius: "35%",
        theme: "candy",
        //showPercentValues show the number of an item
        showPercentValues: 0,
        //paletteColors is to set up colors in the pie chart 
        //paletteColors:"#f0db"

      },
      // Chart Data
      data: data
    }
  };
  return (

    <ReactFC {...chartConfigs} />

  );

}

export default ExampleChart


// STEP 4 - Creating the DOM element to pass the react-fusioncharts component
