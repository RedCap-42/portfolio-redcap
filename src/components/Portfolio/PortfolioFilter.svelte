<script lang="ts">
  import { portfolioData, type PortfolioItem } from '../../data/portfolio';
  import { fade, fly } from 'svelte/transition';

  let currentFilter = 'Tout';
  const categories = ['Tout', '3D Général', 'Pets Minecraft', 'Motion Graphics'];

  $: filteredItems = currentFilter === 'Tout' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === currentFilter);

  function setFilter(category: string) {
    currentFilter = category;
  }
</script>

<div class="w-full mb-8">
  <!-- Filter Bar -->
  <div class="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
    {#each categories as category}
      <button
        on:click={() => setFilter(category)}
        class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border border-neutral-700
        {currentFilter === category 
          ? 'bg-white text-black border-white' 
          : 'bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white'}"
      >
        {category}
      </button>
    {/each}
  </div>

  <!-- Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each filteredItems as item (item.id)}
      <a 
        href={`/portfolio/${item.id}`}
        class="group relative block aspect-square overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-colors"
        in:fly={{ y: 20, duration: 300 }}
      >
        <!-- Image or Video -->
        {#if item.coverImage.endsWith('.mp4')}
          <video 
            src={item.coverImage} 
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            autoplay muted loop playsinline
          ></video>
        {:else}
          <img 
            src={item.coverImage} 
            alt={item.title}
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        {/if}
        
        <!-- Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
        
        <!-- Content -->
        <div class="absolute bottom-0 left-0 p-4 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <span class="text-xs font-mono text-neutral-400 mb-1 block">{item.category}</span>
          <h3 class="text-lg font-bold text-white m-0">{item.title}</h3>
        </div>
      </a>
    {/each}
  </div>
</div>
