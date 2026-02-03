import { RemoveScroll } from "react-remove-scroll";
import { tv } from "tailwind-variants";

const formStyles = tv({
  slots: {
    formContainer: "h-auto w-auto bg-transparent",
  },
  variants: {
    active: {
      true: {
        formContainer: "fixed right-0 top-0 z-50 h-dvh",
      },
      false: {
        formContainer: "relative bg-transparent before:hidden",
      },
    },
  },
});

type FormProps = {
  children: React.ReactNode;
  isExpanded: boolean;
  onToggleExpand: () => void;
};

export default function Form({
  children,
  isExpanded,
  onToggleExpand,
}: Readonly<FormProps>) {
  const { formContainer } = formStyles({
    active: isExpanded,
  });
  return (
    <RemoveScroll enabled={isExpanded} forwardProps>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        onMouseLeave={(event) => {
          event.stopPropagation();
          if (isExpanded) onToggleExpand();
        }}
        className={formContainer()}
      >
        {children}
      </form>
    </RemoveScroll>
  );
}
