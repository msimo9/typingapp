import { createStore } from 'redux'

export const SLIDER_VALUE = 'SLIDER_VALUE';
export const LANGUAGE = 'LANGUAGE';
export const CHANGE_WPM = 'CHANGE_WPM';
export const ERRORS = 'ERRORS';
export const CHANGE_TIMER = 'CHANGE_TIMER';
export const CHANGE_TIMER_VALUE = 'CHANGE_TIMER_VALUE';

const initalState = {
    sliderValue: 30,
    language: "en",
    wpm: 0,
    errors: 0,
    timer: false,
    timerValue: 60,
}

export const changeTimer = () => ({
    type: 'CHANGE_TIMER',
});

export const changeTimerValue = (timerValue) => ({
    type: 'CHANGE_TIMER_VALUE',
    payload: {timerValue},
});

export const changeSliderValue = (sliderValue) => ({
    type: 'SLIDER_VALUE',
    payload: {sliderValue}
});

export const changeLanguage = (langValue) => ({
    type: 'LANGUAGE',
    payload: {langValue}
});

export const changeWpm = (wpmValue) => ({
    type:'CHANGE_WPM',
    payload: {wpmValue}
});

export const incrementErrors = () => ({
    type: 'ERRORS'
});

export const rootReducer = (state = initalState, action) => {
    switch(action.type){
        case SLIDER_VALUE:
            return{
                ...state,
                sliderValue: action.payload.sliderValue
            }
        case LANGUAGE:
            return{
                ...state,
                language: action.payload.langValue
            }
        case CHANGE_WPM:
            return{
                ...state,
                wpm: action.payload.wpmValue
            }
        case ERRORS:
            return{
                ...state,
                errors: parseInt(state.errors)+1
            }
        case CHANGE_TIMER:
            return{
                ...state,
                timer: !state.timer,
            }
        case CHANGE_TIMER_VALUE:
            console.log("redux timer value: ",action.payload.timerValue)
            return{
                ...state,
                timerValue: action.payload.timerValue,
            }
        default:
            return state
    }
}


const store = createStore(rootReducer);

export default store;







