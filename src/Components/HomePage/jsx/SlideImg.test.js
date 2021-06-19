import { render, screen } from "@testing-library/react";
import SlideImg from "./SlideImg";

describe('SlideImg tests', () => {
    test('Check for 6 images of diamond', async () => {
        render(<SlideImg />);

        const imgElements = await screen.findAllByRole('img')
        expect(imgElements).toHaveLength(6);
    })
});