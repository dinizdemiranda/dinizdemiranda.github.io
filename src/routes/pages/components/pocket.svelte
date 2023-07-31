<script>
    import { onMount } from 'svelte';
	import Campaign from "./campaign.svelte";
    import {budget, formatCurrency} from "./../../../Store.js"
    import Expand from "svelte-material-icons/ChevronDown.svelte"
    import Collapse from "svelte-material-icons/ChevronUp.svelte"

    export let pocket;
    export let pocketIndex;
    export let draggOverPocket;
    export let initialPocket;
    export let handleDragEnd;

    let expanded = true;

    function handleDragOver() {
        draggOverPocket = pocketIndex
    }

    

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div class="pocket" on:dragover={handleDragOver} >
    <div class="pocket__header">
        <h3 class="pocket__title">{pocket.name}</h3>
        <div class="pocket__amount">
            <h3 class="pocket__proportion">{Math.floor(pocket.proportion * 100)}%</h3>
            <span>({formatCurrency($budget.amount * pocket.proportion)})</span>
        </div>
        <button class="pocket__headerExpand" on:click={()=> expanded = !expanded}>
            {#if expanded}
            <Collapse size="1.6em" />
            {:else}
            <Expand size="1.6em" />
            {/if}
        </button>
    </div>
    {#if expanded}
        <div class="pocket__campaignList">
            {#each pocket.campaigns as campaign, index}
            <Campaign campaign={campaign} bind:initialPocket={initialPocket} {pocketIndex} campaignIndex={index} {handleDragEnd}/>
            {/each}
            {#if draggOverPocket === pocketIndex && initialPocket !== draggOverPocket}
            <div class="pocket__campaignPlaceholder"></div>
            {/if}
        </div>
    {/if}

    
</div>

<style>
    .pocket {
        padding: 16px;
        border: none;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        background-color: white;
        -webkit-box-shadow: 4px 4px 8px 4px #F2F3F5; 
box-shadow: 2px 2px 8px 0px #F2F3F5;
    }
    .pocket__title, .pocket__proportion {
        margin: 0;
    }
    .pocket__header {
        display: grid;
        grid-template-columns: 1fr auto auto;
        align-items: center;
    }
    .pocket__campaignList {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    .pocket__amount {
        display: flex;
        gap: 4px;
        align-items: center;
    }
    .pocket__proportion {
        display: flex;
        justify-content: right;
    }
    .pocket__headerExpand {
        padding: 2px;
        background-color: white;
        border: none;
        cursor: pointer;
        display: flex;
    }
    .pocket__campaignPlaceholder {
        height: 32px;
        border: 2px dotted grey;
        border-radius: 4px;
    }
</style>