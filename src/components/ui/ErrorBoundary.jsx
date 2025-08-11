import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console
    console.error("Error caught by boundary:", error, errorInfo);

    // Update state with error details
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 bg-gradient-to-br from-red-100 to-red-300 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-red-800 mb-4">
              เกิดข้อผิดพลาด
            </h2>
            <p className="text-gray-600 mb-6">
              แอปพลิเคชันเกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองใหม่อีกครั้ง
            </p>

            {this.state.error && (
              <details className="text-left mb-6 p-4 bg-gray-100 rounded-lg">
                <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                  รายละเอียดข้อผิดพลาด
                </summary>
                <pre className="text-xs text-gray-600 overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
              >
                ลองใหม่
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
              >
                รีเฟรชหน้า
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
