const trips = [
  {
    id: 1,
    date: 'Hoje',
    score: 7.2,
    distance: '50km',
    from: 'Av. Paulista, São Paulo',
    to: 'Av. Bela Vista, São Paulo',
  },
  {
    id: 2,
    date: 'Ontem',
    score: 8.3,
    distance: '30km',
    from: 'Av. 23 de Maio, São Paulo',
    to: 'Av. Marginal Tietê  São Paulo',
  },
];

const drivingData = [
  {
    id: 1,
    status: 'pessímo',
    action: 'freio',
    icon: require('../assets/images/Icon/BreakingBad.png'),
  },
  {
    id: 2,
    status: 'razoável',
    action: 'velocidade',
    icon: require('../assets/images/Icon/SpeedingFair.png'),
  },
  {
    id: 3,
    status: 'bom',
    action: 'freio',
    icon: require('../assets/images/Icon/BreakingGood.png'),
  },
];

const location = {
  latitude: -23.5686879,
  longitude: -46.647775,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
}

export { trips, drivingData, location };