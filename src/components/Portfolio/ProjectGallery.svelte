<script lang="ts">
  import { fade } from 'svelte/transition';
  import { onMount, tick } from 'svelte';

  export let images: string[] = [];
  export let title: string = 'Project';

  let selectedIndex: number | null = null;
  let mounted = false;
  let mediaEls: Array<HTMLElement | null> = [];
  let touchStartX = 0;
  let touchEndX = 0;

  onMount(() => {
    mounted = true;
  });

  function toPublicUrl(path: string): string {
    // Handles spaces/accents in folder + file names under /public.
    // encodeURI keeps slashes while encoding characters like spaces, é, etc.
    // Also encode characters encodeURI leaves as-is but can be problematic in URLs.
    return encodeURI(path)
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29');
  }

  $: media = Array.from(
    new Set((images || []).filter(Boolean))
  );

  async function openLightbox(index: number) {
    selectedIndex = index;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
    await tick();
    mediaEls[index]?.scrollIntoView({ block: 'start' });
  }

  function closeLightbox() {
    selectedIndex = null;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  function nextImage(e?: MouseEvent) {
    if (e) e.stopPropagation();
    if (selectedIndex !== null && images.length > 0) {
      selectedIndex = (selectedIndex + 1) % images.length;
    }
  }

  function prevImage(e?: MouseEvent) {
    if (e) e.stopPropagation();
    if (selectedIndex !== null && images.length > 0) {
      selectedIndex = (selectedIndex - 1 + images.length) % images.length;
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (selectedIndex === null) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowDown') nextImage();
    if (e.key === 'ArrowUp') prevImage();
  }

  function handleTouchStart(e: TouchEvent) {
    touchStartX = e.changedTouches[0].screenX;
  }

  function handleTouchEnd(e: TouchEvent) {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) nextImage();
    if (touchEndX > touchStartX + 50) prevImage();
  }

  function isVideo(url: string): boolean {
    return url.toLowerCase().endsWith('.mp4');
  }

  $: currentImage = selectedIndex !== null && media[selectedIndex] ? media[selectedIndex] : null;
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- Gallery Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
  {#each media as img, index}
    <button 
      type="button"
      class="relative aspect-video rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 hover:border-neutral-600 transition-colors cursor-pointer group text-left w-full {index === 0 ? 'md:col-span-2' : ''}"
      on:click={() => openLightbox(index)}
    >
      {#if isVideo(img)}
        <video 
          src={toPublicUrl(img)} 
          class="w-full h-full object-cover"
          muted
          loop
          playsinline
          preload="metadata"
        >
          <track kind="captions" />
        </video>
        <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div class="bg-black/50 rounded-full p-3 backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      {:else}
        <img 
          src={toPublicUrl(img)} 
          alt="{title} view {index + 1}"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      {/if}
      
      <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <span class="text-white font-medium px-4 py-2 bg-black/50 rounded-full backdrop-blur-md">
          Agrandir
        </span>
      </div>
    </button>
  {/each}
</div>

<!-- Lightbox Overlay -->
{#if selectedIndex !== null && currentImage}
  <div 
    class="fixed inset-0 z-[9999] bg-black flex flex-col"
    transition:fade={{ duration: 200 }}
    role="dialog"
    aria-modal="true"
    aria-label="Galerie d'images"
  >
    <!-- Top Bar with Back Button -->
    <div class="flex items-center justify-between p-4 bg-black/80 backdrop-blur-sm shrink-0">
      <button 
        type="button"
        class="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        on:click={closeLightbox}
        aria-label="Retour"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span class="text-sm font-medium">Retour</span>
      </button>
      
      <div class="text-white/60 text-sm">
        {selectedIndex + 1} / {media.length}
      </div>

      <button 
        type="button"
        class="text-white/70 hover:text-white p-2"
        on:click={closeLightbox}
        aria-label="Fermer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Scrollable Fullscreen Viewer -->
    <div
      class="flex-1 overflow-y-auto min-h-0"
      on:touchstart={handleTouchStart}
      on:touchend={handleTouchEnd}
    >
      {#each media as item, idx}
        <div
          class="w-full flex items-center justify-center px-4 py-10 md:py-14"
          bind:this={mediaEls[idx]}
        >
          {#if isVideo(item)}
            <video
              src={toPublicUrl(item)}
              class="max-w-full max-h-[85vh] object-contain rounded-lg"
              controls
              autoplay={idx === selectedIndex}
              preload="metadata"
            >
              <track kind="captions" />
            </video>
          {:else}
            <img
              src={toPublicUrl(item)}
              alt="{title} - vue {idx + 1}"
              class="max-w-full max-h-[85vh] object-contain rounded-lg"
              loading={idx === selectedIndex ? 'eager' : 'lazy'}
            />
          {/if}
        </div>
      {/each}
    </div>
  </div>
{/if}
