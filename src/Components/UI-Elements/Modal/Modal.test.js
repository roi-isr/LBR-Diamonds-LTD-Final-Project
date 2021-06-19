import { render, screen } from "@testing-library/react";
import FormModal from "./Modal";


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

describe('Modal tests', () => {
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