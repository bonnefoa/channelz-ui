import type { NumberCell } from '../types/CommonTypes';

export const NumberCellFormatter = (cell: NumberCell): string => {
    const n = cell.getValue()
    if (n === undefined) {
        return "0";
    }
    return n.toString();
};
