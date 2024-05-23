import { useState } from "react";
import { Wheel } from "react-custom-roulette";

const data = [
  {
    option: "0x425",
    optionSize: 1,
    style: { backgroundColor: "purple", textColor: "white" },
  },
  {
    option: "0xadf",
    optionSize: 2,
    style: { backgroundColor: "black ", textColor: "white" },
  },
  {
    option: "0x634",
    optionSize: 3,
    style: { backgroundColor: "blue", textColor: "white" },
  },
];

const backgroundColors = ["#5C3352", "#70bbe0", "#0b3351", "#f9dd50"];
const textColors = ["#0b3351"];
const outerBorderColor = "#000000";
const outerBorderWidth = 6;
const innerBorderColor = "#ffffff";
const innerBorderWidth = 0;
const innerRadius = 0;
const radiusLineColor = "#eeeeee";
const radiusLineWidth = 2;
const fontFamily = "Nunito";
const fontWeight = "bold";
const fontSize = 30;
const fontStyle = "normal";
const textDistance = 60;
const spinDuration = 0.5;

export const JackpotWheel = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin) {
      //const newPrizeNumber = Math.floor(Math.random() * data.length);
      //setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  return (
    <div>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        backgroundColors={backgroundColors}
        textColors={textColors}
        fontFamily={fontFamily}
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontStyle={fontStyle}
        outerBorderColor={outerBorderColor}
        outerBorderWidth={outerBorderWidth}
        innerRadius={innerRadius}
        innerBorderColor={innerBorderColor}
        innerBorderWidth={innerBorderWidth}
        radiusLineColor={radiusLineColor}
        radiusLineWidth={radiusLineWidth}
        spinDuration={spinDuration}
        startingOptionIndex={2}
        perpendicularText={true}
        textDistance={textDistance}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
      />
      <button onClick={handleSpinClick}> </button>
    </div>
  );
};
