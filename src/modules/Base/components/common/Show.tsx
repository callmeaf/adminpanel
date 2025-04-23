import * as React from "react";

interface IShowProps {
  when: boolean;
}

interface IShowComponent extends React.FC<React.PropsWithChildren<IShowProps>> {
  When: React.FC<React.PropsWithChildren>;
  Else: React.FC<React.PropsWithChildren>;
}

const Show: IShowComponent = ({ children, when }) => {
  const whenChild = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === Show.When
  );
  const elseChild = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === Show.Else
  );

  return <>{when ? whenChild : elseChild}</>;
};

Show.When = ({ children }) => <>{children}</>;
Show.Else = ({ children }) => <>{children}</>;

export default Show;
