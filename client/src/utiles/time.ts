import moment, { Moment } from 'moment';

export default function Time(date?: Date) {
    class Time {
        _userDate: Moment
        _now: Moment
        constructor(date?: Date) {
            this._userDate = moment(date)
            this._now = moment()
        }
        durationDays() {
            return moment.duration(this._userDate.diff(this._now)).days();
        }
        addDays(days: number) {
            return this._now.add(days, 'days');
        }
        isFuture(date?: Date | string) {
            if (date) {
                return moment(date).isBefore(this._userDate);
            }
            else { return this._now.isBefore(this._userDate); }
        }
        toDateInputValue(date?: Date) {
            return date ? moment(date).format('YYYY-MM-DD') :
                this._now.format('YYYY-MM-DD');
        }
    }
    return new Time(date);
}