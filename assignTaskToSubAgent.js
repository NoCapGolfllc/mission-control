// Role affinity mapping for sub-agents (similar to main agent routing)
const SUB_AGENT_AFFINITY = {
  coder: ['code', 'implement', 'build', 'fix', 'bug', 'test', 'unit test', 'refactor', 'feature', 'api', 'endpoint', 'function', 'class', 'module', 'component', 'deploy', 'ci', 'pipeline'],
  researcher: ['research', 'investigate', 'analyze', 'compare', 'find', 'discover', 'audit', 'review', 'survey', 'benchmark', 'evaluate', 'assess', 'competitor', 'market', 'trend'],
  reviewer: ['review', 'audit', 'check', 'verify', 'validate', 'quality', 'security', 'compliance', 'approve'],
  tester: ['test', 'qa', 'e2e', 'integration test', 'regression', 'coverage', 'verify', 'validate'],
  devops: ['deploy', 'infrastructure', 'ci', 'cd', 'docker', 'kubernetes', 'monitoring', 'pipeline', 'server', 'nginx', 'ssl'],
  writer: ['write', 'draft', 'summarize', 'translate', 'format', 'document', 'docs', 'readme', 'email', 'message', 'report'],
  assistant: ['help', 'assist', 'support', 'guide', 'explain', 'clarify'], // generic fallback
⁵  }

  // Any sub-agent gets at least 1 (can be a fallback)
  return Math.max(score, 1);
}

function assignTaskToSubAgent(taskDetails) {
  // Logic to choose and assign the task to a specific sub-agent

  // Available sub-agents (this would come from agent config in real implementation)
  const availableSubAgents = ['coder', 'researcher', 'reviewer', 'tester', 'devops', 'writer', 'assistant'];

  // Build task text for analysis
  const taskText = `${taskDetails.title || ''} ${taskDetails.description || ''} ${taskDetails.tags ? taskDetails.tags.join(' ') : ''}`;

  // Score each available sub-agent
  const scored = availableSubAgents
    .map(subAgent => ({
      subAgent,
      score: scoreSubAgentForTask(subAgent, taskText)
    }))
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score);

  // Return the best match
  if (scored.length > 0 && scored[0].score > 1) { // Require at least some relevance
    return scored[0].subAgent;
  } else {
    // Default to assistant for general tasks
    return 'assistant';
  }
}

// Example usage:
// const assignedSubAgent = assignTaskToSubAgent({
//   title: "Fix the login bug",
//   description: "The login form is not validating passwords correctly",
//   tags: ["bug", "frontend", "urgent"]
// });
// console.log(assignedSubAgent); // "coder"