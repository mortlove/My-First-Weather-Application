import fetch from 'node-fetch';

const list = async (data) => {
  const elements = [...data].sort((a, b) => b.temperatura - a.temperatura);
  console.log('\nList of most popular cities in Poland. From warmer place to the coldest. Check it out!\n');

  for (const element of elements) {
    const city = element.stacja;
    const temp = element.temperatura;
    console.log(`City: ${city}, Temperature: ${temp}`);
  }
};

const coldestPlacePoland = async (data) => {
  const sorted = [...data].sort((a, b) => {
    if (Number(a.temperatura) > Number(b.temperatura)) {
      return 1;
    }
    if (Number(b.temperatura) > Number(a.temperatura)) {
      return -1;
    }
    return 0;
  });
  const {
    stacja: station,
    temperatura: temperature,
  } = sorted[0];
  console.log(`Coldest place in Poland: ${station} ${temperature}`);
};

const warmestPlacePoland = async (data) => {
  const sorted = [...data].sort((a, b) => {
    if (Number(b.temperatura) > Number(a.temperatura)) {
      return 1;
    }
    if (Number(a.temperatura) > Number(b.temperatura)) {
      return -1;
    }
    return 0;
  });

  const {
    stacja: station,
    temperatura: temperature,

  } = sorted[0];
  console.log(`\nWarmest place in Poland: ${station} ${temperature}`);
};

(async () => {
  try {
    const response = await fetch('https://danepubliczne.imgw.pl/api/data/synop');
    const data = await response.json();
    await list(data);
    setTimeout(() => {
      warmestPlacePoland(data);
      coldestPlacePoland(data);
    }, 1000);
  } catch (err) {
    console.error(`There is an ERROR :(! ${err}`);
  }
})();
