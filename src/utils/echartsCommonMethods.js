/* eslint-disable no-use-before-define */

// import '@/utils/echarts-gl';
import { exportByVehicleId } from '@/api/echartExport';

// 日期横坐标（true为天 false为月）
let timeXArray = {
  timeArray: [],
  flag: true,
};

function getDay(beginAt, endAt) {
  const bdTime = new Date(beginAt).getTime();
  const beTime = new Date(endAt).getTime();
  const timeDiff = beTime - bdTime;
  const timeArray = [];
  for (let i = 0; i <= timeDiff; i += 86400000) {
    const ds = new Date(bdTime + i);
    const year = ds.getFullYear();
    const month = (ds.getMonth() + 1).toString().length === 1 ? '0' + (ds.getMonth() + 1).toString() : ds.getMonth() + 1;
    const day = ds.getDate().toString().length === 1 ? '0' + ds.getDate() : ds.getDate();
    const time = year + '-' + month + '-' + day;
    timeArray.push(time);
  }
  timeXArray.timeArray = timeArray;
  timeXArray.flag = true;
}

function getMonth(beginAt, endAt) {
  const timeArray = [];
  const s1 = beginAt.split('-');
  const s2 = endAt.split('-');
  let mCount = 0;
  if (parseInt(s1[0], 10) < parseInt(s2[0], 10)) {
    const m = (parseInt(s2[0], 10) - parseInt(s1[0], 10)) * 12;
    const n = parseInt(s2[1], 10) - parseInt(s1[1], 10);
    mCount = m + n + 1;
  } else {
    const n = parseInt(s2[1], 10) - parseInt(s1[1], 10);
    mCount = n + 1;
  }
  if (mCount > 0) {
    let startM = parseInt(s1[1], 10);
    let startY = parseInt(s1[0], 10);
    for (let i = 0; i < mCount; i++) {
      if (startM < 12) {
        timeArray[i] = startY + '-' + (startM > 9 ? startM : '0' + startM);
        startM += 1;
      } else {
        timeArray[i] = startY + '-' + (startM > 9 ? startM : '0' + startM);
        startM = 1;
        startY += 1;
      }
    }
  }
  timeXArray.timeArray = timeArray;
  timeXArray.flag = false;
}

// 填充天数
export function getDayRange(beginAt, endAt) {
  const bdTime = new Date(beginAt).getTime();
  const beTime = new Date(endAt).getTime();
  const timeDiff = beTime - bdTime;
  const dArr = [];
  for (let i = 0; i <= timeDiff; i += 86400000) {
    const ds = new Date(bdTime + i);
    const year = ds.getFullYear();
    const month = (ds.getMonth() + 1).toString().length === 1 ? '0' + (ds.getMonth() + 1).toString() : ds.getMonth() + 1;
    const day = ds.getDate().toString().length === 1 ? '0' + ds.getDate() : ds.getDate();
    const time = year + '-' + month + '-' + day;
    dArr.push(time);
  }
  return dArr;
}

// 填充月份
export function getMonthRange(beginAt, endAt) {
  const dateArry = [];
  const s1 = beginAt.split('-');
  const s2 = endAt.split('-');
  let mCount = 0;
  if (parseInt(s1[0], 10) < parseInt(s2[0], 10)) {
    const m = (parseInt(s2[0], 10) - parseInt(s1[0], 10)) * 12;
    const n = parseInt(s2[1], 10) - parseInt(s1[1], 10);
    mCount = m + n + 1;
  } else {
    const n = parseInt(s2[1], 10) - parseInt(s1[1], 10);
    mCount = n + 1;
  }
  if (mCount > 0) {
    let startM = parseInt(s1[1], 10);
    let startY = parseInt(s1[0], 10);
    for (let i = 0; i < mCount; i++) {
      if (startM < 12) {
        dateArry[i] = startY + '-' + (startM > 9 ? startM : '0' + startM);
        startM += 1;
      } else {
        dateArry[i] = startY + '-' + (startM > 9 ? startM : '0' + startM);
        startM = 1;
        startY += 1;
      }
    }
  }
  // timeXArray.timeArray = dateArry;
  // timeXArray.flag = false;
  return dateArry;
}

// 获取横坐标
export function initTimeXArray(startDateValue, endDateValue) {
  timeXArray = [];
  const bdTime = new Date(startDateValue).getTime();
  const beTime = new Date(endDateValue).getTime();
  const timeDiff = beTime - bdTime;
  if ((timeDiff / (24 * 60 * 60 * 1000)) > 30) {
    getMonth(startDateValue, endDateValue);
  } else {
    getDay(startDateValue, endDateValue);
  }
}

// 初始化柱状图数据
function initSeriesData(distributionXArray) {
  const seriesData = [];
  distributionXArray.forEach(() => {
    seriesData.push(0);
  });
  return seriesData;
}

// 获取分布图x轴
function getDistributionXRange(resultDto) {
  const rangeArray = resultDto.range.split(',');
  const xUnit = resultDto.xUnit;
  const xTranslateMethod = resultDto.translateMethod;
  const size = (rangeArray[2] - rangeArray[1]) / rangeArray[0];
  const distributionXArray = [];
  for (let i = 0; i < size; i++) {
    let x;
    if (xTranslateMethod !== null && xTranslateMethod !== '-') {
      x = ((rangeArray[0] * i) + parseInt(rangeArray[1], 10)) * parseFloat(xTranslateMethod);
      distributionXArray.push(x);
    } else {
      x = ((rangeArray[0] * i) + parseInt(rangeArray[1], 10));
      distributionXArray.push(x);
    }
  }
  return distributionXArray;
}

function getLCMDistributionXRange(resultDto) {
  const rangeArray = resultDto.range.split(',');
  const xUnit = resultDto.xUnit;
  const xTranslateMethod = resultDto.translateMethod;
  const size = (rangeArray[2] - rangeArray[1]) / rangeArray[0];
  const distributionXArray = [];
  for (let i = 0; i <= size; i++) {
    let x;
    if (xTranslateMethod !== null && xTranslateMethod !== '-') {
      x = ((rangeArray[0] * i) + parseInt(rangeArray[1], 10)) * parseFloat(xTranslateMethod);
      distributionXArray.push(x);
    } else {
      x = ((rangeArray[0] * i) + parseInt(rangeArray[1], 10));
      distributionXArray.push(x);
    }
  }
  return distributionXArray;
}

// 获取分布图seriesData
function getDistributionSeriesData(resultData, distributionXArray) {
  const seriesData = initSeriesData(distributionXArray);
  let count = 0;
  if (resultData.length !== 0) {
    resultData.forEach((value) => {
      if (value.yValue !== '' && value.yValue !== null && value.yValue !== 0) {
        const array = value.yValue.substring(1, value.yValue.length - 1).split(',');
        array.forEach((val, index) => {
          if (val === null || isNaN(val) || val === 'undefined' || val === '') {
            count += 0;
            seriesData[index] += 0;
          } else {
            count += parseInt(val, 10);
            seriesData[index] += parseInt(val, 10);
          }
        });
      }
    });
    seriesData.forEach((value, index) => {
      if (value !== 0) {
        seriesData[index] = ((parseFloat(value) / parseFloat(count)) * 100).toFixed(2);
      }
    });
  }
  return seriesData;
}

