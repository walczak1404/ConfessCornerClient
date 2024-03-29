import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatterService {
  convertDate(date): string {
    const dateNow = new Date();
    const dateAsDate = new Date(date);
    const differenceInMilliseconds = Math.abs(dateNow.getTime() - dateAsDate.getTime());

    const seconds = differenceInMilliseconds / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const weeks = days / 7;
    const months = Math.floor((dateNow.getFullYear() - dateAsDate.getFullYear()) * 12 + (dateNow.getMonth() - dateAsDate.getMonth()));
    const years = dateNow.getFullYear() - dateAsDate.getFullYear();

    let number: number;
    let type: string;

    if (seconds < 60) {
        number = Math.floor(seconds);
        type = ' seconds';
    } else if (minutes < 60) {
        number = Math.floor(minutes);
        type = ' minutes';
    } else if (hours < 24) {
        number = Math.floor(hours);
        type = ' hours';
    } else if (days < 7) {
        number = Math.floor(days);
        type = ' days';
    } else if (weeks < 4) {
        number = Math.floor(weeks);
        type = ' weeks';
    } else if (months < 12) {
        Math.floor(months)
        type = ' months';
    } else {
        Math.floor(years)
        type = ' years';
    }

    if(number == 1) {
        type = type.slice(0,-1);
    }

    return number + type;
  }
}
