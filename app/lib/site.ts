/**
 * সাইটের পরিচয় আর সেটিং — plan-এর কনটেন্ট নয়, তাই `docs/`-এ নয়, এখানে।
 *
 * chassis `behavioural_interview_local_company` থেকে; তিন repo-র পরিবার নয়, একটাই সাইট।
 */
export const SITE: {
  title: string;
  short: string;
  emoji: string;
  description: string;
  storagePrefix: string;
  suggestedStart: string | null;
} = {
  title: "সফট স্কিল",
  short: "সফট স্কিল",
  emoji: "🤝",
  description:
    "সফট স্কিলের ৯০টা drill, ৯৪ দিনে — দিনে একটা, আজ একবার, আসল কথোপকথনে; চার স্তরে নির্ভরতার ক্রমে, learning to learn-এর নীতিতে।",
  /** localStorage key-এর prefix — পুরনো সাইটের `ssl` রাখা, স্কিমা নতুন (`start`/`task`/`check`/`review`) */
  storagePrefix: "ssl",
  /** সময় ⏳ — সপ্তাহে ৭ ঘণ্টার ভেতরে না বাইরে, ব্যবহারকারীর উত্তর বাকি; তাই প্রস্তাব নেই */
  suggestedStart: null,
};