// 获取LCM类型分布图seriesData
function getLcmDistributionSeriesData(resultData, distributionXArray) {
  const seriesData = initSeriesData(distributionXArray);
  if (resultData.length !== 0) {
    resultData.forEach((value) => {
      if (value.yValue !== '' && value.yValue !== null && value.yValue !== 0) {
        const array = value.yValue.substring(1, value.yValue.length - 1).split(',');
        console.log(array);
        array.forEach((val, index) => {
          if (val === null || isNaN(val) || val === 'undefined' || val === '') {
            seriesData[index] += 0;
          } else {
            seriesData[index] += parseInt(val, 10);
          }
        });
      }
    });
    seriesData.forEach((value, index) => {
      if (value !== 0) {
        seriesData[index] = parseFloat(value).toFixed(2);
      }
    });
  }
  return seriesData;
}

// 获取柱状图阴影
function getShadowData(seriesData, xArray) {
  const shadowData = [];
  const maxYData = parseFloat(Math.max.apply(null, seriesData));
  xArray.forEach(() => {
    shadowData.push(maxYData);
  });
  return shadowData;
}

// 普通分布图或者LCM
function distributionChart(data, chartName) {
  const option = {
    title: {
      text: chartName,
      textStyle: {
        color: '#333333',
        fontSize: '18',
        fontFamily: 'PingFangSC-Medium',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow',   // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: '{b1}</br>{c1}',
    },
    legend: {
      x: 'center',
      bottom: 'bottom',
      data: [{
        name: chartName,
        textStyle: {
          fontSize: '14',
          color: '#333333',
        },
      }],
    },
    xAxis: {
      data: [],
      name: data.resultDto.xUnit,
    },
    yAxis: {
      name: '(' + data.resultDto.yUnit + ')',
    },
    series: [
      { // For shadow
        type: 'bar',
        itemStyle: {
          normal: { color: 'rgba(0,0,0,0.05)' },
        },
        barGap: '-100%',
        barCategoryGap: '40%',
        data: [],
        animation: false,
        barMaxWidth: '50px',
      },
      {
        name: chartName,
        type: data.resultDto.type,
        data: [],
        barMaxWidth: '50px',
        itemStyle: {
          normal: {
            color: '#015BA0',
          },
        },
      }],
  };
  let distributionXArray = [];
  if (data.resultDto.pretreatment === 'Distribute') {
    distributionXArray = getDistributionXRange(data.resultDto);
  } else {
    distributionXArray = getLCMDistributionXRange(data.resultDto);
  }
  let seriesData;
  if (data.resultDto.pretreatment === 'Distribute') {
    seriesData = getDistributionSeriesData(data.resultData, distributionXArray);
  } else {
    seriesData = getLcmDistributionSeriesData(data.resultData, distributionXArray);
  }
  const shadowData = getShadowData(seriesData, distributionXArray);
  option.xAxis.data = distributionXArray;
  option.series[0].data = shadowData;
  option.series[1].data = seriesData;
  return option;
}

// 初始化载荷分布图数据
function initHeatMapSeriesData(profileXYArray) {
  const seriesData = [];
  for (let i = 0; i < profileXYArray.xArray.length; i++) {
    const innerData = [];
    for (let l = 0; l < profileXYArray.yArray.length; l++) {
      innerData.push(0);
    }
    seriesData.push(innerData);
  }
  return seriesData;
}

// 获取heatMap x y轴 flag true为绘图用 false为累加用
function getHeatMapRange(resultDto, flag) {
  let xTranslateMethod = resultDto.translateMethod;
  let yTranslateMethod = resultDto.translateMethodY;
  const profileXYArray = {
    xArray: [],
    yArray: [],
    xSize: 0,
    ySize: 0,
    xSuitSize: 0,
    ySuitSize: 0,
    xSuitStep: 0,
    ySuitStep: 0,
  };
  const rangeXArray = resultDto.range.split('|')[0].split(',');
  const rangeYArray = resultDto.range.split('|')[1].split(',');
  const xSize = (rangeXArray[2] - rangeXArray[1]) / rangeXArray[0];
  const ySize = (rangeYArray[2] - rangeYArray[1]) / rangeYArray[0];
  profileXYArray.xSize = xSize;
  profileXYArray.ySize = ySize;
  const xSuitStep = rangeXArray[0];
  const ySuitStep = rangeYArray[0];
  if (flag) {
    // for (let x = 0; x < xSize; x++) {
    //   if (xSize > 20) {
    //     xSuitStep = rangeXArray[0] * (x + 1);
    //     xSize = (rangeXArray[2] - rangeXArray[1]) / xSuitStep;
    //   }
    // }
    // for (let y = 0; y < ySize; y++) {
    //   if (ySize > 20) {
    //     ySuitStep = rangeYArray[0] * (y + 1);
    //     ySize = (rangeYArray[2] - rangeYArray[1]) / ySuitStep;
    //   }
    // }
    for (let x = 0; x < xSize; x++) {
      if (xTranslateMethod === '' || xTranslateMethod === null || xTranslateMethod === '-') {
        xTranslateMethod = 1;
      }
      const val = (xSuitStep * (x + 1)) + parseInt(rangeXArray[1], 10);
      profileXYArray.xArray.push(val * parseFloat(xTranslateMethod));
    }
    for (let y = 0; y < ySize; y++) {
      if (yTranslateMethod === '' || yTranslateMethod === null || yTranslateMethod === '-') {
        yTranslateMethod = 1;
      }
      const val = (ySuitStep * (y + 1)) + parseInt(rangeYArray[1], 10);
      profileXYArray.yArray.push(val * parseFloat(yTranslateMethod));
    }
    profileXYArray.xSuitSize = xSize;
    profileXYArray.ySuitSize = ySize;
    profileXYArray.xSuitStep = xSuitStep;
    profileXYArray.ySuitStep = ySuitStep;
  } else {
    // for (let x = 0; x < xSize; x++) {
    //   profileXYArray.xArray.push((xSuitStep * (x + 1)) + parseInt(rangeXArray[1], 10));
    // }
    // for (let y = 0; y < ySize; y++) {
    //   profileXYArray.yArray.push((ySuitStep * (y + 1)) + parseInt(rangeYArray[1], 10));
    // }
    for (let x = 0; x < xSize; x++) {
      if (xTranslateMethod === '' || xTranslateMethod === null || xTranslateMethod === '-') {
        xTranslateMethod = 1;
      }
      const val = (xSuitStep * (x + 1)) + parseInt(rangeXArray[1], 10);
      profileXYArray.xArray.push(val * parseFloat(xTranslateMethod));
    }
    for (let y = 0; y < ySize; y++) {
      if (yTranslateMethod === '' || yTranslateMethod === null || yTranslateMethod === '-') {
        yTranslateMethod = 1;
      }
      const val = (ySuitStep * (y + 1)) + parseInt(rangeYArray[1], 10);
      profileXYArray.yArray.push(val * parseFloat(yTranslateMethod));
    }
  }
  // const xSize = (rangeXArray[2] - rangeXArray[1]) / rangeXArray[0];
  // const ySize = (rangeYArray[2] - rangeYArray[1]) / rangeYArray[0];
  // const xStep = rangeXArray[0];
  // const yStep = rangeYArray[0];
  // for (let x = 0; x < xSize; x++) {
  //   profileXYArray.xArray.push((xStep * (x + 1)) + parseInt(rangeXArray[1], 10));
  // }
  // for (let y = 0; y < ySize; y++) {
  //   profileXYArray.yArray.push((yStep * (y + 1)) + parseInt(rangeYArray[1], 10));
  // }
  return profileXYArray;
}

// string 转 Json
function toJsonArray(json, x, y) {
  const array = new Array(x);
  for (let i = 0; i < array.length; i++) {
    array[i] = new Array(y);
  }
  const objects = JSON.parse(json);
  const outSize = objects.length;
  for (let i = 0; i < outSize; i++) {
    const objs = objects[i];
    const innerSize = objs.length;
    for (let j = 0; j < innerSize; j++) {
      const val = parseInt(objs[j], 10);
      array[i][j] = val;
    }
  }
  return array;
}

// 累加载荷分布
export function unitHeatMapSeriesData(resultData, resultDto) {
  const unitHeatMapData = {
    unitSeriesData: [],
    count: 0,
  };
  const profileXYArray = getHeatMapRange(resultDto, false);
  const unitSeriesData = initHeatMapSeriesData(profileXYArray);
  const x = profileXYArray.xSize;
  const y = profileXYArray.ySize;
  let count = 0;
  if (resultData.length !== 0) {
    resultData.forEach((value) => {
      if (value.yValue !== '' && value.yValue !== null && value.yValue !== 0) {
        const array = toJsonArray(value.yValue, x, y);
        array.forEach((innerData, i) => {
          innerData.forEach((val, l) => {
            if (isNaN(val) || val === null || val === '' || val === 'undefined') {
              count += 0;
              unitSeriesData[i][l] += 0;
            } else {
              count += parseInt(val, 10);
              unitSeriesData[i][l] += parseInt(val, 10);
            }
          });
        });
      }
    });
  }
  unitHeatMapData.unitSeriesData = unitSeriesData;
  unitHeatMapData.count = count;
  return unitHeatMapData;
}

// 转换二维数组内部
function translateInnerData(unitSeriesData, multiple, xSuitSize) {
  const translatedInnerData = [];
  for (let i = 0; i < unitSeriesData.length; i++) {
    const originalData = unitSeriesData[i];
    const innerData = [];
    for (let j = 0; j < xSuitSize; j++) {
      let value = 0;
      for (let k = 0; k < multiple; k++) {
        value += originalData[(multiple * j) + k];
      }
      innerData.push(value);
    }
    translatedInnerData.push(innerData);
  }
  return translatedInnerData;
}

// 转换二维数组外部
function translateOutData(translatedInnerData, multiple, ySuitSize) {
  const translatedSeriesData = [];
  for (let i = 0; i < ySuitSize; i++) {
    const outData = [];
    translatedInnerData[0].forEach(() => {
      outData.push(0);
    });
    for (let j = 0; j < multiple; j++) {
      const originalData = translatedInnerData[(i * multiple) + j];
      for (let k = 0; k < outData.length; k++) {
        outData[k] += originalData[k];
      }
    }
    translatedSeriesData.push(outData);
  }
  return translatedSeriesData;
}

// 缩减合并二维数组（二维数组 外层为x轴 内层为Y轴）
function translateHeatMapSeriesData(unitSeriesData, profileXYArray) {
  let translatedSeriesData = [];
  const innerCount = profileXYArray.ySize / profileXYArray.ySuitSize;
  const outCount = profileXYArray.xSize / profileXYArray.xSuitSize;
  // 无需转换
  if (innerCount === 1 && outCount === 1) {
    translatedSeriesData = unitSeriesData;
  } else {
    const translatedInnerData = translateInnerData(unitSeriesData, innerCount,
      profileXYArray.ySuitSize);
    translatedSeriesData = translateOutData(translatedInnerData, outCount,
      profileXYArray.xSuitSize);
  }
  // translatedSeriesData = unitSeriesData;
  return translatedSeriesData;
}

// 载荷分布图
function heatMapChart(data, chartName) {
  let xStep = 1;
  let yStep = 1;
  const option = {
    title: {
      text: chartName,
    },
    tooltip: {
      position: 'top',
      formatter: params => ((params.value[0] + 1) * xStep) + '</br>' + ((params.value[1] + 1) * yStep) + '</br>' + params.value[2],
    },
    toolbox: {
      show: false,
      orient: 'horizontal',
      x: 'right',
      y: 'top',
      color: ['#1e90ff', '#22bb22', '#4b0082', '#d2691e'],
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: '#ccc',
      borderWidth: 0,
      padding: 5,
      showTitle: true,
      feature: {
        myTool: {
          show: true,
          title: '自定义扩展方法',
          icon: 'image://../../static/img/export.png',
          onclick: (opt) => {
            csvHeadMapExport(opt);
          },
        },
      },
    },
    animation: false,
    grid: {
      x2: '120px',
      x: '60px',
      y2: '20px',
    },
    xAxis: {
      type: 'category',
      data: [],
      splitArea: {
        show: true,
      },
      name: data.resultDto.xUnit,
    },
    yAxis: {
      type: 'category',
      data: [],
      splitArea: {
        show: true,
      },
      name: data.resultDto.yUnit,
    },
    visualMap: {
      min: 0,
      max: 30,
      calculable: true,
      left: 'right',
      bottom: '10%',
      orient: 'vertical',
      align: 'left',
      itemHeight: 200,
      inRange: {
        color: ['#5E51A0', '#3789BB', '#6AC1A5', '#ACDCA6', '#E6F49D', '#F6F9AE', '#FDDF90', '#FBAD68', '#F26D4A', '#D34052', '#9C0943'],
        symbolSize: [120, 120],
      },
    },
    series: [
      {
        name: chartName,
        type: data.resultDto.type,
        data: [],
        label: {
          normal: {
            show: false,
          },
        },
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        progressive: 5000,
        animation: true,
      }],
  };
  const profileXYArray = getHeatMapRange(data.resultDto, true);
  xStep = profileXYArray.xSuitStep;
  yStep = profileXYArray.ySuitStep;
  let seriesData = initHeatMapSeriesData(profileXYArray);
  const unitHeatMapData = unitHeatMapSeriesData(data.resultData, data.resultDto);
  const translatedSeriesData = translateHeatMapSeriesData(unitHeatMapData.unitSeriesData,
    profileXYArray);
  const count = unitHeatMapData.count;
  seriesData = [];
  translatedSeriesData.forEach((innerData, i) => {
    innerData.forEach((val, l) => {
      const value = [];
      if (val === 0) {
        value.push(i, l, 0);
      } else {
        let precent = ((parseFloat(val) / count) * 100).toFixed(2);
        if (isNaN(precent)) {
          precent = 0;
        }
        value.push(i, l, precent);
      }
      seriesData.push(value);
    });
  });
  option.xAxis.data = profileXYArray.xArray;
  option.yAxis.data = profileXYArray.yArray;
  option.series[0].data = seriesData;
  return option;
}


export function csvHeadMapExport(data) {
  console.log(data);
  const option = data.option;
  const seriesData = [];
  for (let i = 0; i < option.series[0].data.length; i++) {
    seriesData[i] = option.series[0].data[i][2];
  }
  const echartsHelper = {
    title: option.title[0].text,
    type: option.series[0].type,
    xAxisName: option.xAxis[0].name,
    yAxisName: option.yAxis[0].name,
    xAxisData: option.xAxis[0].data.toString(),
    yAxisData: option.yAxis[0].data.toString(),
    seriesData: seriesData.toString(),
  };
  const vehicleId = document.getElementById('vehicleId').value;
  console.log(vehicleId);
  debugger;
  exportByVehicleId(vehicleId, echartsHelper).then((response) => {});
  const obj = document.getElementById('file-down');
}

export function csvExport(data) {
  console.log(data);
}

export function unitHeatData(data) {
  let xStep = 1;
  let yStep = 1;
  const profileXYArray = getHeatMapRange(data.resultDto, true);
  xStep = profileXYArray.xSuitStep;
  yStep = profileXYArray.ySuitStep;
  const seriesData = initHeatMapSeriesData(profileXYArray);
  const unitHeatMapData = unitHeatMapSeriesData(data.resultData, data.resultDto);
  const translatedSeriesData = translateHeatMapSeriesData(unitHeatMapData.unitSeriesData,
    profileXYArray);
  return translatedSeriesData;
}

// 累加柱状图Y轴(普通)
function getNormalBarSeriesData(resultData) {
  const timeArray = timeXArray.timeArray;
  const seriesData = [];
  timeArray.forEach((val, i) => {
    seriesData.push(0);
  });
  timeArray.forEach((value, i) => {
    resultData.forEach((val, l) => {
      const yValue = val.yValue;
      let time = null;
      if (timeXArray.flag) {
        // 按天
        time = val.xValue;
      } else {
        // 按月
        time = val.xValue.substring(0, (val.xValue.length - 3));
      }
      if (yValue !== null && yValue !== ''
        && yValue !== 'undefined' && !isNaN(yValue)) {
        if (value === time) {
          seriesData[i] = (parseFloat(seriesData[i]) + parseFloat(yValue)).toFixed(2);
        }
      }
    });
  });
  return seriesData;
}

function getNormalBarSeriesDataDay(resultData) {
  const timeArray = timeXArray.timeArray;
  const seriesData = [];
  timeArray.forEach((val, i) => {
    seriesData.push(0);
  });
  timeArray.forEach((value, i) => {
    resultData.forEach((val, l) => {
      const yValue = val.yValue;
      let time = null;
      time = val.xValue;
      if (yValue !== null && yValue !== ''
        && yValue !== 'undefined' && !isNaN(yValue)) {
        if (value === time) {
          seriesData[i] = (parseFloat(seriesData[i]) + parseFloat(yValue)).toFixed(2);
        }
      }
    });
  });
  return seriesData;
}
function getNormalBarSeriesDataMonth(resultData) {
  const timeArray = timeXArray.timeArray;
  const seriesData = [];
  timeArray.forEach((val, i) => {
    seriesData.push(0);
  });
  timeArray.forEach((value, i) => {
    resultData.forEach((val, l) => {
      const yValue = val.yValue;
      let time = null;
      time = val.xValue.substring(0, (val.xValue.length - 3));
      if (yValue !== null && yValue !== ''
        && yValue !== 'undefined' && !isNaN(yValue)) {
        if (value === time) {
          seriesData[i] = (parseFloat(seriesData[i]) + parseFloat(yValue)).toFixed(2);
        }
      }
    });
  });
  return seriesData;
}
function getSpecialBarSeriesDataDay(resultData) {
  const timeArray = timeXArray.timeArray;
  const seriesData = [];
  let count = 1;
  timeArray.forEach((val, i) => {
    seriesData.push(0);
  });
  timeArray.forEach((value, i) => {
    resultData.forEach((val, l) => {
      const yValue = val.yValue;
      let time = null;
      time = val.xValue;
      if (yValue !== null && yValue !== ''
        && yValue !== 'undefined' && !isNaN(yValue) && yValue !== 0) {
        if (value === time) {
          seriesData[i] = (parseFloat(seriesData[i]) + parseFloat(yValue));
          count++;
        }
      }
    });
    if (seriesData[i] !== 0) {
      seriesData[i] = (parseFloat(seriesData[i]) / (count - 1)).toFixed(2);
    }
    count = 1;
  });
  return seriesData;
}
function getSpecialBarSeriesDataMonth(resultData) {
  const timeArray = timeXArray.timeArray;
  const seriesData = [];
  let count = 1;
  timeArray.forEach((val, i) => {
    seriesData.push(0);
  });
  timeArray.forEach((value, i) => {
    resultData.forEach((val, l) => {
      const yValue = val.yValue;
      let time = null;
      time = val.xValue.substring(0, (val.xValue.length - 3));
      if (yValue !== null && yValue !== ''
        && yValue !== 'undefined' && !isNaN(yValue)) {
        if (value === time) {
          seriesData[i] = (parseFloat(seriesData[i]) + parseFloat(yValue));
          count++;
        }
      }
    });
    if (seriesData[i] !== 0) {
      seriesData[i] = (parseFloat(seriesData[i]) / (count - 1)).toFixed(2);
    }
    count = 1;
  });
  return seriesData;
}

// 累加柱状图Y轴（特殊）
function getSpecialBarSeriesData(resultData) {
  const timeArray = timeXArray.timeArray;
  const seriesData = [];
  let count = 1;
  timeArray.forEach((val, i) => {
    seriesData.push(0);
  });
  timeArray.forEach((value, i) => {
    resultData.forEach((val, l) => {
      const yValue = val.yValue;
      let time = null;
      if (timeXArray.flag) {
        // 按天
        time = val.xValue;
      } else {
        // 按月
        time = val.xValue.substring(0, (val.xValue.length - 3));
      }
      if (yValue !== null && yValue !== ''
        && yValue !== 'undefined' && !isNaN(yValue)) {
        if (value === time) {
          seriesData[i] = (parseFloat(seriesData[i]) + parseFloat(yValue));
          count++;
        }
      }
      seriesData[i] = (parseFloat(seriesData[i]) / (count - 1)).toFixed(2);
      count = 1;
    });
  });
  return seriesData;
}
// 普通柱状图
function normalBarChart(data, chartName) {
  const option = {
    title: {
      text: chartName,
      textStyle: {
        color: '#333333',
        fontSize: '18',
        fontFamily: 'PingFangSC-Medium',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow',   // 默认为直线，可选为：'line' | 'shadow'
      },
      formatter: '{b1}</br>{c1}',
    },
    legend: {
      x: 'center',
      bottom: 'bottom',
      data: [{
        name: chartName,
        textStyle: {
          fontFamily: 'PingFangSC-Regular',
          fontSize: '14',
          color: '#333333',
        },
      }],
    },
    xAxis: {
      data: timeXArray.timeArray,
      name: data.resultDto.xUnit,
    },
    yAxis: {
      name: '(' + data.resultDto.yUnit + ')',
    },
    series: [
      { // For shadow
        type: 'bar',
        itemStyle: {
          normal: { color: 'rgba(0,0,0,0.05)' },
        },
        barGap: '-100%',
        barCategoryGap: '40%',
        data: [],
        animation: false,
        barMaxWidth: '50px',
      },
      {
        name: chartName,
        type: data.resultDto.type,
        data: [],
        barMaxWidth: '50px',
        itemStyle: {
          normal: {
            color: '#015BA0',
          },
        },
      }],
  };
  let seriesData = [];
  let shadowData = [];
  const resultDto = data.resultDto;
  const pretreatment = resultDto.pretreatment;
  if (pretreatment === 'Max_Diff' || pretreatment === 'Idle'
    || pretreatment === 'Scale_Multiply') {
    if (timeXArray.flag) {
      seriesData = getNormalBarSeriesDataDay(data.resultData);
    } else {
      seriesData = getNormalBarSeriesDataMonth(data.resultData);
    }
  } else {
    if (timeXArray.flag) {
      if (pretreatment === 'Scale_Distribution' || pretreatment === 'Avg') {
        seriesData = getSpecialBarSeriesDataDay(data.resultData);
      } else {
        seriesData = getNormalBarSeriesDataDay(data.resultData);
      }
    }
    if (!timeXArray.flag) {
      if (pretreatment === 'Scale_Distribution' || pretreatment === 'Scale' ||
        pretreatment === 'Avg') {
        seriesData = getSpecialBarSeriesDataMonth(data.resultData);
      } else {
        seriesData = getNormalBarSeriesDataMonth(data.resultData);
      }
    }
  }
  shadowData = getShadowData(seriesData, timeXArray.timeArray);
  option.series[0].data = shadowData;
  option.series[1].data = seriesData;
  return option;
}

// 获取图表option(charts为图表数据 index是为了确认图表名称)
export function drawChart(data, chartName) {
  let option = {};
  const resultDto = data.resultDto;
  const resultData = data.resultData;
  const pretreatment = resultDto.pretreatment;
  if (pretreatment === 'Distribute' || pretreatment === 'Lcm_E' || pretreatment === 'Lcm_F') {
    option = distributionChart(data, chartName);
  } else if (pretreatment === 'Profile') {
    option = heatMapChart(data, chartName);
  } else {
    option = normalBarChart(data, chartName);
  }
  return option;
}

// 计算Nox页面的分布图
export function noxDistribution(dto, array) {
  const minStep = dto.range.split(',')[0];
  const startStep = dto.range.split(',')[1];
  const limit = dto.range.split(',')[2];
  const arrayTrue = [];
  let count = 0;
  for (let i = 0; i < limit / minStep; i++) {
    arrayTrue[i] = 0;
  }
  for (let i = 0; i < array.length; i++) {
    if (array[i].yValue !== null && array[i].yValue !== '') {
      const value = array[i].yValue.slice(1, -1).split(',');
      if (value[0] !== '') {
        for (let j = 0; j < value.length; j++) {
          count += parseInt(value[j], 10);
          arrayTrue[j] += parseInt(value[j], 10);
        }
      }
    }
  }
  for (let i = 0; i < arrayTrue.length; i++) {
    const value = parseFloat(arrayTrue[i] / count);
    arrayTrue[i] = parseFloat(value * 100).toFixed(2);
  }
  return arrayTrue;
}

// 计算Nox页面的分布图的X轴
export function noxDistributionXArray(dto) {
  const minStep = dto.range.split(',')[0];
  const startStep = dto.range.split(',')[1];
  const limit = dto.range.split(',')[2];
  const xArray = [];
  for (let i = 0; i < limit / minStep; i++) {
    xArray.push(i * minStep);
  }
  return xArray;
}


// 获取非分布柱状图的Y轴按天统计
export function coverageDay(dArr, array) {
  const valArray = [];
  for (let i = 0; i < dArr.length; i++) {
    valArray.push(0);
  }
  for (let i = 0; i < dArr.length; i++) {
    for (let j = 0; j < array.length; j++) {
      const time = array[j].xValue;
      const value = array[j].yValue;
      if (dArr[i] === time) {
        valArray[i] = (parseFloat(valArray[i]) + parseFloat(value)).toFixed(2);
      }
    }
  }
  return valArray;
}

export function coverageDaySpecial(dArr, array) {
  const valArray = [];
  let count = 1;
  for (let i = 0; i < dArr.length; i++) {
    valArray.push(0);
  }
  for (let i = 0; i < dArr.length; i++) {
    for (let j = 0; j < array.length; j++) {
      const time = array[j].xValue;
      const value = array[j].yValue;
      if (dArr[i] === time) {
        valArray[i] = (parseFloat(valArray[i]) + parseFloat(value));
        count++;
      }
    }
    valArray[i] = (parseFloat(valArray[i]) / (count - 1)).toFixed(2).toString();
    count = 1;
  }
  return valArray;
}

// 计算分布图(flag用于判断是overview还是统计(true为overview))
export function coverageDistribute(array, selectStep, totalCount, flag) {
  // 10,-50,150
  const minStep = array[0].range.split(',')[0];
  const startStep = array[0].range.split(',')[1];
  let limit = '';
  if (startStep < 0) {
    limit = parseInt(array[0].range.split(',')[2], 10) - parseInt(startStep, 10);
  } else {
    limit = array[0].range.split(',')[2];
  }
  let count = 0;
  const arrayTemp = [];
  const arrayTrue = [];
  for (let i = 0; i < limit / minStep; i++) {
    arrayTemp[i] = 0;
  }
  for (let i = 0; i < array.length; i++) {
    if (array[i].yValue !== null && array[i].yValue !== '') {
      const value = array[i].yValue.slice(1, -1).split(',');
      if (value[0] !== '') {
        for (let j = 0; j < value.length; j++) {
          count += parseInt(value[j], 10);
          arrayTemp[j] += parseInt(value[j], 10);
        }
      }
    }
  }
  count = parseFloat(count / 100);
  if (flag) {
    for (let j = 0; j < limit / minStep; j++) {
      let count1 = 0;
      for (let m = 0; m < 1; m++) {
        count1 += arrayTemp[j + m];
      }
      arrayTrue.push(count1);
    }
    for (let m = 0; m < arrayTrue.length; m++) {
      arrayTrue[m] = parseFloat(arrayTrue[m] / count).toFixed(2);
    }
  } else {
    for (let j = 0; j < limit / selectStep; j++) {
      let count1 = 0;
      for (let m = 0; m < totalCount; m++) {
        count1 += arrayTemp[(totalCount * j) + m];
      }
      arrayTrue.push(count1);
    }
    for (let m = 0; m < arrayTrue.length; m++) {
      arrayTrue[m] = parseFloat(arrayTrue[m] / count).toFixed(2);
    }
  }
  return arrayTrue;
}

// 获取非分布柱状图的Y轴按月统计
export function coverageMonth(dArr, array) {
  const valArray = [];
  for (let i = 0; i < dArr.length; i++) {
    valArray.push(0);
  }
  for (let i = 0; i < dArr.length; i++) {
    for (let j = 0; j < array.length; j++) {
      const time = array[j].xValue.substring(0, (array[j].xValue.length - 3));
      const value = array[j].yValue;
      if (dArr[i] === time) {
        valArray[i] = (parseFloat(valArray[i]) + parseFloat(value)).toFixed(2);
      }
    }
  }
  return valArray;
}

export function coverageMonthSpecial(dArr, array) {
  const valArray = [];
  let count = 1;
  for (let i = 0; i < dArr.length; i++) {
    valArray.push(0);
  }
  for (let i = 0; i < dArr.length; i++) {
    for (let j = 0; j < array.length; j++) {
      const time = array[j].xValue.substring(0, (array[j].xValue.length - 3));
      const value = array[j].yValue;
      if (dArr[i] === time) {
        valArray[i] = (parseFloat(valArray[i]) + parseFloat(value));
        count++;
      }
    }
    valArray[i] = (parseFloat(valArray[i]) / (count - 1)).toFixed(2).toString();
    count = 1;
  }
  return valArray;
}

// 初始化Array数组
function initArray(array) {
  const xArrayTemp = [];
  for (let i = 0; i < array[0].length; i++) {
    xArrayTemp[i] = 0;
  }
  return xArrayTemp;
}

// 转换内部数组
function unitInsideArray(array, count, length) {
  const arrayYTemp = [];
  for (let i = 0; i < array.length; i++) {
    const arrayTemp = array[i];
    const arrayXTemp = [];
    for (let j = 0; j < length; j++) {
      let value = 0;
      for (let k = 0; k < count; k++) {
        value += arrayTemp[(count * j) + k];
      }
      arrayXTemp.push(value);
    }
    arrayYTemp.push(arrayXTemp);
  }
  return arrayYTemp;
}

// 转换外部数组
function unitOutSideArray(array, count, length) {
  const arrayTrue = [];
  for (let i = 0; i < length; i++) {
    const xArrayTemp = initArray(array);
    for (let j = 0; j < count; j++) {
      const temp = array[(i * count) + j];
      for (let k = 0; k < xArrayTemp.length; k++) {
        xArrayTemp[k] += temp[k];
      }
    }
    arrayTrue.push(xArrayTemp);
  }
  return arrayTrue;
}

// 转换二维数组
export function translateArray(array, x, y, xStep, yStep) {
  const xArray = x.split(',');
  const yArray = y.split(',');
  const xMinStep = xArray[0];
  const xLimit = xArray[2];
  const yMinStep = yArray[0];
  const yLimit = yArray[2];
  const arrayYTemp = unitInsideArray(array, xStep / xMinStep, xLimit / xStep);
  const arrayTrue = unitOutSideArray(arrayYTemp, yStep / yMinStep, yLimit / yStep);
  return arrayTrue;
}

export function toArray(json, x, y) {
  const values = new Array(x);
  for (let i = 0; i < values.length; i++) {
    values[i] = new Array(y);
  }
  const objects = JSON.parse(json);
  const size = objects.length;
  if (size !== 1) {
    for (let i = 0; i < size; i++) {
      const objs = objects[i];
      const size1 = objs.length;
      for (let j = 0; j < size1; j++) {
        const val = parseInt(objs[j], 10);
        values[i][j] = val;
      }
    }
  }
  return values;
}

// 初始化热力图的数组
export function initHeatMapBaseArray(heatMapInteriorSize, heatMapExternalSize) {
  const heatMapBaseArray = new Array(heatMapExternalSize);
  for (let i = 0; i < heatMapBaseArray.length; i++) {
    heatMapBaseArray[i] = new Array(heatMapInteriorSize);
  }
  for (let i = 0; i < heatMapBaseArray.length; i++) {
    for (let j = 0; j < heatMapBaseArray[i].length; j++) {
      heatMapBaseArray[i][j] = 0;
    }
  }
  return heatMapBaseArray;
}

function getRange(array, resultDto) {
  const yUnit = resultDto.yUnit;
  const resultObj = {
    legendData: '',
    rangeArrayTemp: '',
    heatXarray: '',
    heatYarray: '',
    selectStep: '',
    totalCount: '',
    drawChart: {},
    flag: true,
  };
  let rangeTemp = '';
  if (array.length === 0) {
    rangeTemp = resultDto.range;
  } else {
    rangeTemp = array[0].range;
  }
  const rangeArrayTemp = rangeTemp.split('|');
  resultObj.rangeArrayTemp = rangeArrayTemp;
  if (rangeArrayTemp.length > 1) {
    const rangeA = rangeArrayTemp[0].split(',');
    const rangeB = rangeArrayTemp[1].split(',');
    const heatXarray = [];
    const heatYarray = [];
    let size1 = 0;
    let size2 = 0;
    if (yUnit === 'Nm') {
      size1 = parseInt(rangeA[2], 10) / 250;
      size2 = parseInt(rangeB[2], 10) / 25;
      for (let i = 0; i < size1; i++) {
        heatXarray.push((i + 1) * 250);
      }
      for (let i = 0; i < size2; i++) {
        heatYarray.push((i + 1) * 25);
      }
    } else {
      size1 = parseInt(rangeA[2], 10) / 250;
      size2 = parseInt(rangeB[2], 10) / 10;
      for (let i = 0; i < size1; i++) {
        heatXarray.push((i + 1) * 250);
      }
      for (let i = 0; i < size2; i++) {
        heatYarray.push((i + 1) * 10);
      }
    }
    resultObj.heatXarray = heatXarray;
    resultObj.heatYarray = heatYarray;
  } else if (rangeArrayTemp.length === 1) {
    const rangeArray = rangeArrayTemp[0].split(',');
    const minStep = rangeArray[0];
    const startStep = rangeArray[1];
    const selectStep = rangeArray[0];
    resultObj.selectStep = selectStep;
    let limit = '';
    // if (startStep < 0) {
    //   limit = parseInt(rangeArray[2], 10) - parseInt(startStep, 10);
    // } else {
    //   limit = rangeArray[2];
    // }
    limit = parseInt(rangeArray[2], 10) - parseInt(startStep, 10);
    const size = limit / selectStep;
    const totalCount = selectStep / minStep;
    resultObj.totalCount = totalCount;
    const xValue = [];
    if (startStep < 0) {
      for (let i = 0; i < size; i++) {
        xValue[i] = (parseInt(startStep, 10)) + parseInt(selectStep * (i + 1), 10);
      }
    } else {
      for (let i = 0; i < size; i++) {
        xValue[i] = parseInt(startStep, 10) + (selectStep * (i + 1));
      }
    }
    resultObj.legendData = xValue;
  }
  return resultObj;
}

export function drawCharts(response, charts, index, beginAt, endAt) {
  let resultObj = {};
  const data = response.data.resultData;
  const resultDto = response.data.resultDto;
  const chartName = charts[index].chartName;
  const id = charts[index].id;
  const type = resultDto.type;
  const yName = resultDto.yUnit;
  const xName = resultDto.xUnit;
  const sort = resultDto.sort;
  const pretreatment = resultDto.pretreatment;
  if (data.length === 0) {
    resultObj.flag = false;
  }
  let legendData = [];
  let yData = [];
  if (pretreatment === 'Distribute') {
    if (data.length === 0) {
      data[0] = resultDto;
    }
    resultObj = getRange(data, resultDto);
    legendData = resultObj.legendData;
    yData = coverageDistribute(data, 0, 0, true);
    const shadowData = [];
    const maxY = parseFloat(Math.max.apply(null, yData));
    legendData.forEach(() => shadowData.push(maxY));
    const obj = {
      legendData: legendData,
      yData: yData,
      type: type,
      yName: yName,
      xName: xName,
      chartName: chartName,
      id: id,
      sort: sort,
      shadowData: shadowData,
    };
    resultObj.drawChart = obj;
  } else if (pretreatment === 'Max_Diff' || pretreatment === 'Idle'
    || pretreatment === 'Scale' || pretreatment === 'Scale_Distribution'
    || pretreatment === 'Avg'
    || pretreatment === 'Scale_Multiply') {
    const bdTime = new Date(beginAt).getTime();
    const beTime = new Date(endAt).getTime();
    const timeDiff = beTime - bdTime;
    if ((timeDiff / (24 * 60 * 60 * 1000)) > 30) {
      legendData = getMonthRange(beginAt, endAt);
      if (pretreatment === 'Scale_Distribution' || pretreatment === 'Scale' || pretreatment === 'Avg') {
        yData = coverageMonthSpecial(legendData, data);
      } else {
        yData = coverageMonth(legendData, data);
      }
    } else if ((timeDiff / (24 * 60 * 60 * 1000)) <= 30) {
      legendData = getDayRange(beginAt, endAt);
      if (pretreatment === 'Scale_Distribution' || pretreatment === 'Avg') {
        yData = coverageDaySpecial(legendData, data);
      } else {
        yData = coverageDay(legendData, data);
      }
    }
    const shadowData = [];
    const maxY = parseFloat(Math.max.apply(null, yData));
    legendData.forEach(() => shadowData.push(maxY));
    const obj = {
      legendData: legendData,
      yData: yData,
      type: type,
      yName: yName,
      xName: xName,
      chartName: chartName,
      id: id,
      sort: sort,
      shadowData: shadowData,
    };
    resultObj.drawChart = obj;
  } else if (pretreatment === 'Profile') {
    const range = response.data.resultDto.range;
    const yUnit = response.data.resultDto.yUnit;
    const rangeA = range.split('|')[0].split(',');
    const rangeB = range.split('|')[1].split(',');
    resultObj = getRange(data, resultDto);
    const heatMapInteriorSize = resultObj.heatXarray.length;
    const heatMapExternalSize = resultObj.heatYarray.length;
    const heatMapBaseArray = initHeatMapBaseArray(heatMapInteriorSize, heatMapExternalSize);
    const count1 = parseInt(rangeA[2], 10) / parseInt(rangeA[0], 10);
    const count2 = parseInt(rangeB[2], 10) / parseInt(rangeB[0], 10);
    let x = 0;
    let y = 0;
    if (yUnit === 'Nm') {
      x = 25;
      y = 250;
    } else {
      x = 10;
      y = 250;
    }
    const xStep = resultObj.rangeArrayTemp[1];
    const yStep = resultObj.rangeArrayTemp[0];
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].yValue !== '0' || data[i].yValue !== 0) {
        const jsonArray = toArray(data[i].yValue, count1, count2);
        const translatedArray = translateArray(jsonArray, xStep, yStep, x, y);
        for (let j = 0; j < translatedArray.length; j++) {
          const anInt = translatedArray[j];
          for (let k = 0; k < anInt.length; k++) {
            if (isNaN(anInt[k])) {
              heatMapBaseArray[k][j] += 0;
            } else {
              heatMapBaseArray[k][j] += anInt[k];
            }
          }
        }
        for (let l = 0; l < translatedArray.length; l++) {
          if (typeof (translatedArray[l]) === 'undefined') {
            count += 0;
          } else if (isNaN(translatedArray[l][0])) {
            count += 0;
          } else {
            for (let m = 0; m < translatedArray[l].length; m++) {
              count += translatedArray[l][m];
            }
          }
        }
      }
    }
    const drawObj = [];
    const precentArray = [];
    for (let n = 0; n < heatMapBaseArray.length; n++) {
      for (let o = 0; o < heatMapBaseArray[n].length; o++) {
        const obj = [];
        let precent = 0;
        obj.push(n);
        obj.push(o);
        precent = parseFloat(heatMapBaseArray[n][o]) / count;
        obj.push(precent * 100);
        precentArray.push(precent * 100);
        drawObj.push(obj);
      }
    }
    const data1 = [];
    for (let l = 0; l < drawObj.length; l++) {
      data1.push([drawObj[l][1], drawObj[l][0], drawObj[l][2].toFixed(2)]);
    }
    const heatMapDrawObj = data1;
    const obj = {
      xData: resultObj.heatXarray,
      yData: resultObj.heatYarray,
      data: heatMapDrawObj,
      type: type,
      chartName: chartName,
      id: id,
      sort: sort,
      yUnit: yUnit,
    };
    resultObj.drawChart = obj;
  }
  return resultObj;
}

