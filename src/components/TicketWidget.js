import React, { useContext } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import { SeatContext } from "./SeatContext";
import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import SeatImage from "../assets/seat-available.svg";

const TicketWidget = () => {
  // TODO: use values from Context
  const {
    state: { hasLoaded, seats, numOfRows, seatsPerRow },
  } = React.useContext(SeatContext);
  // const numOfRows = 6;
  // const seatsPerRow = 6;

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag

  if (!hasLoaded) {
    return (
      <Center>
        <CircularProgress />
      </Center>
    );
  }

  return (
    <Wrapper>
      {range(numOfRows).map((rowIndex) => {
        const rowName = getRowName(rowIndex);

        return (
          <Row key={rowIndex}>
            <RowLabel>Row {rowName}</RowLabel>
            {range(seatsPerRow).map((seatIndex) => {
              const seatId = `${rowName}-${getSeatNum(seatIndex)}`;

              if ((seats[seatId].isBooked = true)) {
                return (
                  <SeatWrapper key={seatId}>
                    {/* TODO: Render the actual <Seat /> */}
                    <SeatImg className="unavailable" src={SeatImage} />
                  </SeatWrapper>
                );
              }
              return (
                <SeatWrapper key={seatId}>
                  {/* TODO: Render the actual <Seat /> */}
                  <SeatImg src={SeatImage} />
                </SeatWrapper>
              );
            })}
          </Row>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #eee;
  border: 1px solid #ccc;
  width: fit-content;
  height: fit-content;
  margin: 30px auto;
  border-radius: 3px;
  padding: 8px;
`;

const Row = styled.div`
  display: flex;
  position: relative;
  &:not(:last-of-type) {
    border-bottom: 1px solid #ddd;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
`;

const SeatWrapper = styled.div`
  padding: 5px;
`;

const Center = styled.div`
  position: fixed;
  margin: 200px auto 0 49vw;
`;

const SeatImg = styled.img`
  &.unavailable {
    filter: grayscale(100%);
  }
`;

export default TicketWidget;
