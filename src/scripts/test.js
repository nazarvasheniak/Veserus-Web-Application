$('ul.tabs3 li').on('click', function() {
    if ($('.depth-chart-block:visible').length == 0) {
        $('.charts-box').css('height', '366px');
        $('.open-orders').css('top', '504px');
    } else {
        $('.charts-box').css('height', '471px');
        $('.open-orders').css('top', '609px');
    }
})

var convertToGraphData = function(data) {
    var convertedData = [];
    for (var key in data) {
        var point = {
            x: Number(key),
            y: data[key]
        };
        convertedData.push(point);
    }
    convertedData.sort(function(first, second) {
        return first.x - second.x;
    });
    return convertedData;
}

var getBestAsk = function(data) {
    var best = Number(data[0][0]);
    var val;
    data.forEach(function(el) {
        val = Number(el[0]);
        if (el[0] < best) {
            best = el[0];
        }
    });
    return best;
}

var getBestBid = function(data) {
    var best = Number(data[0][0]);
    var val;
    data.forEach(function(el) {
        val = Number(el[0]);
        if (val > best) {
            best = val;
        }
    });
    return best;
}

var updateMainData = function(updatedElem) {
    var type;
    var finded = false;
    if (updatedElem[0] == 'buy') {
        type = 'bids';
    }
    if (updatedElem[0] == 'sell') {
        type = 'asks';
    }

    var val = Number.parseFloat(updatedElem[1]);


    for (var i = 0; i < mainData[type].length; i++) {
        el = mainData[type][i];
        if (Number.parseFloat(el[0]) == val) {
            mainData[type][i][1] = updatedElem[2];
            finded = true;
            return true;
        }
    }
    mainData[type].push(
        [
            Number.parseFloat(updatedElem[1]),
            updatedElem[2]
        ]
    );
    return false;
    // mainData[type].forEach(function(el, index){
    //     if(Number(el[0]) == val){
    //         mainData[type][index] = updatedElem[2];
    //         finded = true;
    //     }
    // });
}


var updateGrapgh = function() {
    var data = mainData;
    var dataDepthBids = {};
    var summBids = 0;

    data.bids.sort(function(first, second) {
        return Number.parseFloat(second[0]) - Number.parseFloat(first[0]);
    });
    data.bids.forEach(function(el) {
        if (el[0] > minAxisExtr && el[0] < maxAxisExtr) {
            summBids += Number.parseFloat(el[1]);
            dataDepthBids[el[0]] = summBids;
        }
    });
    chartBidsData = convertToGraphData(dataDepthBids);

    //формирование правого графика
    var dataDepthAsks = {};
    var summAsks = 0;
    data.asks.sort(function(first, second) {
        return Number.parseFloat(first[0]) - Number.parseFloat(second[0]);
    });
    data.asks.forEach(function(el) {
        if (el[0] > (midPrice - 2000) && el[0] < (midPrice + 2000)) {
            summAsks += Number.parseFloat(el[1]);
            dataDepthAsks[el[0]] = summAsks;
        }
    });
    chartAsksData = convertToGraphData(dataDepthAsks);

    if ($('.depth-chart-block:visible').length != 0) {
        curMinAxisExtr = midPrice - offsetAxisExtr + (zoom * stepZoom);
        curMaxAxisExtr = midPrice + offsetAxisExtr - (zoom * stepZoom);
        depthChart.xAxis[0].setExtremes(curMinAxisExtr, curMaxAxisExtr, false);
        depthChart.xAxis[0].options.plotLines[0].value = midPrice;
        depthChart.series[0].setData(chartAsksData, true);
        depthChart.series[1].setData(chartBidsData, true);
    }
}



// Depth chart
var depthChart;
var bids = [];
var asks = [];

var requestData = function(point, side) {

    if (side == 'bids') {
        // var series = depthChart.series[1];
        // series.addPoint([point[0], point[1]], true);
        // series.data[0].remove(false,false);
    } else if (side == 'asks') {
        // var series = depthChart.series[0];
        // series.addPoint([point[0], point[1]], true);
        // series.data[0].remove(false,false);
    }
}