export function coverageDayById(dArr, array) {
  const valArray = new Map();
  for (let i = 0; i < dArr.length; i++) {
    for (let j = 0; j < array.length; j++) {
      const id = array[j].id;
      const time = array[j].xValue;
      const value = array[j].yValue;
      valArray[id] = '';
      if (dArr[i] === time) {
        valArray[i] = (parseFloat(valArray[i]) + parseFloat(value)).toFixed(2);
      }
    }
  }
  return valArray;
}

export function drawSingleChart(data, chartName) {
  const resultObj = {};
  const resultData = data.resultData;
  const resultDto = data.resultDto;
  const beginAt = resultDto.startDate;
  const endAt = resultDto.endDate;
  const type = resultDto.type;
  const yName = resultDto.yUnit;
  const xName = resultDto.xUnit;
  const pretreatment = resultDto.pretreatment;
  if (resultData.length === 0) {
    resultObj.flag = false;
  }
  let legendData = [];
  let yData = [];
  if (pretreatment === 'Max_Diff') {
    const bdTime = new Date(beginAt).getTime();
    const beTime = new Date(endAt).getTime();
    const timeDiff = beTime - bdTime;
    if ((timeDiff / (24 * 60 * 60 * 1000)) > 30) {
      legendData = getMonthRange(beginAt, endAt);
      if (pretreatment === 'Scale_Distribution') {
        yData = coverageMonthSpecial(legendData, data);
      } else {
        yData = coverageMonth(legendData, data);
      }
    } else if ((timeDiff / (24 * 60 * 60 * 1000)) <= 30) {
      legendData = getDayRange(beginAt, endAt);
      yData = coverageDayById(legendData, resultData);
    }
    const shadowData = [];
    const maxY = parseFloat(Math.max.apply(null, yData));
    legendData.forEach(() => shadowData.push(maxY));
    const obj = {
      legendData: legendData,
      yData: yData,
      type: type,
      yName: yName,
      xName: xName,
      chartName: chartName,
      shadowData: shadowData,
    };
    resultObj.drawChart = obj;
  }

  return resultObj;
}

