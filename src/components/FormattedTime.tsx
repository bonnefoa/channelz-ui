import type { TimestampCell } from '../types/CommonTypes';
import moment from 'moment';

export const DateCellFormatter = (cell: TimestampCell): string => {
    const timestamp = cell.getValue()
    if (Object.keys(timestamp).length <= 0) {
        return '-';
    }
    return moment(timestamp.seconds * 1000).format('DD-MMM-YYYY HH:mm:ss')
};

