<script lang="ts">
  import { onMount } from "svelte";

  export let data;

  let currentData = [];
  let summary = [];
  let username = data.user.key;

  let onlineCount = 0;
  let offlineCount = 0;
  let lastUpdated = "ขณะนี้";

  // Search variables
  let searchTerm = "";
  let filteredData = [];

  const timeAgo = (timestamp) => {
    const now = new Date();
    const updatedTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - updatedTime) / 60000);

    if (diffInMinutes < 1) return "minute ago";
    if (diffInMinutes === 1) return "1 minute";
    return `${diffInMinutes} minute`;
  };

  const getEmojiByLastUpdated = (timestamp) => {
    const now = new Date();
    const updatedTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - updatedTime) / 60000);
    return diffInMinutes <= 10 ? "🍏" : "🍎";
  };

  const updateSummary = () => {
    onlineCount = currentData.filter(
      (item) => getEmojiByLastUpdated(item.updatedAt) === "🍏"
    ).length;
    offlineCount = currentData.length - onlineCount;
    lastUpdated = new Date().toLocaleTimeString("th-TH");
  };

  $: {
    if (searchTerm) {
      filteredData = currentData.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      filteredData = currentData;
    }
  }

  function getscript() {
    const text = "hi mammoz";

    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("ข้อความถูกคัดลอกไปยังคลิปบอร์ดแล้ว!");
      })
      .catch((err) => {
        console.error("ไม่สามารถคัดลอกข้อความได้: ", err);
      });
  }

  async function fetchBotData() {
    try {
      const response = await fetch(`https://cm64clmjp0006mnbszzxgi07v.iservkmitl.tech/bot`, {
        method: "POST", // ใช้ POST method
        headers: {
          "Content-Type": "application/json", // ระบุว่า body เป็น JSON
        },
        body: JSON.stringify({ username }), // ส่ง username ผ่าน body
      });
      const newData = await response.json();
      currentData = newData.data;
      summary = newData.summary;
      updateSummary();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  onMount(() => {
    // updateSummary();
    fetchBotData();
    // เรียกใช้ fetchBotData ทุกๆ 10 วินาที
    const intervalId = setInterval(() => {
      fetchBotData();
    }, 10000); // ทุกๆ 10 วินาที

    // ทำความสะอาด interval เมื่อ component ถูกทำลาย
    return () => clearInterval(intervalId);
  });
</script>

<!-- <div>
  {#if username}
    <p>Token: {username}</p>
  {:else}
    <p>Please log in</p>
  {/if}
</div> -->

<div class="text-gray-200 min-h-screen p-8 bg-[#1b0d3b]">
  <!-- Stats Section -->
  <div class="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-4">
    <div class="bg-[#2d1b54] p-6 rounded-xl">
      <h3 class="text-white mb-2">Online</h3>
      <p class="text-green-400 text-4xl font-bold">{onlineCount}</p>
      <p class="text-white">Accounts</p>
    </div>
    <div class="bg-[#2d1b54] p-6 rounded-xl">
      <h3 class="text-white mb-2">Offline</h3>
      <p class="text-red-400 text-4xl font-bold">{offlineCount}</p>
      <p class="text-white">Accounts</p>
    </div>
    <div class="bg-[#2d1b54] p-6 rounded-xl">
      <h3 class="text-white mb-2">Time Remaining</h3>
      <p class="text-blue-400 text-4xl font-bold">7</p>
      <p class="text-white">Day</p>
    </div>
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 p-6 rounded-xl">
      <h3 class="text-white mb-2">Package</h3>
      <p class="text-white text-4xl font-bold">🐘 Owner</p>
      <p class="text-white">{username}</p>
    </div>
  </div>

  <div class="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-4 md:grid-cols-8">
    <div class="bg-[#1c306e] p-6 rounded-xl">
      <p class="text-2xl font-bold flex items-center">
        <img class="w-12" src="/serven.webp" alt="" srcset="" />
        <span class="text-blue-400 mr-2 px-3" id="last-updated-serven"
          >{summary.serven}</span
        >
      </p>
    </div>
    <div class="bg-[#1c306e] p-6 rounded-xl">
      <p class="text-2xl font-bold flex items-center">
        <img
          class="w-12"
          src="https://cdn-offer-photos.zeusx.com/3b7e36ed-53ea-4049-84e1-a0200e07d1e5.jpg"
          alt=""
          srcset=""
        />
        <span class="text-blue-400 mr-2 px-3" id="last-updated-god"
          >{summary.god}</span
        >
      </p>
    </div>
    <div class="bg-[#1c306e] p-6 rounded-xl">
      <p class="text-2xl font-bold flex items-center">
        <img class="w-12" src="/cdk.webp" alt="" srcset="" />
        <span class="text-blue-400 mr-2 px-3" id="last-updated-cdk"
          >{summary.cdk}</span
        >
      </p>
    </div>
    <div class="bg-[#1c306e] p-6 rounded-xl">
      <p class="text-2xl font-bold flex items-center">
        <img class="w-12" src="/Shark.webp" alt="" srcset="" />
        <span class="text-blue-400 mr-2 px-3" id="last-updated-sa"
          >{summary.sa}</span
        >
      </p>
    </div>
    <div class="bg-[#1c306e] p-6 rounded-xl">
      <p class="text-2xl font-bold flex items-center">
        <img class="w-12" src="/mirror.webp" alt="" srcset="" />
        <span class="text-blue-400 mr-2 px-3" id="last-updated-mirror"
          >{summary.mirror}</span
        >
      </p>
    </div>
    <div class="bg-[#1c306e] p-6 rounded-xl">
      <p class="text-2xl font-bold flex items-center">
        <img class="w-12" src="/valkyrie.webp" alt="" srcset="" />
        <span class="text-blue-400 mr-2 px-3" id="last-updated-valkyrie"
          >{summary.valkyrie}</span
        >
      </p>
    </div>
    <div class="bg-[#1c306e] p-6 rounded-xl">
      <p class="text-2xl font-bold flex items-center">
        <img class="w-12" src="/door.webp" alt="" srcset="" />
        <span class="text-blue-400 mr-2 px-3" id="last-updated-door"
          >{summary.door}</span
        >
      </p>
    </div>
    <div class="bg-[#1c306e] p-6 rounded-xl">
      <p class="text-2xl font-bold flex items-center">
        <img class="w-12" src="/heart.webp" alt="" srcset="" />
        <span class="text-blue-400 mr-2 px-3" id="last-updated-heart"
          >{summary.heart}</span
        >
      </p>
    </div>
    <div class="bg-[#1c306e] p-6 rounded-xl">
      <p class="text-2xl font-bold flex items-center">
        <img class="w-12" src="/sg.webp" alt="" srcset="" />
        <span class="text-blue-400 mr-2 px-3" id="last-updated-sg"
          >{summary.sg}</span
        >
      </p>
    </div>
    <div class="bg-[#1c306e] p-6 rounded-xl">
      <p class="text-2xl font-bold flex items-center">
        <img class="w-12" src="/moji.webp" alt="" srcset="" />
        <span class="text-blue-400 mr-2 px-3" id="last-updated-moji"
          >{summary.moji}</span
        >
      </p>
    </div>
    <div class="bg-[#1c306e] p-6 rounded-xl">
      <p class="text-2xl font-bold flex items-center">
        <img class="w-12" src="/dragon.webp" alt="" srcset="" />
        <span class="text-blue-400 mr-2 px-3" id="last-updated-dragon"
          >{summary.dragon}</span
        >
      </p>
    </div>
    <div class="bg-[#1c306e] p-6 rounded-xl">
      <p class="text-2xl font-bold flex items-center">
        <img class="w-12" src="/mammoz.webp" alt="" srcset="" />
        <span class="text-blue-400 mr-2 px-3" id="last-updated-mammoz"
          >{summary.mammoz}</span
        >
      </p>
    </div>
    <div class="bg-[#1c306e] p-6 rounded-xl">
      <p class="text-2xl font-bold flex items-center">
        <img class="w-12" src="/kiserni.webp" alt="" srcset="" />
        <span class="text-blue-400 mr-2 px-3" id="last-updated-kiserni"
          >{summary.kiserni}</span
        >
      </p>
    </div>
    <div class="bg-[#1c306e] p-6 rounded-xl">
      <p class="text-2xl font-bold flex items-center">
        <img class="w-12" src="/tiger.webp" alt="" srcset="" />
        <span class="text-blue-400 mr-2 px-3" id="last-updated-tiger"
          >{summary.tiger}</span
        >
      </p>
    </div>
    <div class="bg-[#1c306e] p-6 rounded-xl">
      <p class="text-2xl font-bold flex items-center">
        <img class="w-12" src="/yeti.webp" alt="" srcset="" />
        <span class="text-blue-400 mr-2 px-3" id="last-updated-yeti"
          >{summary.yeti}</span
        >
      </p>
    </div>
    <div class="bg-[#1c306e] p-6 rounded-xl">
      <p class="text-2xl font-bold flex items-center">
        <img class="w-12" src="/gas.webp" alt="" srcset="" />
        <span class="text-blue-400 mr-2 px-3" id="last-updated-gas"
          >{summary.gas}</span
        >
      </p>
    </div>
  </div>

  <div class="p-6">
    <div class="flex justify-end items-center">
      <span class="isolate inline-flex rounded-md shadow-sm">
        <button
          type="button"
          class="relative inline-flex items-center rounded-l-md text-white bg-indigo-600 px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-indigo-300 focus-visible:outline hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >⚙️Setting</button
        >
        <button
          type="button"
          class="relative -ml-px inline-flex items-center text-white bg-indigo-600 px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-indigo-300 focus-visible:outline hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >📄Sheet</button
        >
        <button
          type="button"
          on:click={getscript}
          class="relative -ml-px inline-flex items-center rounded-r-md text-white bg-indigo-600 px-3 py-2 text-sm font-semibold ring-1 ring-inset ring-indigo-300 focus-visible:outline hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >🎮Script</button
        >
      </span>
    </div>
  </div>

  <!-- Account Data Section -->
  <div class="bg-[#2d1b54] rounded-xl p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-white">Account Data</h2>
      <p class="text-gray-400">อัปเดตเมื่อ: {lastUpdated}</p>
    </div>

    <!-- Search Bar -->
    <div class="relative mb-6">
      <input
        type="text"
        id="searchInput"
        placeholder="Search"
        bind:value={searchTerm}
        class="w-full bg-gray-900/30 backdrop-blur-sm rounded-xl py-2 px-4 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <svg
        class="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="text-left border-b border-purple-800/50">
            <th class="py-2 px-4 text-purple-200">Status</th>
            <th class="py-2 px-4 text-purple-200">Account</th>
            <th class="py-2 px-4 text-purple-200">Type</th>
            <th class="py-2 px-4 text-purple-200">Melee</th>
            <th class="py-2 px-4 text-purple-200">Devil Fruit</th>
            <th class="py-2 px-4 text-purple-200">Fruit Inventori</th>
            <th class="py-2 px-4 text-purple-200">Level</th>
            <th class="py-2 px-4 text-purple-200">World</th>
            <th class="py-2 px-4 text-purple-200">Money</th>
            <th class="py-2 px-4 text-purple-200">Fragment</th>
            <th class="py-2 px-4 text-purple-200">Race</th>
            <th class="py-2 px-4 text-purple-200">Tier</th>
            <th class="py-2 px-4 text-purple-200">Mirror</th>
            <th class="py-2 px-4 text-purple-200">Valkyrie</th>
            <th class="py-2 px-4 text-purple-200">UnlockDoor</th>
            <th class="py-2 px-4 text-purple-200">Updated At</th>
          </tr>
        </thead>
        <tbody>
          {#each currentData as item}
            <tr class="border-t border-purple-800/30 hover:bg-purple-900/20">
              <td class="py-2 px-4">{getEmojiByLastUpdated(item.updatedAt)}</td>
              <td class="py-2 px-4">{item.account}</td>
              <td class="py-2 px-4">{item.type}</td>
              <td class="py-2 px-4">{item.melee}</td>
              <td class="py-2 px-4">{item.fruit}</td>
              <td class="py-2 px-4">{item.fruitInv}</td>
              <td class="py-2 px-4">{item.level}</td>
              <td class="py-2 px-4">{item.world}</td>
              <td class="py-2 px-4">{item.beli}</td>
              <td class="py-2 px-4">{item.fragment}</td>
              <td class="py-2 px-4">{item.race}</td>
              <td class="py-2 px-4">{item.tier}</td>
              <td class="py-2 px-4">{item.mirror ? "✅" : "❌"}</td>
              <td class="py-2 px-4">{item.valk ? "✅" : "❌"}</td>
              <td class="py-2 px-4">{item.unlockDoor ? "✅" : "❌"}</td>
              <td class="py-2 px-4">{timeAgo(item.updatedAt)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
