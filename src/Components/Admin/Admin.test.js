import { render, screen } from "@testing-library/react";
import { AdminHomeWelcome } from "./Admin";

describe('Check AdminHomeWelcome page', () => {
    test('Check for a proper welcome admin title', async () => {
        render(<AdminHomeWelcome />);
        const welcomeAdminTitle = screen.getByText('Welcome, admin!');
        expect(welcomeAdminTitle).toBeInTheDocument();
    });
});
