import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';

import { useProgressStore } from '../../lib/stores/progressStore';

export function AdminUnlockDialog() {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const setAdminUnlocked = useProgressStore((state) => state.setAdminUnlocked);

  const handleUnlock = () => {
    if (password === 'admin') {
      setAdminUnlocked(true);
      setMessage('Admin unlock enabled for this local browser profile.');
      return;
    }

    setMessage('Incorrect password. The MVP bypass uses `admin`.');
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger className="admin-button">Admin Privileges</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content glass-widget">
          <Dialog.Title className="dialog-title">Admin bypass</Dialog.Title>
          <Dialog.Description className="dialog-description">
            This is a UX-only shortcut for local development, not real security.
          </Dialog.Description>

          <label className="field-label" htmlFor="admin-password">
            Password
          </label>
          <input
            id="admin-password"
            className="field-input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <div className="dialog-actions">
            <button type="button" className="btn-secondary" onClick={handleUnlock}>
              Unlock everything
            </button>
            <Dialog.Close className="btn-ghost">Close</Dialog.Close>
          </div>

          {message ? <p className="dialog-message">{message}</p> : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