export function contains(arr, obj) {
  let i = arr.length;
  while (i--) {
    if (arr[i] === obj) {
      return true;
    }
  }
  return false;
}

/**
 *  barByMaxDiff
 */
const barByMaxDiff = {
  option: {
    title: {
      text: '',
    },
    tooltip: {},
    legend: {
      data: [''],
    },
    xAxis: {
      data: [],
    },
    display: true,
    yAxis: {},
    series: [
      {
        name: '',
        type: 'bar',
        data: [],
      }],
  },

  /**
   * 生成图表数据的方法
   * @param baseOption
   * @param data
   * @param vehicleMap
   * @returns {chartTemplate.bar.option|{title, tooltip, legend, xAxis, display, yAxis, series}}
   */
  generate(baseOption, data, vehicleMap) {
    const generatedOption = this.option;
    generatedOption.title.text = baseOption.title;
    generatedOption.xAxis.data = [];
    generatedOption.xAxis.name = baseOption.chartModel.xUnit;
    generatedOption.yAxis.name = baseOption.chartModel.yUnit;
    generatedOption.series = [];
    const dateMap = new Map();
    data.forEach((x) => {
      dateMap.set(x.xValue, 0);
    });
    generatedOption.xAxis.data = [...dateMap.keys()];
    generatedOption.legend.data = [...vehicleMap.values()];
    const resultMap = new Map();
    [...vehicleMap.keys()].forEach((x) => {
      resultMap.set(x, {
        name: vehicleMap.get(x),
        type: 'bar',
        data: [...dateMap.values()],
      });
    });
    data.forEach((x) => {
      const vehicleResult = resultMap.get(x.id);
      const dateArray = [...dateMap.keys()];
      for (let i = 0; i < dateArray.length; i++) {
        if (x.xValue === dateArray[i]) {
          vehicleResult.data[i] = x.yValue;
        }
      }
    });
    generatedOption.series = [...resultMap.values()];
    return generatedOption;
  },
};
/**
 *  barByDistribute
 */
