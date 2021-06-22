import { render, screen } from "@testing-library/react";
import FormModal from "./Modal";
import { dateFormatStr } from './Utility';

const testData = {
    offer_id: 'test',
    data: [
        { name: "מודל", content: '1' },
        { name: "קוד", content: '1' },
        { name: "שם הפונה", content: '1' },
        { name: "טלפון", content: '1' },
        { name: "מייל", content: '1' },
        { name: "משקל מוצע", content: '1' },
        { name: "מחיר מוצע", content: '1' },
        { name: "הערות", content: '1' },
        { name: "תאריך פנייה", content: '1' },
    ],
    maxWeight: 5,
    diamondClarity: '3',
    diamondColor: '5',
}

describe('Modal structural tests', () => {
    test('Check for 6 buttons (confirm, send mail, delete, next, previous, close) in a offer-info-form modal', async () => {
        render(
            <FormModal
                modalType="offer-info-form"
                autoShow={true}
                fields={testData}
                popUpTitle="עדכון לדוגמא"
            />
        );

        const btnElements = await screen.findAllByRole('button');
        expect(btnElements).toHaveLength(6);
    });

    test('Check for proper modal title', () => {
        render(
            <FormModal
                modalType="offer-info-form"
                autoShow={true}
                fields={testData}
                popUpTitle="עדכון לדוגמא"
            />
        );

        const titleElement = screen.getByText('עדכון לדוגמא');
        expect(titleElement).toBeInTheDocument();
    });
});

describe('Modal date format tests', () => {
    test('date 1', async () => {
        const result = dateFormatStr(new Date('2-1-2020'));
        expect(result).toBe('2020-02-01');
    });
    test('date 2', async () => {
        const result = dateFormatStr(new Date('12-21-2020'));
        expect(result).toBe('2020-12-21');
    });
    test('date 3', async () => {
        const result = dateFormatStr(new Date('3-31-2022'));
        expect(result).toBe('2022-03-31');
    });
    test('date 4', async () => {
        const result = dateFormatStr(new Date('10-10-2019'));
        expect(result).toBe('2019-10-10');
    });
    test('date 5', async () => {
        const result = dateFormatStr(new Date('5-5-2021'));
        expect(result).toBe('2021-05-05');
    });
});