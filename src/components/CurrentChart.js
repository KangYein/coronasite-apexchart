
import Chart from 'react-apexcharts'
import React,{ useState, useEffect } from 'react';
import axios from 'axios'

function CurrentChart() {
  const [response, setResponse] = useState({ countryName: [], newCase: 0, total: 0 });
  const getData = async () => {
    try {
      const arrCountryName = [];
      const arrNewCase = [];
      const arrTotal = [];
      const response = await axios.get('https://api.corona-19.kr/korea/country/new/?serviceKey=i2wZrlNsVY5dbGDQPnL1uzAOkx7mW9IUR');
      for (const key in response.data) {
        // console.log(response.data[key].countryName)
        // console.log(response.data[key].newCase)
        if (response.data[key].countryName && response.data[key].countryName !== "합계") {
          arrCountryName.push(response.data[key].countryName);
          arrNewCase.push(Number(response.data[key].newCase.replace(',','')));//1,000단위 쉼표 제거
        } else if (response.data[key].countryName === "합계") {
          arrTotal.push(response.data[key].newCase);
        }

      }
      // console.log(arrCountryName)
      // console.log(arrNewCase)
      // console.log(arrTotal)
      setResponse({ countryName: arrCountryName, newCase: arrNewCase, total: arrTotal });
      // setResponse(response.countryName);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getData();
  }, [])
  const data1= {
    options: {
      chart: {
        id: 'coronachart1',
      },
      xaxis: {
        categories: response.countryName,
      },
      dataLabels: {
        offsetY: -25,
        enabled: true,
        textAnchor: 'middle',
        style: {
          fontSize: '15px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: ['orange']
        },
      },
      colors: [
        function () {
          return '#FF0000'
        }
      ],
      plotOptions: {
        bar: {
          borderRadius: 10,
          horizontal: false,
          dataLabels: {
            position: 'top'
          }
        },
      },

    }
  };

  const series1 = {
    series: [{
      name: '신규 확진자',
      data: response.newCase
    }]
  }
  //if(response.countryName.length!==0){
  //   return <></>
  // }
  return (
    <div className="current">
      <h1>코로나 실시간 확진자 현황</h1>
      {
        response.countryName.length !== 0 ? <Chart
        options={data1.options}
        series={series1.series}
        type="bar"
        width={800}
        height={500}
      /> : <></>
      }
        
    </div>
  );
}

export default CurrentChart;