const barByDistribute = {
  option: {
    title: {
      text: '',
    },
    color: ['#5793f3', '#d14a61', '#675bba'],
    tooltip: {},
    legend: {
      data: [''],
    },
    xAxis: {
      data: [],
    },
    display: true,
    yAxis: {},
    series: [
      {
        name: '',
        type: 'bar',
        data: [],
      }],
  },
  /**
   * 生成图表数据的方法
   * @param baseOption
   * @param data
   * @param vehicleMap
   * @returns {chartTemplate.bar.option|{title, tooltip, legend, xAxis, display, yAxis, series}}
   */
  generate(baseOption, data, vehicleMap) {
    const generatedOption = this.option;
    generatedOption.title.text = baseOption.title;
    generatedOption.xAxis.name = baseOption.chartModel.xUnit;
    generatedOption.yAxis.name = baseOption.chartModel.yUnit;
    const xTranslateMethod = baseOption.chartModel.translateMethod;
    generatedOption.xAxis.data = [];
    generatedOption.series = [];
    const [step, min, max] = baseOption.chartModel.chartRange.split(',').map(x => parseInt(x, 10));
    let sed = 0;
    const baseRangeArray = new Array((max - min) / step).fill(0);
    generatedOption.xAxis.data = baseRangeArray.map((x) => {
      sed += step;
      if (xTranslateMethod !== null && xTranslateMethod !== '-') {
        return sed * parseFloat(xTranslateMethod);
      }
      return sed;
    });
    generatedOption.legend.data = [...vehicleMap.values()];
    const resultMap = new Map();
    [...vehicleMap.keys()].forEach((x) => {
      resultMap.set(x, {
        name: vehicleMap.get(x),
        type: 'bar',
        data: baseRangeArray,
        sum: 0,
      });
    });
    data.forEach((x) => {
      const vehicle = resultMap.get(x.id);
      const valueArray = JSON.parse(x.yValue);
      for (let i = 0; i < valueArray.length; i++) {
        vehicle.data[i] += valueArray[i];
        vehicle.sum += valueArray[i];
      }
    });
    [...resultMap.values()].forEach((x) => {
      if (x.sum === 0) {
        x.data = 0;
      } else {
        x.data = x.data.map(y => ((y / x.sum) * 100).toFixed(2));
      }
    });
    generatedOption.series = [...resultMap.values()];
    return generatedOption;
  },
};
/**
 *  lcmDistribute
 */
