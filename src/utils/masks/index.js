import DateTimeMask, { Pipes as DateTimePipes } from './datetime';
import PhoneMask, { Pipes as PhonePipes } from './phone';
import RutMask, { Pipe as RutPipe } from './rut';

const DateMask = DateTimeMask.date;
const TimeMask = DateTimeMask.time;
const DatePipe = DateTimePipes.date;
const TimePipe = DateTimePipes.time;

const PhoneSimpleMask = PhoneMask.simple;
const PhoneAdvancedMask = PhoneMask.advanced;
const PhoneSimplePipe = PhonePipes.simple;
const PhoneAdvancedPipe = PhonePipes.advanced;

export {
    DateMask,
    TimeMask,
    PhoneSimpleMask,
    PhoneAdvancedMask,
    RutMask,
    DatePipe,
    TimePipe,
    PhoneSimplePipe,
    PhoneAdvancedPipe,
    RutPipe
};
