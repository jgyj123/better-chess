import {
  calculateDrawEloChange,
  calculateEloChange,
  secondToMinutes,
} from "../../Game";

it("Calculates elo change correctly for decisive results", () => {
  expect(calculateEloChange(1800, 1800)).toStrictEqual(10);
  expect(calculateEloChange(2000, 1800)).toStrictEqual(4);
  expect(calculateEloChange(1579, 1334)).toStrictEqual(3);
  expect(calculateEloChange(1203, 3000)).toStrictEqual(19);
});

it("Calculates Elo Change Correctly in tied results", () => {
  expect(calculateDrawEloChange(1203, 3000)).toStrictEqual(9);
  expect(calculateDrawEloChange(1800, 1800)).toStrictEqual(0);
  expect(calculateDrawEloChange(450, 1002)).toStrictEqual(9);
  expect(calculateDrawEloChange(1800, 1304)).toStrictEqual(-8);
});

it("Displays clock time in string format correctly", () => {
  expect(secondToMinutes(60)).toStrictEqual("1:00");
  expect(secondToMinutes(600)).toStrictEqual("10:00");
  expect(secondToMinutes(122)).toStrictEqual("2:02");
  expect(secondToMinutes(80)).toStrictEqual("1:20");
});