var isFirst = false;

var websocketurl = "wss://ws-feed.gdax.com";

// GDAX WebSocket object
socket = new WebSocket(websocketurl);

// On open WebSocket connection event
socket.onopen = function() {
    socket.send('{ "type": "subscribe", "product_ids": ["BTC-USD"], "channels": ["level2", "heartbeat", { "name": "ticker", "product_ids": ["BTC-USD"] }] }');
};

// On close WebSocket connection event
socket.onclose = function() {

};
var k = 0;
var midPrice;
var minAxisExtr;
var maxAxisExtr;
var curMinAxisExtr;
var curMaxAxisExtr;
var stepZoom = 200;
var zoom = 3;
var mainData;
var offsetAxisExtr = 2000;
var midPriceBlock = $('#depth_chart_mid_price');

// Event when WebSocket receive message
socket.onmessage = function(message) {
    var data = JSON.parse(message.data);

    if (data.type == 'l2update') {

        var res = updateMainData(data.changes[0]);
        //console.log(res);

        if (!res) {
            //console.log(Number.parseFloat(data.changes[0][1]));
            //console.log(data.changes[0]);
        }
    }

    if (data.type == 'ticker') {
        midPrice = (Number(data.best_ask) + Number(data.best_bid)) / 2;
        midPriceBlock.text(midPrice.toFixed(3));

        minAxisExtr = midPrice - offsetAxisExtr;
        maxAxisExtr = midPrice + offsetAxisExtr;
        //console.log(midPrice);
    }

    if (data.type == 'snapshot') {
        mainData = data;
        var bestBid = getBestBid(data.bids);
        var bestAsk = getBestAsk(data.asks);
        midPrice = (bestAsk + bestBid) / 2;
        midPriceBlock.text(midPrice.toFixed(3));

        minAxisExtr = midPrice - offsetAxisExtr;
        curMinAxisExtr = minAxisExtr;
        maxAxisExtr = midPrice + offsetAxisExtr;
        curMaxAxisExtr = maxAxisExtr;

        //формирование левого графика
        var dataDepthBids = {};
        var summBids = 0;
        data.bids.forEach(function(el) {
            if (el[0] > minAxisExtr && el[0] < maxAxisExtr) {
                summBids += Number(el[1]);
                dataDepthBids[el[0]] = summBids;
            }
        });
        chartBidsData = convertToGraphData(dataDepthBids);

        //формирование правого графика
        var dataDepthAsks = {};
        var summAsks = 0;
        data.asks.forEach(function(el) {
            if (el[0] > (midPrice - 2000) && el[0] < (midPrice + 2000)) {
                summAsks += Number(el[1]);
                dataDepthAsks[el[0]] = summAsks;
            }
        });
        chartAsksData = convertToGraphData(dataDepthAsks);


        var chartData = {
            asks: chartAsksData,
            bids: chartBidsData
        };

        initChart(chartData);
    }

};

