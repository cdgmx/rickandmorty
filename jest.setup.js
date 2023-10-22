// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
// Mock Next.js dynamic imports
jest.mock('next/dynamic', () => () => {
  return;
});

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));
