import React, { createRef } from 'react';
import styled from 'styled-components';
import { fromEvent, Subscription, animationFrameScheduler } from 'rxjs';
import {
  map,
  merge,
  throttleTime,
  switchMap,
  takeUntil,
  startWith,
  tap,
  filter,
  observeOn,
} from 'rxjs/operators';

const BarComponent = styled.div`
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
    left: `${props.current * 100}%`,
  },
}))<{ current: number }>`
  position: absolute;
  z-index: 1;
  top: -11px;
  left: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #ddd;
  transform: translateX(-15px);
  transform-origin: center;
  background-color: #fff;
  transition: box-shadow 0.2s ease;
  cursor: pointer;
  &:focus {
    outline: none;
    box-shadow: 0 0 5px 5px rgba(200, 200, 200, 0.5);
  }
`;

export const ProgressFill = styled.div.attrs<{ current: number }>(props => ({
  style: {
    width: `${(props.current || 0) * 100}%`,
  },
}))<{ current: number }>`
  pointer-events: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  background-color: rgba(60, 60, 60, 0.8);
  left: 0;
  border-radius: 5px;
`;

type Props = {
  current: number;
  setCurrent: (current: number) => void;
};

export default class Bar extends React.Component<Props> {
  barRef = createRef<HTMLDivElement>();
  indicatorRef = createRef<HTMLButtonElement>();
  slide$: Subscription;

  componentDidMount() {
    const { offsetWidth: width } = this.barRef.current;
    const { setCurrent } = this.props;
    this.slide$ = fromEvent(this.barRef.current, 'mousedown')
      .pipe(
        merge(
          fromEvent<MouseEvent>(this.indicatorRef.current, 'mousedown').pipe(
            map(({ pageX }) => ({
              pageX,
              offsetX: this.props.current * width,
            })),
          ),
        ),
        throttleTime(100),
        switchMap(({ offsetX: initialX, pageX: x }: MouseEvent) => fromEvent<MouseEvent>(window, 'mousemove').pipe(
          map(e => (initialX + e.pageX - x) / width),
          /* make button blur when mouse up */
          takeUntil(fromEvent(window, 'mouseup')
            .pipe(tap(() => document.activeElement instanceof HTMLElement && document.activeElement.blur()))),
          startWith(initialX / width),
        )),
        filter(progress => progress <= 1 || progress >= 0),
        observeOn(animationFrameScheduler),
      )
      .subscribe(setCurrent);
  }

  componentWillUnmount() {
    this.slide$.unsubscribe();
  }

  render() {
    const { current } = this.props;
    return (
      <BarComponent ref={this.barRef}>
        <ProgressFill current={this.props.current} />
        <Indicator ref={this.indicatorRef} current={current} />
      </BarComponent>
    );
  }
}