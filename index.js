import fetch from 'node-fetch';
import { existsSync } from 'fs';
import { appendFile, mkdir } from 'node:fs/promises';
import { normalize, resolve } from 'path';

const cityName = process.argv[2];
const DIR_PATH = './data/';

function safeJoin(base, target) {
  const targerPath = `.${normalize(`/${target}`)}`;
  return resolve(base, targerPath);
}

const getDataFileName = (city) => safeJoin(DIR_PATH, `${city}.txt`);

(async () => {
  try {
    if (existsSync(DIR_PATH)) {
    } else {
      await mkdir(DIR_PATH);
      console.log('Directory created!');
    }
  } catch (error) {
    console.log('Oh no there is an ERROR:', error);
  }
})();

const getWeatherData = async (data) => {
  const dataFound = data.find((stationData) => stationData.stacja === cityName);

  if (!dataFound) {
    throw new Error('Can\'t find that City info');
  }

  const {
    cisnienie: pressure, temperatura: temp, wilgotnosc_wzgledna:
      humidity,
  } = dataFound;

  const weatherInfo = `Basic Weather info from city ${cityName}:\nPressure: ${pressure}hPa, Temperature: ${temp}°C, Humidity: ${humidity}%\n`;

  console.log(weatherInfo);

  const dateTimeString = new Date().toLocaleDateString();

  await appendFile(getDataFileName(cityName), `${dateTimeString}\n${weatherInfo}\n`);
};

fetch('https://danepubliczne.imgw.pl/api/data/synop')
  .then((response) => response.json())
  .then(getWeatherData);
