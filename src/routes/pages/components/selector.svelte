<script>
import { onMount } from 'svelte';
import Expand from "svelte-material-icons/ChevronDown.svelte"

let isOpen = false

export let value
export let options = [];
export let placeholder;

function selectOption(selected) {
    value = selected
}

  onMount(() => {
    function handleClickOutside(event) {
      const div = document.querySelector('.selector');

      if (div && !div.contains(event.target)) {
        // Clicked outside the div, perform your action here
        isOpen = false;
      }
    }

    window.addEventListener('click', handleClickOutside);

    return () => {
      // Cleanup the event listener when the component is unmounted
      window.removeEventListener('click', handleClickOutside);
    };
  });

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="selector" on:click={()=>isOpen = !isOpen}>

        {#if value}
        <span style="text-overflow: ellipsis; white-space: nowrap;">{value.name}</span>
        {:else}
        <span class="placeholder">{placeholder}</span>
        {/if}

        <Expand size="1.5em" />
        {#if isOpen}
            <div class="selector__optionList">
                {#each options as option}
                <button class="selector__option" on:click={()=>selectOption(option)}>{option.name}</button>
                {/each}
        
            </div>
        {/if}
    </div>

<style>
    .selector {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        font-size: 0.8em;
        position: relative;
    }
    .placeholder {
        opacity: 0.8;
    }
    .selector__optionList {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 40px;
        width: 100%;
        -webkit-box-shadow: 4px 4px 8px 4px rgba(0,0,0,0.3); 
        box-shadow: 2px 2px 8px 0px rgba(0,0,0,0.3);
        background-color: white;
        border-radius: 8px;
        padding: 8px;
        z-index: 99999;
        gap: 8px;
    }
    .selector__option {
        padding: 8px;
        background-color: white;
        text-align: left;
        border: none;
        cursor: pointer;
    }
    .selector__option:hover {
        background-color: #F5F7FA;
    }
</style>