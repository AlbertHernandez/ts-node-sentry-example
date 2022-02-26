export interface ErrorTracker {
  trackError(error: Error): void;
}
