export function calculateTime(deliveries: string[]) {
  type Time = number;

  function createTime(hours: number, mins: number, secs: number): Time {
    return hours * 3600 + mins * 60 + secs;
  }

  function addTime(time1: Time, time2: Time): Time {
    return time1 + time2;
  }

  function minusTime(time1: Time, time2: Time): Time {
    return time1 - time2;
  }

  function toTwoDigits(num: number): string {
    return ("00" + Math.abs(num)).slice(-2);
  }

  function timeToString(timeS: Time): string {
    const time = Math.abs(timeS);
    let hours = toTwoDigits(Math.floor(time / 3600));
    let minutes = toTwoDigits(Math.floor((time % 3600) / 60));
    let seconds = toTwoDigits(Math.floor((time % 3600) % 60));
    let symbol = timeS < 0 ? "-" : "";
    return `${symbol}${hours}:${minutes}:${seconds}`;
  }

  function fromString(timeString: string): Time {
    const [hours, minutes, secs] = timeString.split(":");
    const newTime = createTime(Number(hours), Number(minutes), Number(secs));
    return newTime;
  }
  const neededTime = deliveries.reduce(
    (accTime, delivery) => addTime(accTime, fromString(delivery)),
    createTime(0, 0, 0),
  );

  const timeString = timeToString(
    minusTime(neededTime, fromString("07:00:00")),
  );
  return timeString;
}
