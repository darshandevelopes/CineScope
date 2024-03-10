export function formatVoteCount(votes) {
  if (votes >= 1e9) {
    return (votes / 1e9).toFixed(1) + 'B';
  }
  if (votes >= 1e6) {
    return (votes / 1e6).toFixed(1) + 'M';
  }
  if (votes >= 1e3) {
    return (votes / 1e3).toFixed(1) + 'K';
  }
  return votes.toString();
}
