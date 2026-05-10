type Session = {
  step: string;
  history: any[];
};

const sessions = new Map<string, Session>();

export function getSession(sessionId: string): Session {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      step: "start",
      history: [],
    });
  }

  return sessions.get(sessionId)!;
}