const lcmDistribute = {
  option: {
    title: {
      text: '',
    },
    color: ['#5793f3', '#d14a61', '#675bba'],
    tooltip: {},
    legend: {
      data: [''],
    },
    xAxis: {
      data: [],
    },
    display: true,
    yAxis: {},
    series: [
      {
        name: '',
        type: 'bar',
        data: [],
      }],
  },
  /**
   * 生成图表数据的方法
   * @param baseOption
   * @param data
   * @param vehicleMap
   * @returns {chartTemplate.bar.option|{title, tooltip, legend, xAxis, display, yAxis, series}}
   */
  generate(baseOption, data, vehicleMap) {
    const generatedOption = this.option;
    generatedOption.title.text = baseOption.title;
    generatedOption.xAxis.name = baseOption.chartModel.xUnit;
    generatedOption.yAxis.name = baseOption.chartModel.yUnit;
    const xTranslateMethod = baseOption.chartModel.translateMethod;
    generatedOption.xAxis.data = [];
    generatedOption.series = [];
    const [step, min, max] = baseOption.chartModel.chartRange.split(',').map(x => parseInt(x, 10));
    let sed = 0;
    const baseRangeArray = new Array(((max - min) / step) + 1).fill(0);
    generatedOption.xAxis.data = baseRangeArray.map((x) => {
      sed += step;
      if (xTranslateMethod !== null && xTranslateMethod !== '-') {
        return sed * parseFloat(xTranslateMethod);
      }
      return sed;
    });
    generatedOption.legend.data = [...vehicleMap.values()];
    const resultMap = new Map();
    [...vehicleMap.keys()].forEach((x) => {
      resultMap.set(x, {
        name: vehicleMap.get(x),
        type: 'bar',
        data: baseRangeArray,
        sum: 0,
      });
    });
    data.forEach((x) => {
      const vehicle = resultMap.get(x.id);
      const valueArray = JSON.parse(x.yValue);
      for (let i = 0; i < valueArray.length; i++) {
        vehicle.data[i] += valueArray[i];
        vehicle.sum += valueArray[i];
      }
    });
    [...resultMap.values()].forEach((x) => {
      if (x.sum === 0) {
        x.data = 0;
      } else {
        // x.data = x.data.map(y => ((y / x.sum) * 100).toFixed(2));
        x.data = x.data.map(y => y.toFixed(2));
      }
    });
    generatedOption.series = [...resultMap.values()];
    return generatedOption;
  },
};
/**
 * heatmap
 */
