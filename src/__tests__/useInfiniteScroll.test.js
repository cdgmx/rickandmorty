import { renderHook, act } from '@testing-library/react';
import { useInfiniteScroll } from '@/pages/index';

describe('useInfiniteScroll', () => {
  let fetchMoreMock;
  let queryData;

  beforeEach(() => {
    jest.useFakeTimers(); // Use fake timers

    fetchMoreMock = jest.fn();
    queryData = {
      characters: {
        info: {
          next: 2, // Mock next page
        },
      },
    };

    // Mock scroll conditions
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 800,
    });
    Object.defineProperty(document.documentElement, 'scrollTop', {
      writable: true,
      configurable: true,
      value: 200,
    });
    Object.defineProperty(document.documentElement, 'offsetHeight', {
      writable: true,
      configurable: true,
      value: 1000,
    });
  });

  afterEach(() => {
    jest.useRealTimers(); // Reset timers after each test
  });

  it('should call fetchMore when scrolled to the bottom', () => {
    const { result } = renderHook(() =>
      useInfiniteScroll(queryData, fetchMoreMock),
    );

    act(() => {
      // Simulate scroll event
      window.dispatchEvent(new Event('scroll'));
    });

    act(() => {
      jest.runAllTimers(); // Run all timers to account for debounce
    });

    expect(fetchMoreMock).toHaveBeenCalled();
  });
});
