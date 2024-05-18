import { useState } from "react";
import { Wheel } from "react-custom-roulette";

const data = [
  { option: "0", style: { backgroundColor: "green", textColor: "black" } },
  { option: "1", style: { backgroundColor: "white ", textColor: "black" } },
  { option: "2", style: { backgroundColor: "blue", textColor: "black" } },
];

const backgroundColors = ["#ff8f43", "#70bbe0", "#0b3351", "#f9dd50"];
const textColors = ["#0b3351"];
const outerBorderColor = "#eeeeee";
const outerBorderWidth = 2;
const innerBorderColor = "#30261a";
const innerBorderWidth = 0;
const innerRadius = 0;
const radiusLineColor = "#eeeeee";
const radiusLineWidth = 0;
const fontFamily = "Nunito";
const fontWeight = "bold";
const fontSize = 20;
const fontStyle = "normal";
const textDistance = 60;
const spinDuration = 1.0;

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
    <div className="w-[200px] h-[100px]">
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
        // perpendicularText
        textDistance={textDistance}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
      />
      <button onClick={handleSpinClick}>SPIN</button>
    </div>
  );
};
