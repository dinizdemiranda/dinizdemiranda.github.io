<script>
	import Pocket from "./pocket.svelte";

    let isMouseDown = false;
    let initialPocket = null;
    let draggOverPocket = null;
    
    export let pockets;
    
    function handleDragEnd(campaignIndex) {
        const newPockets = [...pockets]
        newPockets[draggOverPocket].campaigns.push(pockets[initialPocket].campaigns[campaignIndex])
        newPockets[initialPocket].campaigns.splice(campaignIndex, 1)
        if(newPockets[initialPocket].campaigns.length === 0) {
            newPockets[draggOverPocket].proportion += newPockets[initialPocket].proportion
            newPockets.splice(initialPocket, 1)
        }
        pockets = newPockets
        initialPocket = null;
        draggOverPocket = null
    }

</script>

<svelte:window on:mouseup={() => isMouseDown = false} on:mousedown={() => isMouseDown = true} />
<div class="pocketList">
    {#each pockets as pocket, index}
    <Pocket {pocket} bind:draggOverPocket={draggOverPocket} bind:initialPocket={initialPocket} pocketIndex={index} {handleDragEnd}/>
    {/each}
</div>

<style>
    .pocketList {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
</style>