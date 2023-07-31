<script>

    import { budget } from '../../../Store'
    import Drag from "svelte-material-icons/DragVertical.svelte"
	import Budget from '../budget.svelte';

    export let initialPocket;
    export let pocketIndex;
    export let handleDragEnd;
    export let campaignIndex;

    let top = 0;
    let left = 0;

    export let campaign;
    

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:dragstart={()=> initialPocket = pocketIndex} on:dragend={()=> handleDragEnd(campaignIndex)} class="campaign" style="top: {top}px; left: {left}px;" draggable="true">
    <Drag size="1.5em"/>
    {campaign.name}
</div>

<style>
    .campaign { 
        padding: 4px;
        border: none;
        background-color: #F5F7FA;
        border-radius: 4px;
        cursor: move;
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        position: relative;
        font-size: 0.875em;
    }

</style>