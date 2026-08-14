
import { Component, type ReactNode } from "react";
import { Translation } from "react-i18next";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <Translation>{(t, { }) => <p>{t("error")}</p>}</Translation>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
