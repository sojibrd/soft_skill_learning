import Home from "./components/Home";
import { getNav } from "./lib/content";

/**
 * স্তরের এক-লাইনের পরিচয়। এটা কনটেন্ট নয়, নেভিগেশনের সাহায্য — তাই ডকে নয়,
 * এখানে থাকে। নতুন স্তরে এন্ট্রি না দিলে সাইট ভাঙে না, শুধু লাইনটা থাকে না।
 */
const GROUP_BLURBS: Record<string, string> = {
  "00-start": "সফট স্কিল আসলে কী, আর এই রোডম্যাপ কীভাবে ব্যবহার করবেন।",
  "01-self": "নিজের আবেগ ও সময় সামলানো — বাকি সবকিছুর ভিত্তি।",
  "02-thinking": "একা বসে স্পষ্ট চিন্তা করা ও সিদ্ধান্তে পৌঁছানো।",
  "03-interpersonal": "একজন মানুষের সাথে — শোনা, বোঝানো, মতবিরোধ সামলানো।",
  "04-influence": "অনেক মানুষের সাথে — উপরের তিন স্তরের যৌথ প্রয়োগ।",
};

export default function HomePage() {
  const groups = getNav().map((group) => ({
    id: group.id,
    label: group.label,
    blurb: GROUP_BLURBS[group.id] ?? "",
    items: group.items.map((doc) => ({ route: doc.route, title: doc.title })),
  }));

  return <Home groups={groups} />;
}
