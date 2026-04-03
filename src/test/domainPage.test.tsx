import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { DomainPage } from '../pages/DomainPage';

describe('DomainPage', () => {
  it('toggles a domain card open and closed from the course map overview', () => {
    render(
      <MemoryRouter initialEntries={['/domain']}>
        <Routes>
          <Route element={<DomainPage />} path="/domain" />
          <Route element={<DomainPage />} path="/domain/:id" />
        </Routes>
      </MemoryRouter>,
    );

    const toggleButton = screen.getByRole('button', { name: /expand network access/i });

    expect(screen.getByRole('heading', { name: /ccna 200-301 course map/i })).toBeInTheDocument();
    expect(screen.getAllByText('20%')).toHaveLength(2);
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('link', { name: /resume module/i })).not.toBeInTheDocument();

    fireEvent.click(toggleButton);

    expect(screen.getByRole('button', { name: /collapse network access/i })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/switching, vlans, wireless access/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /resume module/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /collapse network access/i }));

    expect(screen.getByRole('button', { name: /expand network access/i })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('link', { name: /resume module/i })).not.toBeInTheDocument();
  });
});
