import moment from 'moment';

export default function showFormatDate(date) {
    return moment(date).format("YYYY年MM月DD日");
}