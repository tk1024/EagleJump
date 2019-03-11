import { RangeSlider } from "src/components/molecules/player/components/range-slider"
import * as React from "react"
import { ITrack } from "src/interface/track"
import { IPlayerMetaData } from "src/reducers/player-meta-data"
import styled from "styled-components"
import { formattedTime } from "src/lib/formatted-time"
import Color from "src/style/const/color"

interface IProps {
  totalTime: ITrack["duration"]
  currentTime: IPlayerMetaData["currentTime"]
  selectedPosition?: (num: number) => void
}

export const RangeSliderWithTime = ({
  totalTime,
  currentTime,
  selectedPosition,
}: IProps) => {
  const durationSec = totalTime / 1000
  return (
    <Wrapper>
      <CurrentTime>{formattedTime(currentTime)}</CurrentTime>
      <RangeSlider
        totalTime={durationSec}
        currentTime={currentTime}
        selectedPosition={selectedPosition}
      />
      <TotalTime>{formattedTime(durationSec)}</TotalTime>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  margin: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CurrentTime = styled.div`
  font-family: monospace;
  width: 40px;
  margin-right: 10px;
  text-align: right;
  font-size: 12px;
  color: ${Color.BRAND};
`

const TotalTime = styled.div`
  font-family: monospace;
  width: 40px;
  margin-left: 10px;
  font-size: 12px;
`
