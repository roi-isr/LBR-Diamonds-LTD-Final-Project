import {
    convertDateFormat,
    convertShortenDateFormat,
    convertRangeDateFormat,
    convertRangeShortenDateFormat
} from './Utility';

describe('Check convertDateFormat', () => {
    test('Date format 1', async () => {
        const result = convertDateFormat('1/2/20');
        expect(result).toStrictEqual(new Date('2-1-2020'));
    });
    test('Date format 2', async () => {
        const result = convertDateFormat('31/5/21');
        expect(result).toStrictEqual(new Date('5-31-2021'));
    });
    test('Invalid date format', async () => {
        const result = convertDateFormat('423/12/321');
        expect(result).toBe(null);
    });
});

describe('Check convertRangeDateFormat', () => {
    test('Date format 1', async () => {
        const result = convertShortenDateFormat('2/20');
        expect(result).toStrictEqual(new Date('2-1-2020'));
    });
    test('Date format 2', async () => {
        const result = convertShortenDateFormat('12/21');
        expect(result).toStrictEqual(new Date('12-1-2021'));
    });
    test('Invalid date format', async () => {
        const result = convertShortenDateFormat('423/122');
        expect(result).toBe(null);
    });
});

describe('Check convertRangeDateFormat', () => {
    test('Date format 1', async () => {
        const result = convertRangeDateFormat('1/2/20-30/4/20');
        expect(result).toStrictEqual([new Date('2-1-2020'), new Date('4-30-2020')]);
    });
    test('Date format 2', async () => {
        const result = convertRangeDateFormat('1/1/21-31/12/22');
        expect(result).toStrictEqual([new Date('1-1-2021'), new Date('12-31-2022')]);
    });
    test('Invalid date format', async () => {
        const result = convertRangeDateFormat('423/122/22-3242/3/2');
        expect(result).toBe(null);
    });
});

describe('Check convertRangeShortenDateFormat', () => {
    test('Date format 1', async () => {
        const result = convertRangeShortenDateFormat('2/20-5/20');
        expect(result).toStrictEqual([new Date('2-1-2020'), new Date('5-31-2020')]);
    });
    test('Date format 2', async () => {
        const result = convertRangeShortenDateFormat('1/21-12/22');
        expect(result).toStrictEqual([new Date('1-1-2021'), new Date('12-31-2022')]);
    });
    test('Invalid date format', async () => {
        const result = convertRangeShortenDateFormat('122/22-3242/2');
        expect(result).toBe(null);
    });
});