const heatMap = {
  option: {
    title: {
      text: '',
    },
    visualMap: {
      max: 30,
      calculable: true,
      left: 'right',
      bottom: '10%',
      orient: 'vertical',
      align: 'left',
      itemHeight: 200,
      inRange: {
        color: ['#5E51A0', '#3789BB', '#6AC1A5', '#ACDCA6', '#E6F49D', '#F6F9AE', '#FDDF90', '#FBAD68', '#F26D4A', '#D34052', '#9C0943'],
        symbolSize: [120, 120],
      },
    },
    xAxis3D: {
      name: '',
      type: 'category',
      data: [],
    },
    yAxis3D: {
      name: '',
      type: 'category',
      data: [],
    },
    zAxis3D: {
      type: 'value',
    },
    grid3D: {
      boxWidth: 300,
      boxDepth: 150,
      light: {
        main: {
          intensity: 1.2,
        },
        ambient: {
          intensity: 0.3,
        },
      },
    },
    series: [],
  },
  generate(baseOption, data, vehicleMap) {
    const newDatas = [];
    [...vehicleMap.keys()].forEach((x) => {
      const newData = [];
      data.forEach((val) => {
        if (val.id === x) {
          newData.push(val);
        }
      });
      newDatas.push(newData);
    });
    const generatedOption = this.option;
    const seriesOptons = [];
    newDatas.forEach((val) => {
      if (val.length !== 0) {
        const dateArray = this.unitArray(baseOption.chartModel, val);
        generatedOption.title.text = baseOption.title;
        generatedOption.xAxis3D.data = dateArray.xAxis.data;
        generatedOption.yAxis3D.data = dateArray.yAxis.data;
        generatedOption.xAxis3D.name = baseOption.chartModel.xUnit;
        generatedOption.yAxis3D.name = baseOption.chartModel.yUnit;
        const seriesOption = {
          type: 'bar3D',
          stack: 'stack',
          data: dateArray.series[0].data,
          shading: 'color',
          label: {
            show: false,
            textStyle: {
              fontSize: 16,
              borderWidth: 1,
            },
          },
          itemStyle: {
            opacity: 0.4,
          },
          emphasis: {
            label: {
              textStyle: {
                fontSize: 20,
                color: '#900',
              },
            },
            itemStyle: {
              color: '#900',
            },
          },
        };
        // generatedOption.series.push(seriesOption);
        seriesOptons.push(seriesOption);
      }
    });
    generatedOption.series = seriesOptons;
    return generatedOption;
  },
  // 累加二维数组
  unitArray(resultDto, resultData) {
    const translatedResultDto = {
      chartName: resultDto.chartName,
      range: resultDto.chartRange,
      sort: resultDto.sort,
      xUnit: resultDto.xUnit,
      yUnit: resultDto.yUnit,
      translateMethod: resultDto.translateMethod,
      translateMethodY: resultDto.translateMethodY,
    };
    const data = {
      resultData: resultData,
      resultDto: translatedResultDto,
    };
    const chartName = resultDto.chartName;
    const option = heatMapChart(data, chartName);
    return option;
  },
};

/**
 * chart option 以及 产生图表 方法
 */
const chartTemplate = {
  bar_Max_Diff: barByMaxDiff,
  bar_Distribute: barByDistribute,
  heatmap_Profile: heatMap,
  lcm_Distribute: lcmDistribute,
};

/**
 * 方法以 [图表类型]_[预处理] 存在 chartTemplate 中
 * 从结果集中包装返回 Echarts option 对象
 * @returns {string}
 */
export function packageChart(baseOption, data, vehicleMap) {
  if (`${baseOption.pretreatment}` === 'Idle' || `${baseOption.pretreatment}` === 'Scale_Distribution' || `${baseOption.pretreatment}` === 'Scale') {
    return barByMaxDiff.generate(baseOption, data, vehicleMap);
  } else if (`${baseOption.pretreatment}` === 'Lcm_E' || `${baseOption.pretreatment}` === 'Lcm_F') {
    return lcmDistribute.generate(baseOption, data, vehicleMap);
  }
  return chartTemplate[`${baseOption.type}_${baseOption.pretreatment}`].generate(baseOption, data, vehicleMap);
}
