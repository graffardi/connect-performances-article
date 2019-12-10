/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactType, ComponentProps } from 'react';

import { Either, fold } from 'fp-ts/lib/Either';

export type EitherComponentProps<F extends ReactType, C extends ReactType> = {
  eitherProps: Either<ComponentProps<F>, ComponentProps<C>>;
};

function eitherComponent<F extends ReactType, C extends ReactType>(
  Fallback: F,
  Component: C,
) {
  return ({ eitherProps }: EitherComponentProps<F, C>): JSX.Element =>
    fold(
      (props: ComponentProps<F>) => <Fallback {...props} />,
      (props: ComponentProps<C>) => <Component {...props} />,
    )(eitherProps);
}

export default eitherComponent;
