export const cities = [`Amsterdam`, `Chamonix`, `Geneva`, `Rome`, `London`];
export const TypeTitle = {
  MOVINGS: [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`],
  ARRIVALS: [`check-in`, `sightseeing`, `restaurant`],
};

export const getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
};

const getRandomArrayElement = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

const shuffleArray = (array, min, max) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array.slice(0, getRandomNumber(min, max));
};

const getRandomBoolean = () => {
  return Boolean(getRandomNumber(0, 1));
};

export const formatDate = (time, format) => {
  const eventDate = new Date(time);
  const monthNames = [
    `JAN`,
    `FEB`,
    `MAR`,
    `APR`,
    `MAY`,
    `JUNE`,
    `JULY`,
    `AUG`,
    `SEP`,
    `OCT`,
    `NOV`,
    `DEC`];
  let hour = eventDate.getHours();
  let minute = eventDate.getMinutes();
  let month = eventDate.getMonth();
  minute = minute < 10 ? `0` + minute : minute;
  hour = hour < 10 ? `0` + hour : hour;
  const formatedDate = format
  .replace(`DAY`, eventDate.getDate())
  .replace(`MONTH`, (month = month < 10 ? `0` + month : month))
  .replace(`NAME`, monthNames[eventDate.getMonth()])
  .replace(`YEAR`, eventDate.getFullYear().toString().substr(-2))
  .replace(`HOUR`, hour)
  .replace(`MINUTE`, minute);
  return formatedDate;
};

export const getDuration = (time) => {
  const eventStart = new Date(time.start);
  const eventEnd = new Date(time.end);
  const duration = eventEnd - eventStart;
  if (eventEnd.getDate() > eventStart.getDate()) {
    return formatDate(duration, `DAY\D\ HOUR\H\ MINUTE\M`);
  } else if (eventEnd.getHours() > eventStart.getHours()) {
    return formatDate(duration, `HOUR\H\ MINUTE\M`);
  } else {
    return formatDate(duration, `MINUTE\M`);
  }
};

export const formatTitle = (string) => {
  return string.replace(string[0], string[0].toUpperCase());
};

export const getOffersChecked = (array) => {
  const offersChecked = array.filter((item) => item.checked);
  return shuffleArray(offersChecked, 0, 2);
};

export const getRandomCity = getRandomArrayElement(cities);


export const offers = [
  {
    name: `luggage`,
    title: `Add luggage`,
    price: 10,
  },
  {
    name: `comfort`,
    title: `Switch to comfort class`,
    price: 150,
  },
  {
    name: `meal`,
    title: `Add meal`,
    price: 2,
  },
  {
    name: `seats`,
    title: `Choose seats`,
    price: 9,
  },
];

export const getDestinationTitle = (event) => {
  if (TypeTitle.MOVINGS.includes(event.type.title)) {
    return formatTitle(event.type.title) + ` to `;
  }
    return formatTitle(event.type.title) + ` in `;
};

const getEventRandom = () => ({
  type: getRandomArrayElement([
    {
      title: `taxi`,
      icon: `/img/icons/taxi.png`,
    },
    {
      title: `bus`,
      icon: `/img/icons/bus.png`,
    },
    {
      title: `check-in`,
      icon: `/img/icons/check-in.png`,
    },
    {
      title: `drive`,
      icon: `/img/icons/drive.png`,
    },
    {
      title: `flight`,
      icon: `/img/icons/flight.png`,
    },
    {
      title: `restaurant`,
      icon: `/img/icons/restaurant.png`,
    },
    {
      title: `ship`,
      icon: `/img/icons/ship.png`,
    },
    {
      title: `sightseeing`,
      icon: `/img/icons/sightseeing.png`,
    },
    {
      title: `train`,
      icon: `/img/icons/train.png`,
    },
  ]),
  destination: getRandomArrayElement(cities),
  date: Date.now(),
  time: {
    start: Date.now() + getRandomNumber(1, 2) * 24 * 60 * 60 * 1000 + getRandomNumber(0, 5) * 60 * 60 * 1000,
    end: Date.now() + getRandomNumber(2, 3) * 24 * 60 * 60 * 1000 + getRandomNumber(1, 5) * 60 * 60 * 1000 + getRandomNumber(10, 20) * 60 * 1000,
  },
  price: getRandomNumber(20, 100),
  offer: getOffersChecked([
    {
      name: `luggage`,
      title: `Add luggage`,
      price: 10,
      checked: getRandomBoolean(),
    },
    {
      name: `comfort`,
      title: `Switch to comfort class`,
      price: 150,
      checked: getRandomBoolean(),
    },
    {
      name: `meal`,
      title: `Add meal`,
      price: 2,
      checked: getRandomBoolean(),
    },
    {
      name: `seats`,
      title: `Choose seats`,
      price: 9,
      checked: getRandomBoolean(),
    },
  ]),
  description: shuffleArray([
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `,
    `Cras aliquet varius magna, non porta ligula feugiat eget. `,
    `Fusce tristique felis at fermentum pharetra. `,
    `Aliquam id orci ut lectus varius viverra. `,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. `,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. `,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. `,
    `Sed sed nisi sed augue convallis suscipit in sed felis. `,
    `Aliquam erat volutpat. `,
    `Nunc fermentum tortor ac porta dapibus. `,
    `In rutrum ac purus sit amet tempus. `,
  ], 1, 3),
  favorite: getRandomBoolean(),
});

export const getEventArray = (count) => new Array(count)
  .fill(``)
  .map(getEventRandom)
  .sort((a, b) => a.time.start - b.time.start)

export const getDaysTrip = (eventsList) => {
  const datesEventStart = eventsList.map((eventItem) => eventItem.time.start);
  const getUniqueDays = () => {
    const dateToString = datesEventStart.map((dateItem) => formatDate(dateItem, `DAY`) + ` ` + formatDate(dateItem, `NAME`) + ` ` + formatDate(dateItem, `YEAR`));
    const newArray = dateToString.reduce((accumulator, currentValue) => {
      if (accumulator.includes(currentValue)) {
        return accumulator;
      } else {
        accumulator.push(currentValue);
        return accumulator;
      }
    }, []);
    return newArray;
  };

  return getUniqueDays();
};

export const isFavorite = (event) => {
  return event.favorite === true;
};

const isFuture = (event) => {
  return event.time.start > Date.now();
};

const isPast = (event) => {
  return event.time.start > Date.now();
};

export const getFilters = (events) => {
  return [
    {
      title: `everything`,
      count: events.length,
    },
    {
      title: `future`,
      count: events.filter(isFuture),
    },
    {
      title: `past`,
      count: events.filter(isPast),
    },
  ];
};
