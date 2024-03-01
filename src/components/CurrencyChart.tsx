import React, { useState, useEffect } from 'react';
import { ReactECharts } from '../Echarts/ReactECharts.tsx';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';
import { ChoiceCurrency } from './ChoiceCurrency.tsx';
import ExchangeData, { CurrencyData } from '../data/data.ts';
import { ChartOptions } from '../Echarts/ChartOptions.tsx'

//Состояния данных о курсах валют
const CurrencyChart: React.FC = () => {
  const [currency, setCurrency] = useState<'Курс доллара' | 'Курс евро' | 'Курс юаня'>('Курс доллара');
  const [data, setData] = useState<CurrencyData[]>([]);
  const [usdData, setUSDData] = useState<CurrencyData[]>([]);
  const [eurData, setEURData] = useState<CurrencyData[]>([]);
  const [cnyData, setCNYData] = useState<CurrencyData[]>([]);

const options = ChartOptions(currency, usdData, eurData, cnyData);

//Состояние для среднего значения
  const [average, setAverage] = useState<number | null>(null);

  useEffect(() => {
    setData(ExchangeData);
  }, []);

//Фильтрация данных о курсах валют
  useEffect(() => {
    if (data.length > 0) {
      setUSDData(data.filter(item => item.indicator === 'Курс доллара'));
      setEURData(data.filter(item => item.indicator === 'Курс евро'));
      setCNYData(data.filter(item => item.indicator === 'Курс юаня'));
    }
  }, [data]);

//Вычисление среднего значения курса валюты при изменении выбранной валюты
  useEffect(() => {
    const currentData = currency === 'Курс доллара' ? usdData :
                       currency === 'Курс евро' ? eurData :
                       cnyData;
    const sum = currentData.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);
    const avg = sum / currentData.length;
    setAverage(avg);
  }, [currency, usdData, eurData, cnyData]);

  const handleCurrencyChange = (selectedCurrency: 'Курс доллара' | 'Курс евро' | 'Курс юаня') => {
    setCurrency(selectedCurrency);
  };

//Верстка приложения
  return (
    <Theme preset={presetGpnDefault}>
      <div className="main-container">
        <div className="inside-container">
        {/* Контейнер для надписи в левой верхней части */}
          <div className="cur-letter-container">
            <h2>{`${currency.toUpperCase()}, ${currency === 'Курс доллара' ? '$/₽' :
              currency === 'Курс евро' ? '€/₽' :
              currency === 'Курс юаня' ? '¥/₽' : '₽'}`}</h2>
          </div>
        {/* Конпки выбора валюты */}
          <div className="button-container">
            <ChoiceCurrency onChange={handleCurrencyChange} />
          </div>
        </div>
        {/* Контейнер графика со внешними настройками */}
        <div id="chart-container">
          <ReactECharts option={options}/>
        </div>
        {/* Среднее за период */}
        <div className="mean-container">
          <p className="mean-letter">Среднее за период</p>
          <p className="average-meaning">{`${average !== null ? average.toFixed(1): 'N/A'}`}</p>
          <p className="ruble-symbol">₽</p>
        </div>
      </div>
    </Theme>
  );
};

export default CurrencyChart;

