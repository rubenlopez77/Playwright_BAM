export interface LogEvent {
  timestamp: string;
  component: string;
  action: string;
  selector?: string;
  duration?: number;
  success?: boolean;
  error?: string;
  scenarioName?: string;
  featureName?: string;
  tags?: string[];
  stepText?: string;
  status?: string;
  browser: string;
}
