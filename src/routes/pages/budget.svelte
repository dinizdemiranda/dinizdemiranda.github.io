<script>
   import { budget, formatCurrency } from '../../Store.js'
   import Edit from "svelte-material-icons/Pencil.svelte"
   import Save from "svelte-material-icons/ContentSave.svelte"
   import Add from "svelte-material-icons/Plus.svelte"
	import PocketList from "./components/pocketList.svelte";
    import PocketSlider from "./components/pocketSlider.svelte";
	import Page from '../+page.svelte';
	import NewPocket from './components/newPocket.svelte';

    let showPencil = false;
    let editAmount = false;
    let inputAmount = $budget.amount
    let newPocketForm = false;

    function saveAmount() {
        $budget.amount = inputAmount
        editAmount = false;
    }

    function addPocket(newPocket) {
        let newPockets = [...$budget.pockets]
        let newProportion = (100 / ($budget.pockets.length + 1)) / 100
        for (let i = 0; i < newPockets.length; i++) {
            if (newPockets[i].proportion > 0) {
                newPockets[i].proportion = (1 - newProportion) * newPockets[i].proportion
            }
        }
        for (let i = 0; i < newPockets[0].campaigns.length; i++) {
            if (newPockets[0].campaigns[i].id === newPocket.campaigns[0].id) {
                newPockets[0].campaigns.splice(i, 1)
            }
        }
        newPockets.push({
            name: newPocket.name,
            id: Math.random() * 3000,
            isMain: false,
            proportion: newPocket.proportion,
            campaigns: newPocket.campaigns
        })
        $budget.pockets = newPockets
    }

</script>

<div class="budget">

    <div class="budget__header">
        <h2>Budget: {$budget.name}</h2>
        {#if editAmount}
        <div  class="budget__amountEditor">
            <input type="number" class="budget__amountInput" bind:value={inputAmount} >
            <button class="budget__amountButton" on:click={saveAmount}><Save color="white" size="1.5em" /></button>
        </div>
        {:else}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div on:mouseenter={() => showPencil = true} on:mouseleave={() => showPencil = false} on:click={()=>editAmount = true} class="budget__amount">
            <h3>{formatCurrency($budget.amount)}</h3>
            <span style="opacity: {showPencil ? '1' : '0'}">
                <Edit color="#3D63E8" size="1.2em" />
            </span>
        </div>
        {/if}
    </div>
    <div class="budget__pockets">
        <div class="budget__pocketsSlider">
            <PocketSlider bind:pockets={$budget.pockets}/>
            <button class="budget__newPocket" on:click={()=>newPocketForm = true}>
                <Add size="1.5em" />
                Add pocket</button>
        </div>
        <PocketList bind:pockets={$budget.pockets} />
        
    </div>
    
</div>
{#if newPocketForm}
<NewPocket pockets={$budget.pockets} addPocket={addPocket} bind:newPocketForm={newPocketForm} />
{/if}
<style>
    .budget {
        width: 960px;
        margin: 0 auto;
    }
    .budget__header {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        padding-top: 16px;
    }
    .budget__amount {
        display: flex;
        align-items: center;
        padding: 8px;
        gap: 4px;
        border-radius: 8px;
    }
    .budget__header h2, .budget__amount h3 {
        margin: 0;
    }
    .budget__amount:hover {
        background-color: white;
        -webkit-box-shadow: 4px 4px 8px 4px #F2F3F5; 
box-shadow: 2px 2px 8px 0px #F2F3F5;
    }
    .budget__amountInput {
        font-size: 1.2em;
        border: none;
    }
    .budget__amountInput:focus {
       outline: none;
    }
    .budget__amountEditor {
        border: none;
        padding: 8px;
        display: grid;
        grid-template-columns: 1fr auto;
        border-radius: 8px;
        background-color: white;
        -webkit-box-shadow: 4px 4px 8px 4px #F2F3F5; 
box-shadow: 2px 2px 8px 0px #F2F3F5;
    }
    .budget__amountButton {
        padding: 2px;
        height: 32px;
        width: 32px;
        background-color: #3D63E8;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        cursor: pointer;
    }
    .budget__pocketsSlider {
        display: flex;
        align-items: center;
        gap: 16px;
    }
    .budget__newPocket {
        background-color: #3D63E8;
        color: white;
        padding: 8px;
        border-radius: 8px;
        border: none;
        font-weight: bold;
        font-size: 1em;
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        cursor: pointer;
    }
    .budget__newPocket:hover {
        background-color: #2341ad;
    }
</style>