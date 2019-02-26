import { LOCALES } from './constants/common';

const host = window.location.hostname;

export const API_PATH = `http://${host}:5050/api`;
export const defaultLocale = LOCALES.en;

export const maxCounterValue = 99999999;
