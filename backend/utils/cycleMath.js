function calculateCyclePhase(lastPeriodDate, cycleLength = 28) {
  if (!lastPeriodDate) return { phase: "Unknown", day: null };

  const start = new Date(lastPeriodDate);
  const now = new Date();

  const diffDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  const day = (diffDays % cycleLength) + 1;

  let phase = "Unknown";

  if (day >= 1 && day <= 5) phase = "Menstrual";
  else if (day >= 6 && day <= 13) phase = "Follicular";
  else if (day >= 14 && day <= 16) phase = "Ovulation";
  else phase = "Luteal";

  const nextPeriod = new Date(start);
  nextPeriod.setDate(start.getDate() + cycleLength);

  return { phase, day, nextPeriod };
}

module.exports = { calculateCyclePhase };
