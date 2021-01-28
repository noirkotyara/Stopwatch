import { interval } from "rxjs";
import { map } from "rxjs/operators";
const delay = 1000;

export const onStartStopFunction = ({ subscriber, setTimer, stopTime, setSubscribers, setStopTime }) => {
  if (!subscriber) {
    const timerSubscriber = interval(delay)
      .pipe(map(v => v + 1))
      .subscribe(v => {
        setTimer(v + stopTime);
      });
      setSubscribers(timerSubscriber);
  } else {
    subscriber.unsubscribe();
    setTimer(0);
    setStopTime(0);
    setSubscribers("");
  }
};

export const onWaitFunction = ({ prevent, setPrevent, subscriber, setStopTime, timer, setSubscribers, setIsStart }) => {
  if (prevent) {
    setPrevent(false);
    const timerOut = setTimeout(() => {
      setPrevent(true);
      clearTimeout(timerOut);
    }, 300);
  } else {
    subscriber && subscriber.unsubscribe();
    
    setIsStart(false)
    setStopTime(timer);
    setSubscribers("");
  }
};

export const onResetFunction = ({  subscriber, setTimer, setSubscribers }) => {
subscriber && subscriber.unsubscribe();
  const timerSubscriber = interval(delay).subscribe( v => {
    setTimer(v);
  });
  setSubscribers(timerSubscriber);
};


export const getTime = (time) => {
    let seconds = ("0" + (Math.floor(time) % 60)).slice(-2);
    let minutes = ("0" + (Math.floor(time / 60) % 60)).slice(-2);
    let hours = ("0" + Math.floor(time / 3600)).slice(-2);
    return `${hours} : ${minutes} : ${seconds}`;
  }