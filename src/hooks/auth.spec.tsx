import { act, renderHook } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from './auth';

describe('Auth hook', () => {
  it('shoulb be able to sigin with Google account existing', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).toBeTruthy();
  });
});