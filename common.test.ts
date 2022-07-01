export {}

import { colorForValue, colorsWithThresholdFor } from './common'
import { Entry } from './models'

const colors: { [key: number]: string } = {
  100: "Color2",
  0: "Color1"
}

test('run color selector', () => {
  expect(colorForValue(0, colors)).toBe("Color1");
});

test('run reading habit test', () => {
  const habitColors: { [key: number]: string } = {
    60: "#c6e48b",
    75: "#7bc96f",
    90: "#49af5d",
    105: "#2e8840",
    120: "#196127"
  }
  expect(colorForValue(0, habitColors)).toBe("#c6e48b")
  expect(colorForValue(60, habitColors)).toBe("#c6e48b")
  expect(colorForValue(61, habitColors)).toBe("#7bc96f")
  expect(colorForValue(75, habitColors)).toBe("#7bc96f")
  expect(colorForValue(76, habitColors)).toBe("#49af5d")
  expect(colorForValue(90, habitColors)).toBe("#49af5d")
  expect(colorForValue(91, habitColors)).toBe("#2e8840")
  expect(colorForValue(105, habitColors)).toBe("#2e8840")
  expect(colorForValue(106, habitColors)).toBe("#196127")
  expect(colorForValue(120, habitColors)).toBe("#196127")
});

test('run reading habit test reverse', () => {
  const habitColors: { [key: number]: string } = {
    120: "#196127",
    105: "#2e8840",
    90: "#49af5d",
    75: "#7bc96f",
    60: "#c6e48b"
  }
  expect(colorForValue(0, habitColors)).toBe("#c6e48b")
  expect(colorForValue(60, habitColors)).toBe("#c6e48b")
  expect(colorForValue(61, habitColors)).toBe("#7bc96f")
  expect(colorForValue(75, habitColors)).toBe("#7bc96f")
  expect(colorForValue(76, habitColors)).toBe("#49af5d")
  expect(colorForValue(90, habitColors)).toBe("#49af5d")
  expect(colorForValue(91, habitColors)).toBe("#2e8840")
  expect(colorForValue(105, habitColors)).toBe("#2e8840")
  expect(colorForValue(106, habitColors)).toBe("#196127")
  expect(colorForValue(120, habitColors)).toBe("#196127")
});

test('Create Thresholds for Reading Habit', () => {
  const habitColors: string[] = ["#c6e48b","#7bc96f","#49af5d","#2e8840","#196127"]
  const entries: Entry[] = [
    {date:"2022-06-01", value:45},
    {date:"2022-06-02", value:120},
    {date:"2022-06-03", value:60}
  ]
  expect(colorsWithThresholdFor(entries, habitColors))
  .toStrictEqual({
    120: "#196127",
    101.25: "#2e8840",
    82.5: "#49af5d",
    63.75: "#7bc96f",
    45: "#c6e48b"
  })
})

test('No Values', () => {
  const habitColors: string[] = ["#c6e48b","#7bc96f","#49af5d","#2e8840","#196127"]
  const entries: Entry[] = [
    {date:"2022-06-01"},
    {date:"2022-06-02"},
    {date:"2022-06-03"}
  ]
  expect(colorsWithThresholdFor(entries, habitColors))
  .toStrictEqual({
    0: "#c6e48b"
  })
})