var initChart = function(data) {

    var asks = data.asks;
    var bids = data.bids;

    // Depth chart initialize
    depthChart = new Highcharts.chart({
        chart: {
            renderTo: 'depth-chart-box',
            animation: Highcharts.svg,
            type: 'area',
            events: {
                load: requestData
            },
            marginRight: 25,
            borderWidth: 0
        },
        colorAxis: {
            gridLineColor: '#1b2035'
        },
        title: false,
        subtitle: {
            text: ''
        },
        xAxis: [{
                plotLines: [{
                    color: '#4a5375',
                    width: 2,
                    top: 30,
                    value: 5.5
                }],
                title: false,
                tickWidth: 0,
                gridLineColor: '#1b2035',
                minorGridLineColor: '#1b2035',
                lineColor: '#1b2035'
            },
            {
                labels: {
                    formatter: function() {
                        return this.value; // clean, unformatted number for year
                    },
                    style: {
                        color: '#475a80',
                        fontSize: '14px'
                    }
                },
                gridLineColor: '#1b2035',
                minorGridLineColor: '#1b2035',
                lineColor: '#1b2035',
                title: false
            }
        ],
        yAxis: [{
                title: false,
                max: 4000,
                labels: false,
                gridLineColor: '#1b2035',
                minorGridLineColor: '#1b2035',
                lineColor: '#1b2035',
                lineWidth: 0
            },
            {
                title: false,
                linkedTo: 0,
                opposite: true,
                labels: {
                    align: 'right',
                    x: 25,
                    style: {
                        color: '#fff',
                        fontSize: '12px'
                    },
                    lineWidth: 0
                },
                gridLineColor: '#1b2035',
                minorGridLineColor: '#1b2035',
                lineColor: '#1b2035',
                lineWidth: 0
            }
        ],
        legend: false,
        tooltip: {
            headerFormat: '',
            backgroundColor: '#242d53',
            borderRadius: 2,
            borderWidth: 0,
            pointFormatter: function(arg1, arg2) {
                var fti = 'Can be sold';
                if (this.x > midPrice) {
                    fti = 'Can be bought';
                }
                console.log(arg1);
                var string =
                    '<div class="f_h">' + Highcharts.numberFormat(this.x, 2) + ' USD</div>' +
                    '<div class="t_i">' +
                    '<div class="f_t_i"><div class="t_h">' + fti + ':</div><div class="t_v">' + parseFloat(this.y.toFixed(8)) + '</div></div>' +
                    '<div><div class="t_h">For a total of:</div><div class="t_v">' + Highcharts.numberFormat(this.x * this.y, 2) + ' USD</div></div>' +
                    '</div>';
                return string;
            },
            style: {
                color: '#ffffff',
            },
            useHTML: true
        },
        // tooltip: {
        //     useHTML: true,
        //     //valueSuffix: '',
        //     //headerFormat: ``,
        //     //footerFormat: '</table>',
        //     fillColor: '#202639',
        //     // positioner: function () {
        //     //     return { x: 45, y: 278 };
        //     // },
        // },
        plotOptions: {
            area: {
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            },
            series: {
                turboThreshold: 10000,
                showInNavigator: true
            }
        },
        series: [{
                name: 'ask',
                data: asks
            },
            {
                name: 'bid',
                data: bids
            }
        ]
    });
    if ($('.depth-chart-block:visible').length != 0) {
        depthChart.xAxis[0].setExtremes(bids[0].x, asks[asks.length - 1].x, false);
        depthChart.xAxis[0].options.plotLines[0].value = midPrice;
        //depthChart.yAxis[0].setExtremes(10000,0, false);
    }

    $('#depth_minus').on('click', function() {
        if (curMaxAxisExtr < maxAxisExtr && curMinAxisExtr > minAxisExtr) {
            curMaxAxisExtr += stepZoom;
            curMinAxisExtr -= stepZoom;
            depthChart.xAxis[0].setExtremes(curMinAxisExtr, curMaxAxisExtr, true, false);
            zoom--;
        }
    });
    $('#depth_plus').on('click', function() {
        if (curMaxAxisExtr - stepZoom > midPrice && curMinAxisExtr + stepZoom < midPrice) {
            curMaxAxisExtr -= stepZoom;
            curMinAxisExtr += stepZoom;
            depthChart.xAxis[0].setExtremes(curMinAxisExtr, curMaxAxisExtr, true, false);
            zoom++;
        }
    });

    setInterval(updateGrapgh, 1000);

    function updatePaddingChart(e) {
        if (document.body.clientWidth > 1100) {
            depthChart.update({
                chart: {
                    marginRight: 25,
                    marginLeft: 0
                }
            });
        } else if (document.body.clientWidth <= 1100) {
            depthChart.update({
                chart: {
                    marginRight: 25,
                    marginLeft: 0
                }
            });
        }
    }
    updatePaddingChart();

    $(window).on('resize', updatePaddingChart);
    $('ul.tabs3').delegate('li:not(.current)', 'click', function() {
        depthChart.reflow();
    });
}