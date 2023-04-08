import Button, { ButtonProps } from '@material-ui/core/Button';
import { ComponentType, ReactComponentElement } from 'react';

interface Props extends ButtonProps {
  children: React.ReactNode;
  menuLabel?: string;
  component?: ReactComponentElement<ComponentType<any>> | ComponentType<any>;
}

export function ToothPasteButton(props: Props) {
  const { children, menuLabel, component, ...buttonProps } = props;
  if (component && typeof component === 'function') {
    const Component = component;

    return (
      <Component>
        <Button {...buttonProps}>{children}</Button>
      </Component>
    );
  }
  return <Button {...buttonProps}>{children}</Button>;
}
