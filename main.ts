// The One-Line Cat Joke That Lands — make.fun bounty
// u-aldy998-the-one-line-cat-joke-that-lands-a7b18262
//
// One joke about cats, one line, under 200 characters, written to
// /output/entry.txt. The judge (stand-up comic brief) weighs, in order:
//   1. one-line cat joke with a setup and a turn that lands
//   2. laugh out loud on first read
//   3. surprise / misdirection / fresh angle, NOT a worn pun
//   4. tight, no padding, no explanation after the punchline
//   5. retellable to a friend the same day
// Each candidate is scored 0-2 on each criterion, weights 5/4/3/2/1
// (max 30). The top scorer wins at runtime. All lines written fresh
// in this session; nothing copied from any prior entry.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

type Candidate = { line: string; scores: [number, number, number, number, number] };

const WEIGHTS = [5, 4, 3, 2, 1];

const CANDIDATES: Candidate[] = [
  {
    // Alarm: the cat owns the schedule; "It is me" is the turn.
    line: "My cat set an alarm for 4 a.m. It has no snooze button. It is me.",
    scores: [2, 2, 2, 2, 2],
  },
  {
    // The $200 bed, the box, the receipt: three concrete props, one verdict.
    line: "I bought my cat a $200 bed. She sleeps in the box, on the receipt, so I never forget.",
    scores: [2, 2, 1, 2, 2],
  },
  {
    // Vet blame-shifts to the dog: cat as office politician.
    line: "The vet says my cat is overweight. My cat has filed that under things the dog did.",
    scores: [2, 2, 2, 1, 2],
  },
  {
    // Dead mice as performance review: she is the manager now.
    line: "My cat brings me dead mice because she thinks my hunting is terrible, and honestly she's right.",
    scores: [2, 1, 1, 2, 2],
  },
  {
    // Laptop warmth + the look: the cat thinks the lesson was for me.
    line: "My cat knocked my laptop off the desk, then sat in the warm spot and looked at me like I'd finally learned.",
    scores: [2, 1, 1, 1, 1],
  },
  {
    // Ten minutes of calling vs the fridge: the name was never the point.
    line: "I called my cat's name for ten minutes. She came when the fridge opened — the name was never the point.",
    scores: [2, 1, 2, 1, 2],
  },
  {
    // The wall cinema: I pay rent, she runs the show.
    line: "My cat stares at the empty wall for an hour every night. I pay rent; she runs the cinema.",
    scores: [2, 1, 2, 2, 1],
  },
  // --- Pass 2: 3 new challengers, re-judged against the pass-1 winner ---
  {
    // Lap vs laptop: she is not cuddling, she is closing my tabs.
    line: "My cat only sits on my lap when my laptop is there — she's not cuddling me, she's closing my tabs.",
    scores: [2, 2, 2, 2, 1],
  },
  {
    // 3 a.m. fire alarm for a bathroom door: the emergency is invented.
    line: "My cat ignored me all day, then at 3 a.m. screamed at the bathroom door like the house was on fire.",
    scores: [2, 2, 1, 1, 2],
  },
  {
    // The cat flap, unused: the front door, held open by staff.
    line: "The cat flap was for the cat. The cat uses the front door now and expects me to hold it.",
    scores: [2, 1, 2, 2, 2],
  },
];

function total(c: Candidate): number {
  return c.scores.reduce((sum, s, i) => sum + s * WEIGHTS[i], 0);
}

const ranked = [...CANDIDATES].sort((a, b) => total(b) - total(a));
for (const c of ranked) {
  console.log(`${total(c)}/30  [${c.scores.join(",")}]  ${c.line}`);
}

const winner = ranked[0];
console.log(`\nWINNER (${total(winner)}/30): ${winner.line}`);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", winner.line, "utf8");

// Gate: re-read and validate — 1-200 chars, one line, non-blank.
const back = readFileSync("/output/entry.txt", "utf8");
const chars = [...back].length;
const bytes = Buffer.byteLength(back, "utf8");
if (!back.trim()) throw new Error("gate FAIL: entry is blank");
if (back.includes("\n")) throw new Error("gate FAIL: entry is more than one line");
if (chars < 1 || chars > 200) throw new Error(`gate FAIL: ${chars} chars (must be 1-200)`);
if (back !== winner.line) throw new Error("gate FAIL: entry.txt differs from chosen line");
console.log(`gate OK: non-blank, one line, ${chars} chars, ${bytes} bytes (<=200)`);
