
import { LevelData } from './types';

export const LEVELS: LevelData[] = [
  {
    level: 1,
    title: "Foundations of Logic",
    type: "Simple Reasoning",
    puzzle: "If all roses are flowers and some flowers fade quickly, can we conclude that some roses fade quickly? Explain your reasoning.",
  },
  {
    level: 2,
    title: "Analytical Mindset",
    type: "Math & Problem Solving",
    puzzle: "A train leaves at 3 PM traveling 60 km/h. Another leaves at 4 PM traveling 80 km/h. When will the second train catch up? Provide the time and how you calculated it.",
  },
  {
    level: 3,
    title: "Creative Thinking",
    type: "Abstract Innovation",
    puzzle: "Imagine you are stranded on an island with a rope, a bucket, and a mirror. How could you use these to collect fresh water?",
  },
  {
    level: 4,
    title: "Strategic Decision Making",
    type: "Finance & Risk Strategy",
    puzzle: "You have $1,000. You can invest in:\n1. A savings account (2% return)\n2. A startup (50% chance of doubling, 50% chance of losing all)\n3. A balanced fund (5% return)\nWhich option do you choose and why?",
  },
  {
    level: 5,
    title: "Holistic Intelligence",
    type: "Adaptive Leadership",
    puzzle: "You are leading a team under stress. Productivity is dropping. You can:\n1. Push harder with strict deadlines.\n2. Introduce relaxation breaks and creative brainstorming.\n3. Reassign tasks to balance workload.\nWhich do you choose and how would you execute it to ensure long-term success?",
  }
];

export const HOW_IT_WORKS = {
  title: "The 360IQ Methodology",
  sections: [
    {
      heading: "Multidimensional Assessment",
      text: "Unlike traditional IQ tests that focus solely on pattern recognition, 360IQ evaluates five distinct cognitive pillars: Deductive Logic, Analytical Processing, Divergent Creativity, Strategic Risk Management, and Adaptive Leadership."
    },
    {
      heading: "Powered by WealthMind Psychology",
      text: "Our evaluation framework is built upon the WealthMind Psychology proprietary cognitive model. This model analyzes not just the correctness of your answer, but the linguistic patterns, risk tolerance, and innovative depth of your reasoning."
    },
    {
      heading: "Real-time AI Synthesis",
      text: "Utilizing advanced Gemini 3 models, your responses are parsed through a specialized psychological prompt architecture to provide instant feedback and personality profiling."
    }
  ]
};

export const PRIVACY_POLICY = {
  title: "Privacy & Data Security",
  sections: [
    {
      heading: "Ephemeral Data Processing",
      text: "360IQ is designed with a 'Privacy-First' architecture. Your answers are processed in real-time and are not stored in any permanent database. Once you close your session, your specific answers are purged."
    },
    {
      heading: "AI Interaction",
      text: "Your responses are sent to Google Gemini APIs for evaluation. No personal identifying information (PII) like your name or email is shared with the AI or collected by 360IQ."
    },
    {
      heading: "Cookie Usage",
      text: "We do not use tracking cookies. Your session state is maintained locally in your browser memory for the duration of the game only."
    }
  ]
};
