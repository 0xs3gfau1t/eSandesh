import React from "react";

import CriticCard from "./CriticCard";

export default function TopCritics() {
  return (
    <div className="mt-2 mb-4">
      <h2 className="font-bold text-2xl leading-loose">Top Critics</h2>
      <div>
        {/* list of critics */}
        <CriticCard
          name="Pasang Lhamu Sherpa"
          body="Jai Hanuman Gyan Guna Sagar Jai Kipis Tihun Lok Ujgaar Ramdoot Atulit Bal Dhamaa, Anjani Putra Pavansut naamaa"
        />
        <CriticCard
          name="Baburao Ganpatrao Apte"
          body="Uthale deva, uthale, mereko nahi, in dono ko uthale"
        />
        <CriticCard
          name="Sandesh GC"
          body="eSandesh is a modern news portal with new and innovative ideas. It is an online news portal that makes reading news and interacting with people easy and comfortable. It also has various tools to save your time and increase your productivity. I have been a regular user of this site for a week now and I am having a great experience here."
        />
      </div>
    </div>
  );
}
