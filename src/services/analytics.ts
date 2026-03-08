type EventType = 
  | 'HACK_MODE_TOGGLE' 
  | 'CONSOLE_OPEN' 
  | 'COMMAND_EXECUTED' 
  | 'BRIEF_SUBMIT' 
  | 'BLUEPRINT_OPEN'
  | 'NAV_CLICK';

class AnalyticsService {
  private static instance: AnalyticsService;
  private events: { type: EventType; timestamp: number; metadata?: any }[] = [];

  private constructor() {}

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  public track(type: EventType, metadata?: any) {
    const event = {
      type,
      timestamp: Date.now(),
      metadata
    };
    this.events.push(event);
    
    // In a real app, this would send to a backend or GA4
    console.log(`[ANALYTICS] ${type}`, metadata || '');
    
    // Persist in session for debug
    sessionStorage.setItem('1618_analytics', JSON.stringify(this.events));
  }

  public getEvents() {
    return this.events;
  }
}

export const analytics = AnalyticsService.getInstance();
