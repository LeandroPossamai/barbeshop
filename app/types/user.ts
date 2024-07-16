type BaseUser = {
  id: string;
  name: string;
  email: string;
};

type Barber = BaseUser & {
  schedule: any;
  schedules: any[];
  role: "Barber";
};

type BarberShop = BaseUser & {
  barbers: Barber[];
  role: "Barber Shop";
};

export type User = Barber | BarberShop;
