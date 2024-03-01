export const ChartOptions = (currency: string, usdData: any[], eurData: any[], cnyData: any[]) => {
    return {
        tooltip: {
            trigger: 'axis',
            formatter: (params: any) => {
                const dataIndex = params[0]?.dataIndex;
                const date = dataIndex !== undefined ? usdData[dataIndex]?.month : '';
                const value = dataIndex !== undefined ? usdData[dataIndex]?.value : '';
                const formattedDate = `<span class="bold">${date}</span>`;
                const currencyDot = `<span class="dot">&#9679;</span> ${currency}`;
                const formattedValue = `<span class="value">${value} ${currency === 'Курс доллара' ? '₽' :
                    currency === 'Курс евро' ? '₽' :
                    currency === 'Курс юаня' ? '₽' : '₽'}</span>`;
                return `${formattedDate}<br />${currencyDot}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${formattedValue}`;
            },
        },
        xAxis: {
            type: 'category',
            data: currency === 'Курс доллара' ? usdData.map(item => item.month) :
                  currency === 'Курс евро' ? eurData.map(item => item.month) :
                  currency === 'Курс юаня' ? cnyData.map(item => item.month) : [],
            boundaryGap: false,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
            },
        },
      
        yAxis: {
            type: 'value',
            min: currency === 'Курс доллара' ? 72 :
                 currency === 'Курс евро' ? 86 :
                 currency === 'Курс юаня' ? 18 : 0,
            max: currency === 'Курс доллара' ? 84 :
                 currency === 'Курс евро' ? 94 :
                 currency === 'Курс юаня' ? 26 : 100,
            interval: currency === 'Курс доллара' ? 3 :
                      currency === 'Курс евро' ? 2 :
                      currency === 'Курс юаня' ? 2 : 3,
            axisLabel: {
              showMinLabel: false,
              margin: 15,
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
              },
            },
        },
        series: [
            {
              data: currency === 'Курс доллара' ? usdData.map(item => item.value) :
                    currency === 'Курс евро' ? eurData.map(item => item.value) :
                    currency === 'Курс юаня' ? cnyData.map(item => item.value) : [],
              type: 'line',
              smooth: false,
              color: 'orange',
              showSymbol: false,
              symbolSize: 0,
            },
        ],
    };
};