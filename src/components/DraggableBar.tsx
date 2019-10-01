import React, { useEffect, useRef, MouseEvent } from 'react';
import styled, { StyledComponent } from 'styled-components';
import {
  fromEvent,
  Observable,
  Subscription,
  animationFrameScheduler
} from 'rxjs';
import {
  map,
  merge,
  throttleTime,
  switchMap,
  takeUntil,
  startWith,
  tap,
  filter,
  observeOn
} from 'rxjs/operators';

const BarComponent = styled.progress`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 14px;
  border-radius: 1px;
  cursor: pointer;
  z-index: 1;
`;

export const Indicator = styled.button.attrs<{ current: number }>(props => ({
  style: {
    left: `${props.current * 100}%`
  }
}))`
  position: absolute;
  top: -4px;
  left: 0;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  appearance: none;
  curosr: pointer;
  transform: translate(-7.5px);
  transform-origin: center;
  background-color: #fff;
  transition: box-shadow 0.2s ease;
  &:focus {
    outline: none;
    box-shadow: 0 0 5px 5px rgba(200, 200, 200, 0.5);
  }
`;

export const ProgressFill = styled.div.attrs<{ current: number }>(props => ({
  style: {
    width: `${(props.current || 0) * 100}%`
  }
}))`
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  background-color: #fff;
  left: 0;
  border-radius: 5px;
`;

type Props = {
  current: number;
  setCurrent: (current: number) => void;
};

const Bar: React.FC<Props> = ({ current, setCurrent }) => {
  const barRef = useRef<HTMLProgressElement>();
  const indicatorRef = useRef<HTMLButtonElement>();
  const slide$ = useRef<Subscription | null>(null);

  useEffect(() => {
    if (barRef.current && indicatorRef.current) {
      const width = barRef.current.offsetWidth;
      slide$.current = fromEvent(barRef.current, 'mousedown')
        .pipe(
          merge(
            fromEvent(indicatorRef.current, 'mousedown').pipe(
              map((e: MouseEvent) => ({
                pageX: e.pageX,
                offsetX: current * width
              }))
            )
          ),
          throttleTime(100),
          switchMap(({ offsetX: initialX, pageX: x }) =>
            fromEvent(window, 'mousemove').pipe(
              map(e => (initialX + e.pageX - x) / width),
              /* make button blur when mouse up */
              takeUntil(
                fromEvent(window, 'mouseup').pipe(
                  tap(
                    () =>
                      document.activeElement && document.activeElement.blur()
                  )
                )
              ),
              startWith(initialX / width)
            )
          ),
          filter(progress => progress <= 1 || progress >= 0),
          observeOn(animationFrameScheduler)
        )
        .subscribe(setCurrent);
    }
  }, []);

  return (
    <BarComponent ref={barRef}>
      <ProgressFill current={current} />
      <Indicator ref={indicatorRef} current={current} />
    </BarComponent>
  );
};
