// ─── Story Data ───────────────────────────────────────────────────────────────
// All emotional content for Abhijit Singha's inner world
// Customize freely — this is the soul of the experience

export const EMOTIONAL_QUOTES = [
  {
    id: 1,
    text: "She was never just another person to him — she became the place his heart returned to every night.",
    scene: "love",
  },
  {
    id: 2,
    text: "He did not fear losing the world. He feared losing her attention for even a moment.",
    scene: "love",
  },
  {
    id: 3,
    text: "Some people break hearts through hatred. He broke hers while trying too hard to protect his own.",
    scene: "regret",
  },
  {
    id: 4,
    text: "He kept loving her quietly, even after becoming a memory in her life.",
    scene: "love",
  },
  {
    id: 5,
    text: "She moved forward with life while he stayed behind inside old conversations and unfinished feelings.",
    scene: "fading",
  },
  {
    id: 6,
    text: "She was the only person who ever made loneliness feel less heavy.",
    scene: "love",
  },
  {
    id: 7,
    text: "Friends don't vanish. They just slowly stop turning around.",
    scene: "friendship",
  },
  {
    id: 8,
    text: "He smiled in every photo. No one ever asked why his eyes looked tired.",
    scene: "hidden",
  },
  {
    id: 9,
    text: "The hardest part isn't being forgotten. It's watching people forget slowly, one unanswered message at a time.",
    scene: "messages",
  },
  {
    id: 10,
    text: "Some nights the silence is so loud it sounds like everyone who left.",
    scene: "night",
  },
  {
    id: 11,
    text: "He never asked for much. Just to matter to someone who stayed.",
    scene: "lonely",
  },
  {
    id: 12,
    text: "His overthinking wasn't cruelty. It was a frightened love that didn't know how to be quiet.",
    scene: "regret",
  },
]

// ─── Fake Chat Conversations ──────────────────────────────────────────────────
export const FADED_CONVERSATIONS = [
  {
    id: 1,
    name: "Riya",
    avatar: "R",
    lastSeen: "last seen 2 years ago",
    status: "read",
    messages: [
      { from: "them", text: "You coming to the trip this weekend?", time: "9:42 AM" },
      { from: "me",   text: "Yeah, can't wait 🙂",                  time: "9:44 AM" },
      { from: "them", text: "Great! It'll be fun.",                 time: "9:45 AM" },
      // Then silence
    ],
    fadedNote: "She stopped replying after the trip. The group moved on.",
  },
  {
    id: 2,
    name: "Arjun",
    avatar: "A",
    lastSeen: "last seen 1 year ago",
    status: "unread",
    messages: [
      { from: "me",   text: "Hey, you free to talk?",        time: "11:23 PM" },
      { from: "me",   text: "Just wanted to catch up",       time: "11:24 PM" },
      { from: "me",   text: "No worries if you're busy 🙂",  time: "11:58 PM" },
    ],
    fadedNote: "He was never really busy. He just stopped caring.",
  },
  {
    id: 3,
    name: "Her",
    avatar: "♡",
    lastSeen: "last seen a lifetime ago",
    status: "delivered",
    messages: [
      { from: "me",   text: "I know I made mistakes.",                          time: "2:14 AM" },
      { from: "me",   text: "I'm sorry for being too much.",                    time: "2:15 AM" },
      { from: "me",   text: "You deserved better than my overthinking.",        time: "2:16 AM" },
      { from: "me",   text: "I hope wherever you are, you feel free.",          time: "2:17 AM" },
    ],
    fadedNote: "Two blue ticks. No reply. He still checks sometimes.",
    isHer: true,
  },
  {
    id: 4,
    name: "Mom",
    avatar: "M",
    lastSeen: "online",
    status: "read",
    messages: [
      { from: "them", text: "Beta, khana khaya?",       time: "8:00 PM" },
      { from: "me",   text: "Haan Ma.",                  time: "8:47 PM" },
      { from: "them", text: "Theek hai. Soja time pe.",  time: "8:48 PM" },
    ],
    fadedNote: "She asks every day. She never asks how he really feels.",
  },
]

// ─── Diary Entries ────────────────────────────────────────────────────────────
export const DIARY_ENTRIES = [
  {
    date: "March 14th — 3:18 AM",
    entry: `I don't know why I'm writing this. Maybe because there's no one left to say it to.

I watched everyone from the outside today. They laughed. They made plans. They checked if each other were okay.

No one checked on me. And I kept smiling so they wouldn't have to.

That's the thing about being the 'strong one' — you become invisible.`,
  },
  {
    date: "July 7th — 1:42 AM",
    entry: `She texted someone else the same things she used to say to me. I saw it. I wasn't supposed to.

It didn't feel like betrayal. It felt like confirmation — that what I thought was ours was just something she does with everyone.

I sat with that feeling until 4 AM. Then I wished her well in my head, turned off the light, and pretended to sleep.`,
  },
  {
    date: "November 22nd — 12:00 AM",
    entry: `My birthday.

Mom called. Three friends sent emojis. One actually called.

I spent the evening alone, watching the city from my window. The rain was heavy.

I thought — maybe this is just who I am. The person who feels everything deeply and means it. And maybe that's why I always end up alone.

I think I'm okay with that now.

I think.`,
  },
  {
    date: "February 2nd — 4:55 AM",
    entry: `I keep replaying the moment she said "you need to stop overthinking."

She was right. She always was.

But the thing is — I wasn't overthinking nothing. I was overthinking her, because she was everything I was afraid to lose.

I became the thing I was afraid of. The distance. The weight. The burden.

I'm sorry. I still am. I probably always will be.`,
  },
]

// ─── Notification Ghost Data ──────────────────────────────────────────────────
export const GHOST_NOTIFICATIONS = [
  { app: "Messages",  text: "Her — typing…",               time: "2 years ago",  faded: true  },
  { app: "Instagram", text: "Arjun liked your photo",       time: "1 year ago",   faded: true  },
  { app: "WhatsApp",  text: "Riya added you to a group",    time: "3 years ago",  faded: true  },
  { app: "Messages",  text: "1 unread message from Her",    time: "never sent",   faded: true  },
  { app: "Reminder",  text: "Tell her how you feel",        time: "too late",     faded: true  },
]

// ─── Scene Titles ─────────────────────────────────────────────────────────────
export const SCENES = [
  { id: "intro",      title: "A Quiet Existence",        subtitle: "Abhijit Singha"              },
  { id: "friends",    title: "They All Left Eventually",  subtitle: "Scene I — Fading Friendships" },
  { id: "messages",   title: "Delivered. Never Replied.", subtitle: "Scene II — Unread"            },
  { id: "love",       title: "She Was Everything",        subtitle: "Scene III — The One"         },
  { id: "family",     title: "Surrounded But Alone",      subtitle: "Scene IV — Distance"         },
  { id: "diary",      title: "What He Never Said Aloud",  subtitle: "Scene V — The Archive"       },
  { id: "ending",     title: "He's Still Here",           subtitle: "Scene VI — Quietly"          },
]
