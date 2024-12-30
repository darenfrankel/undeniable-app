import { Component, ErrorInfo, ReactNode, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to analytics
    trackEvent({
      action: 'error_boundary_catch',
      category: 'Error',
      label: error.name,
    });

    // Call optional error handler
    this.props.onError?.(error, errorInfo);

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error boundary caught error:', error);
      console.error('Component stack:', errorInfo.componentStack);
    }
  }

  private handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null
    });
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      // Return custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-[400px] p-6 flex flex-col items-center justify-center bg-destructive/5 rounded-lg border border-destructive/20">
          <div className="max-w-md text-center space-y-4">
            <h2 className="text-xl font-semibold text-destructive">
              Something went wrong
            </h2>
            <p className="text-sm text-muted-foreground">
              We apologize for the inconvenience. Please try refreshing the page or starting over.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 text-sm font-medium text-white bg-destructive hover:bg-destructive/90 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-destructive"
              >
                Refresh Page
              </button>
              <button
                onClick={this.handleReset}
                className="px-4 py-2 text-sm font-medium text-destructive bg-destructive/10 hover:bg-destructive/20 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-destructive"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easier use with function components
export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) {
  return function WithErrorBoundary(props: P) {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}