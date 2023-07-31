<script>
	import Selector from "./selector.svelte";


export let pockets;
export let addPocket;
export let newPocketForm;

let newPocketName = ''
let newPocketProportion = 100 / (pockets.length + 1);
let newPocketCampaign = null;

function handleCreate() {
    addPocket({
        name: newPocketName,
        proportion: newPocketProportion/100,
        campaigns: [newPocketCampaign]
    })
    resetNewPocket()
}

function resetNewPocket() {
    newPocketName = ''
    newPocketProportion = 100 / (pockets.length + 1);
    newPocketCampaign = null;
    newPocketForm = false;
}

</script>

<div class="newPocket__holder">
    <div class="newPocket">
        <h3 style="margin: 0;">New Pocket</h3> 
        <div style="display: flex; flex-direction: column; width: 640px; gap: 8px; margin-top: 8px;">
            <div style="display: grid; grid-template-columns: 3fr 1fr; gap: 8px;">
                <input  class="newPocket__input" type="text" bind:value={newPocketName} placeholder="Pocket name">
                <span class="newPocket__input" style="display: grid; grid-template-columns: 1fr auto; align-items: center;" >
                    <input class="newPocket__percentage" type="number" min="1" max={100 - pockets.length} bind:value={newPocketProportion} placeholder="Percentage">
                    %
                </span>
            </div>
            <div class="newPocket__input" style="display: flex;">
                <Selector options={pockets[0].campaigns}  placeholder="Select a campaign" bind:value={newPocketCampaign}/>

            </div>
            <div style="display: flex; justify-content: right; gap: 8px; margin-top: 8px;">
                <button class="newPocket__button secondary" on:click={resetNewPocket}>Cancel</button>
                {#if newPocketName === '' || newPocketCampaign === null}
                <button class="newPocket__button primary disabled" disabled>Create</button>
                {:else}
                <button on:click={handleCreate} class="newPocket__button primary">Create</button>
                {/if}
                
            </div>
        </div>
    </div>
</div>

<style>
    .newPocket__holder {
        position: fixed;
        background-color: rgba(0,0,0,.6);
        height: 100vh;
        width: 100vw;
        top: 0;
        left: 0;
        z-index: 10000;
    }
    .newPocket {
        position: absolute;
        top: 50%;
        left: 50%;
        background-color: white;
        border-radius: 16px;
        padding: 32px;
        -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
    }
    .newPocket__button {
        padding: 8px 16px;
        border: none;
        border-radius: 8px;
        font-size: 1em;
        font-weight: bold;
        cursor: pointer;
    }
    .primary {
        background-color: #3D63E8;
        color: white;
    }
    .newPocket__input {
        height: 40px;
        padding: 0 8px;
        border-radius: 4px;
        border: none;
        background-color: #F5F7FA;
    }
    .newPocket__percentage {
        background-color: transparent;
        border: none;
        height: 100%;
    }
    .disabled {
        opacity: 0.38;
        cursor: not-allowed;
    }
</style>