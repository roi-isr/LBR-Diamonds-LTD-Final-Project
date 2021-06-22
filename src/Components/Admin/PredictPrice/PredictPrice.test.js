import { render, screen } from "@testing-library/react";
import PredictPrice from "./PredictPrice";

describe('Check PredictPrice page', () => {
    test('Check if there are 26 buttons in predict price page', async () => {
        render(<PredictPrice />);
        const btnElements = await screen.findAllByRole('button');
        expect(btnElements).toHaveLength(26);
    });

    test('Check for a single image in PredictPrice page', async () => {
        render(<PredictPrice />);
        const btnElements = await screen.findAllByRole('img');
        expect(btnElements).toHaveLength(1);
    });
});
