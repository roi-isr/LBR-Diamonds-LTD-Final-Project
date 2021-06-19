import { render, screen } from "@testing-library/react";
import SlideImg from "./SlideImg";

test('Check for 6 images of diamond', async () => {
    render(<SlideImg />);

    const imgElements = await screen.findAllByRole('img')
    expect(imgElements).toHaveLength(6);
});