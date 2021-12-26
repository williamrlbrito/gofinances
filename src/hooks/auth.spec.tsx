import { renderHook, act} from '@testing-library/react-hooks';
import { mocked } from 'jest-mock';
import { AuthProvider, useAuth } from './auth';
import { startAsync } from 'expo-auth-session';
import fetchMock from 'jest-fetch-mock';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('expo-auth-session');

fetchMock.enableMocks();

describe('Auth hook', () => {
  beforeEach(async () => {
    const userCollectionKey = '@gofinances:user';
    await AsyncStorage.removeItem(userCollectionKey);
 });

  it('shoulb be able to sigin with Google account existing', async () => {
    const user = {
      id: 'any_id',
      email: 'john.doe@email.com',
      name: 'John Doe',
      photo: 'any_photo.png'
    };

    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: 'success',
      params: {
        access_token: 'any_token',
      }
    });
    
    fetchMock.mockResponseOnce(JSON.stringify(user));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email)
      .toBe(user.email);
  });

  it('user should not connect if cancel authentication with Google', async () => {
    const googleMocked = mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: 'cancel',
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty('id');
  });
});