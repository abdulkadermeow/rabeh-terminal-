export interface AgentDecision {
  agent: 'Scanner' | 'Analyst' | 'DevilsAdvocate' | 'Manager';
  status: 'pending' | 'approved' | 'rejected';
  message: string;
}

export interface LayaFilter {
  isHalal: boolean;
  newsSentiment: 'Bull' | 'Bear' | 'Neutral';
  worthLook: boolean;
}