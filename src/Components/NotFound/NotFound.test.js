import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";

describe('Check NotFound page', () => {
    test('Check for a proper not found title', async () => {
        render(<NotFound />);
        const notFoundTitle = screen.getByText('Error 404 - Page Not Found :(');
        expect(notFoundTitle).toBeInTheDocument();
    });
});
