// backend/utils/wellnessBotRules.js
// Rule-based wellness assistant
// Returns { reply: string, actions: [ {label, type, payload} ] }

function detectKeywords(text) {
  const t = (text || '').toLowerCase();
  return {
    cramps: /cramp|cramps|pain|period pain|menstrual pain/.test(t),
    tired: /tire|fatig|exhaust|sleepy|no energy|low energy/.test(t),
    cravings: /crav|choc|sugar|sweet|hungry|dessert/.test(t),
    bloated: /bloat|bloated|gassy|water retention/.test(t),
    mood: /sad|anxious|anxiety|moody|irrit|down|low mood/.test(t),
    food: /eat|food|meal|breakfast|lunch|dinner|snack/.test(t),
    hydrate: /thirst|dehydr|water|hydrate/.test(t),
    hello: /hi|hello|hey|hey there|yo/.test(t),
    thanks: /thank|thx|thanks|appreciate/.test(t),
    help: /help|advice|what should i|what can i|recommend|suggest/.test(t)
  };
}

function phaseFromProfile(profile) {
  if (!profile || !profile.lastPeriod) return { phase: 'unknown', day: 0 };
  const last = new Date(profile.lastPeriod);
  const now = new Date();
  const diff = Math.floor((now - last) / (1000 * 60 * 60 * 24));
  const len = profile.cycleLength || 28;
  const day = (diff % len) + 1;

  if (day <= 5) return { phase: 'menstrual', day };
  if (day <= 13) return { phase: 'follicular', day };
  if (day === 14) return { phase: 'ovulation', day };
  return { phase: 'luteal', day };
}

function mealSuggestionsForPhase(phase) {
  if (phase === 'menstrual')
    return ['Spinach + lentils bowl', 'Iron-rich oats with berries', 'Beetroot salad'];
  if (phase === 'follicular')
    return ['Grilled salmon + quinoa', 'Egg & avocado toast', 'Greek yogurt + seeds'];
  if (phase === 'ovulation')
    return ['Pumpkin seeds + citrus', 'Zinc-rich oysters (or pumpkin seeds)', 'Citrus salad'];
  if (phase === 'luteal')
    return ['Banana + almond butter', 'Dark chocolate (70%) + nuts', 'Warm soup with ginger'];
  return ['Mixed salad bowl', 'Smoothie with greens', 'Yogurt + fruit'];
}

function generateReply(message, profile, session = {}) {
  const keys = detectKeywords(message);
  const p = phaseFromProfile(profile);

  const phaseNote = {
    menstrual: 'You’re in your menstrual phase — gentle care, warm compresses and iron-rich meals help.',
    follicular: 'Follicular phase — energy often rises; protein and greens are great now.',
    ovulation: 'Ovulation — zinc and vitamin C foods support reproductive health.',
    luteal: 'Luteal phase — magnesium & B6 can ease mood swings and bloating.'
  }[p.phase] || 'Tell me how you’re feeling and I’ll give small, science-aligned tips.';

  const actions = [];
  const memoryHint = (session?.history || [])
    .slice(-6)
    .map((h) => h.text)
    .join(' | ')
    .toLowerCase();

  // --- Keyword responses ---
  if (keys.cramps) {
    actions.push({ label: '3-min stretch', type: 'suggest', payload: 'Short stretch routine: child pose 1 min, gentle twists 1 min, knees-to-chest 1 min' });
    actions.push({ label: 'Warm compress', type: 'suggest', payload: 'Use a warm water bottle on lower belly for 10-15 minutes' });
    return { 
      reply: `${phaseNote} Sorry to hear about cramps 💗 Try a warm compress, gentle stretching, and iron-rich foods like spinach or lentils. Want a 3-minute stretch routine?`, 
      actions 
    };
  }

  if (keys.tired) {
    actions.push({ label: 'Quick energy snack', type: 'suggest', payload: 'Try a snack: banana + peanut butter, or yogurt + seeds' });
    actions.push({ label: 'Short walk', type: 'suggest', payload: 'A 10-minute gentle walk outside can boost energy' });
    return { 
      reply: `${phaseNote} Feeling low on energy is common. Try a balanced snack, warm tea, or a short gentle walk. Want a snack suggestion?`, 
      actions 
    };
  }

  if (keys.cravings) {
    actions.push({ label: 'Healthy chocolate ideas', type: 'suggest', payload: 'Dark chocolate + almond butter, or cocoa smoothie with banana' });
    actions.push({ label: 'Protein pairing', type: 'suggest', payload: 'Pair a small sweet with protein (e.g., 1 piece dark chocolate + greek yogurt)' });
    return { 
      reply: `Cravings are totally normal 🌸 Try pairing sweets with protein to stabilise blood sugar. Want a quick snack list?`, 
      actions 
    };
  }

  if (keys.bloated) {
    actions.push({ label: 'Peppermint tea', type: 'suggest', payload: 'Peppermint tea or ginger tea can help with bloating' });
    actions.push({ label: 'Gentle walk', type: 'suggest', payload: 'Try a 10-minute gentle walk after meals' });
    return { 
      reply: `Bloating can be eased by gentle movement and herbal teas. Reduce very salty foods and try peppermint or ginger tea.`, 
      actions 
    };
  }

  if (keys.mood) {
    actions.push({ label: 'Breathing guide', type: 'suggest', payload: 'Breathing: inhale 4s, hold 4s, exhale 6s — do for 1-2 minutes' });
    actions.push({ label: 'Cozy routine', type: 'open', payload: '/profile' });
    return { 
      reply: `I’m sorry you’re feeling low 💞 You can try a 2-minute breathing exercise or a cozy routine (warm drink, journaling). Want a breathing guide?`, 
      actions 
    };
  }

  if (keys.food) {
    const meals = mealSuggestionsForPhase(p.phase);
    actions.push({ label: meals[0], type: 'suggest', payload: meals[0] });
    actions.push({ label: meals[1], type: 'suggest', payload: meals[1] });
    actions.push({ label: 'More ideas', type: 'open', payload: '/profile' });
    return { 
      reply: `${phaseNote} Here are a few meal ideas for right now: ${meals.join(' • ')}. Want recipes or quick how-to?`, 
      actions 
    };
  }

  if (keys.hydrate) {
    actions.push({ label: 'Set reminder', type: 'open', payload: '/reminders' });
    return { reply: `Hydration helps with many symptoms. Aim for small sips across the day. Want to set a hydration reminder?`, actions };
  }

  if (keys.hello) {
    actions.push({ label: 'How are you?', type: 'suggest', payload: 'I feel a bit off' });
    return { reply: `Hi ${profile?.name || 'love'} 🌸 — how are you feeling today? (cramps, tired, cravings, bloated, mood)`, actions };
  }

  if (memoryHint.includes('cramps')) {
    actions.push({ label: 'Stretch again', type: 'suggest', payload: 'Repeat the 3-min stretch: child pose, twists, knees-to-chest' });
    return { reply: `You mentioned cramps earlier — a warm compress + short stretches helped many users. Want to log this as a symptom?`, actions };
  }

  // Default fallback
  const fallbackActions = [
    { label: 'Cramps 😣', type: 'suggest', payload: 'Cramps 😣' },
    { label: 'Low energy 🥱', type: 'suggest', payload: 'Low energy 🥱' },
    { label: 'Meal ideas 🍽', type: 'suggest', payload: 'Need meal ideas' }
  ];

  return { 
    reply: `${phaseNote} I can help with quick tips for cramps, low energy, cravings, or meal ideas — what would you like?`, 
    actions: fallbackActions 
  };
}

module.exports = { generateReply };
