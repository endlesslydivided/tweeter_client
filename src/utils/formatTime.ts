import {format, formatDistanceToNow, getTime} from 'date-fns';


export function fDate(date: any, newFormat: any) {
    const fm = newFormat || 'dd MMM yyyy';

    return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date: any, newFormat: any = 'dd MMMM yyyy HH:mm') {
    return date ? format(new Date(date), newFormat) : '';
}

export function fTimestamp(date: any) {
    return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: any) {
    return date
        ? formatDistanceToNow(new Date(date), {
            addSuffix: true,
        })
        : '';
}
