
import Chart from 'react-apexcharts'
import vaccinedata from '../data/vaccine.json';

function Vaccined() {
    // baseDate	:통계 기준일자
    // sido	:지역명칭
    // firstCnt: 당일 통계(1차 접종)
    // secondCnt: 당일 통계(2차 접종)
    // thirdCnt: 당일 통계(3차 접종)
    // totalFirstCnt :전체 누적 통계(1차 접종)
    // totalSecondCnt :전체 누적 통계(2차 접종)
    // totalThirdCnt :전체 누적 통계(3차 접종)
    // accumulatedFirstCnt : 전일까지의 누적 통계(1차 접종)
    // accumulatedSecondCnt	: 전일까지의 누적 통계(2차 접종)
    // accumulatedThirdCnt	:전일까지의 누적 통계(3차 접종)
    var firstCnt=0;
    var secondCnt=0;
    var thirdCnt=0;
    var totalFirstCnt=0;
    var totalSecondCnt=0;
    var totalThirdCnt=0;
    var baseDate;
    // console.log(vaccinedata.data[0].sido)
    for(var key in vaccinedata.data){
      // console.log(vaccinedata.data[key].sido);
      if(vaccinedata.data[key].sido==="전국"){
        firstCnt=Number(vaccinedata.data[key].firstCnt);
        secondCnt=Number(vaccinedata.data[key].secondCnt);
        thirdCnt=Number(vaccinedata.data[key].thirdCnt);
        totalFirstCnt=Number(vaccinedata.data[key].totalFirstCnt);
        totalSecondCnt=Number(vaccinedata.data[key].totalSecondCnt);
        totalThirdCnt=Number(vaccinedata.data[key].totalThirdCnt);
        baseDate=vaccinedata.data[key].baseDate;
      }
    }
    const data1 = {
        options: {
            chart: {
                type: "bar",
                height: 160,
                stacked: true,
                stackType: "100%",
                toolbar: {
                  show: false
                }
              },
              plotOptions: {
                bar: {
                  horizontal: true
                }
              },
              dataLabels: {
                dropShadow: {
                  enabled: true
                },
                formatter: function(val) {
                  return val ? val.toFixed(1) + '%' : ''
                }
              },
              stroke: {
                width: 0
              },
              grid: {
                show: false,
                padding: {
                  top: 0,
                  bottom: 0,
                  right: 0,
                  left: 0
                }
              },
              xaxis: {
                categories: ["백신 접종 완료"],
                labels: {
                  show: false
                },
                axisBorder: {
                  show: false
                },
                axisTicks: {
                  show: false
                }
              },
            
              legend: {
                position: "bottom",
                horizontalAlign: "right"
              }
        }
    };

    const series1 = {
        series: [
            {
              name: "1차 접종",
              data: [firstCnt]
            },
            {
              name: "2차 접종",
              data: [secondCnt]
            },
            {
              name: "3차 접종",
              data: [thirdCnt]
            }
          ]
    }
    const data2 = {
      options: {
          chart: {
              type: "bar",
              height: 160,
              stacked: true,
              stackType: "100%",
              toolbar: {
                show: false
              }
            },
            plotOptions: {
              bar: {
                horizontal: true
              }
            },
            dataLabels: {
              dropShadow: {
                enabled: true
              },
              formatter: function(val) {
                return val ? val.toFixed(1) + '%' : ''
              }
            },
            stroke: {
              width: 0
            },
            grid: {
              show: false,
              padding: {
                top: 0,
                bottom: 0,
                right: 0,
                left: 0
              }
            },
            xaxis: {
              categories: ["백신 접종 완료(누적)"],
              labels: {
                show: false
              },
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false
              }
            },
          
            legend: {
              position: "bottom",
              horizontalAlign: "right"
            }
      }
  };

  const series2 = {
      series: [
          {
            name: "1차 접종",
            data: [totalFirstCnt]
          },
          {
            name: "2차 접종",
            data: [totalSecondCnt]
          },
          {
            name: "3차 접종",
            data: [totalThirdCnt]
          }
        ]
  }
    
    return (
        <div className="vaccine">
          <h2>백신 접종자 현황</h2>
          <h4>갱신: {baseDate}</h4>
            {
                <Chart
                    options={data1.options}
                    series={series1.series}
                    type="bar"
                    width={800}
                    height={100}
                />
            }
            {
                <Chart
                options={data2.options}
                series={series2.series}
                type="bar"
                width={800}
                height={100}
            />
            }

        </div>
    );
}

export default Vaccined;
