<div class="bg-[#2d1a64] flex justify-center items-center h-screen">
  <!-- Left: Image -->
  <div class="w-1/2 h-screen">
    <img
      src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat"
      alt=""
      class="object-cover w-full h-full"
    />
  </div>
  <!-- Right: Login Form -->
  <div class="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 text-white">
    <h1 class="text-2xl font-semibold mb-4">Login</h1>
    <div class="mb-4">
      <form method="POST">
        <label for="username" class="block text-white">Key</label>
        <input
          type="text"
          name="key"
          class="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
          autocomplete="off"
        />
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</div>
