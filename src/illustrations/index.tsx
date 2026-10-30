import type { ComponentType } from 'react';
import type { IllustrationKey } from '../data/types';
import {
  AirportCheckin,
  Breakfast,
  CheckinCounter,
  Checkout,
  Hotel,
  Immigration,
  PlaneLanding,
  PlaneTakeoff,
  Skyliner,
  Souvenir,
  Taxi,
} from './travel';
import { Crab, CrabHotpot, Gyutan, Sashimi, Sushi } from './food';
import { Ameyoko, Hachiko, NeonNight, Parco, RooftopPark, Shibuya109, StreetShopping } from './city';
import { Ginkgo, Kimono, Torii, UenoPark, YanakaCat } from './nature';

/** 插畫註冊表：key 與 IllustrationKey 一一對應（TypeScript 會檢查缺漏） */
export const illustrations: Record<IllustrationKey, ComponentType> = {
  airportCheckin: AirportCheckin,
  planeTakeoff: PlaneTakeoff,
  planeLanding: PlaneLanding,
  immigration: Immigration,
  taxi: Taxi,
  hotel: Hotel,
  breakfast: Breakfast,
  kimono: Kimono,
  crab: Crab,
  ginkgo: Ginkgo,
  gyutan: Gyutan,
  neonNight: NeonNight,
  hachiko: Hachiko,
  shibuya109: Shibuya109,
  sushi: Sushi,
  parco: Parco,
  streetShopping: StreetShopping,
  rooftopPark: RooftopPark,
  sashimi: Sashimi,
  checkout: Checkout,
  torii: Torii,
  yanakaCat: YanakaCat,
  crabHotpot: CrabHotpot,
  uenoPark: UenoPark,
  ameyoko: Ameyoko,
  skyliner: Skyliner,
  souvenir: Souvenir,
  checkinCounter: CheckinCounter,
};

export function Illustration({ name }: { name: IllustrationKey }) {
  const Cmp = illustrations[name];
  return <Cmp />;
}

export { C } from './base';
