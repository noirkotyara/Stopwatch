import { React, useState } from 'react'
import { getTime, onWaitFunction, onResetFunction, onStartStopFunction } from './../helperFunctions'
import styles from './StopWatch.module.css'

export const StopWatch = () => {
    const [isStart, setIsStart] = useState(false)
    const [timer, setTimer] = useState(0);
    const [stopTime, setStopTime] = useState(0);
    const [subscriber, setSubscribers] = useState("");
    const [prevent, setPrevent] = useState(true);

    const startTime = { subscriber, setTimer, stopTime, setSubscribers, setStopTime };
    const waitTime = { prevent, setPrevent, subscriber, setStopTime, timer, setSubscribers, setIsStart };
    const resetTime = { subscriber, setTimer, setSubscribers };

    const onStop = () => {
        setIsStart(!isStart);
        onStartStopFunction(startTime)
    }

    const onStart = () => {
        setIsStart(!isStart);
        onStartStopFunction(startTime)
    }

    const onWait = () => {
        onWaitFunction(waitTime)
    }

    const onReset = () => {
        setIsStart(true);
        onResetFunction(resetTime)
    }
    let realTime = getTime(timer);

    return (
        <div className={styles.container}>
            <div className={styles.display}>{realTime}</div>
            <div className={styles.buttons}>
                <div>
                    {
                        isStart
                            ? <button className={`${styles.button} ${styles.stop_button}`} onClick={onStop}> Stop </button>
                            : <button className={styles.button} onClick={onStart}> Start </button>
                    }
                    <button className={styles.button} onClick={onWait}> Wait </button>
                    <button className={styles.button} onClick={onReset}> Reset </button>
                </div>
            </div>

        </div>
    )
}