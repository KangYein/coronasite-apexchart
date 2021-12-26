
import Chart from 'react-apexcharts'
import React, { useState, useEffect } from 'react';
import axios from 'axios'

function CurrentChart() {
    //TotalCase : 누적 확진자
    //TotalCaseBefore : 확진환자
    //TotalRecovered : 누적 격리해제
    //TotalDeath : 누적사망
    //updateTime :  업데이트 날짜
    //top5city : 상위 5 지역      //city1n,city2n,city3n,city4n,city5n
    //top5cityPer : 상위 5 지역 퍼센트 //city1p,city2p,city3p,city4p,city5p
    var TotalCase;
    var TotalCaseBefore;
    var TotalRecovered;
    var TotalDeath;
    const arrtop5city = [];
    const arrtop5cityPer = [];
    var updateTime;
    const [response, setResponse] = useState({ top5city:[], top5cityPer: 0, TotalCase:0, TotalRecovered:0, TotalDeath:0 });
    const getData = async () => {
        try {
            const response = await axios.get('https://api.corona-19.kr/korea/?serviceKey=i2wZrlNsVY5dbGDQPnL1uzAOkx7mW9IUR');

                TotalCase=Number(response.data.TotalCase.replace(',',''));
                TotalRecovered=Number(response.data.TotalRecovered.replace(',',''));
                TotalDeath=Number(response.data.TotalDeath.replace(',',''));
                arrtop5city.push(response.data.city1n);
                arrtop5city.push(response.data.city2n);
                arrtop5city.push(response.data.city3n);
                arrtop5city.push(response.data.city4n);
                arrtop5city.push(response.data.city5n);
                arrtop5cityPer.push(Number(response.data.city1p));
                arrtop5cityPer.push(Number(response.data.city2p));
                arrtop5cityPer.push(Number(response.data.city3p));
                arrtop5cityPer.push(Number(response.data.city4p));
                arrtop5cityPer.push(Number(response.data.city5p));
                updateTime=response.data.updateTime;
            setResponse({top5city:arrtop5city, top5cityPer: arrtop5cityPer, TotalCase:TotalCase, TotalRecovered:TotalRecovered, TotalDeath:TotalDeath});
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getData();
    }, [])
    console.log(response.TotalCase);
    console.log(response.TotalRecovered);
    console.log(response.TotalDeath);
    
    var total3=[response.TotalCase,response.TotalRecovered,response.TotalDeath]
    console.log(total3)
    const data2={
        options:{
            series: total3,
            labels: ['누적 확진자','누적 격리 해제','누적 사망자'],
            colors:["#ff3d67","#059bff","#ffc233"],
            fill:{
                colors:["#ff3d67","#059bff","#ffc233"]
            }
        }
    }
    const series2=total3;
    const data1={
        options:{
            series: response.top5cityPer,
            labels: response.top5city
        }
    }
    const series1=response.top5cityPer;
    return (
        <div className="TotalChart">
            {
                response.top5city.length !== 0 ? <Chart
                    options={data1.options}
                    series={series1}
                    type="donut"
                    width={800}
                    height={500}
                /> : <></>
            }
            {
                total3.length !== 0 ? <Chart
                    options={data2.options}
                    series={series2}
                    type="donut"
                    width={800}
                    height={500}
                /> : <></>
            }
            
        </div>
    );
}

export default CurrentChart;
