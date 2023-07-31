<script>
    import Width from "svelte-material-icons/UnfoldMoreVertical.svelte"

    export let pockets;

    let expanding = null
	let start = null
    let initial = null
    let x = 20
    let sliderWidth

    function getColor(i) {
        const colors = ["#F4AC00", "#36D786", "#FE688F", "#FF8416"]
        if (i === 0) {
            return "#3D63E8"
        } else if (i > colors.length) {
            return colors[i - colors.length - 1]
        } else {
            return colors[i - 1]
        }
    }
	
	function startExpand(i, event) {
		expanding = i
		start = event.pageX
		initial = { x, thisProportion: pockets[i].proportion, nextProportion: pockets[i + 1].proportion }
	}
	
	function stopExpand() {
		expanding = null
		start = null
		initial = null
	}
	
	function expand(event) {
        if (expanding == null) {
            return
        } else {
			const delta = (event.pageX - start)
            const percentageMoved = Math.floor((delta / sliderWidth) * 100) / 100

            pockets[expanding].proportion = initial.thisProportion + percentageMoved
            pockets[expanding + 1].proportion = initial.nextProportion - percentageMoved

            if (initial.thisProportion + percentageMoved <= 0.01) {
                if (pockets[expanding].isMain) {
                    pockets[expanding].proportion = 0
                    pockets[expanding+1].proportion = initial.thisProportion + initial.nextProportion
                } else {
                    removePocket(expanding)
                }
            } else if (initial.nextProportion - percentageMoved <= 0.01) {
                removePocket(expanding + 1)
            }
			return
		}
	}


    function removePocket(index) {
            stopExpand()
            const newPockets = [...pockets]
            pockets[index].campaigns.forEach((campaign)=> newPockets[0].campaigns.push(campaign))
            newPockets.splice(index, 1)
            pockets = newPockets
    }

</script>
<svelte:window on:mouseup={stopExpand} />
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div bind:clientWidth={sliderWidth} class="slider" on:mousemove={expand}>
    {#each pockets as pocket, index}
    <div class="slider__pocket" style="width: {pocket.proportion * 100}%; background-color: {getColor(index)};" class:expanding>
        <div class="slider__pocketInfo">
            <h3>
    
                {pocket.name}
            </h3>
            <span>{Math.floor(pocket.proportion * 100)}%</span>
        </div>
    {#if pockets.length > (index + 1)}
    <div class="slider__handle" on:mousedown={startExpand.bind(this, index)} class:active={expanding=='right'}>
        <Width color="#3D63E8" />
    </div>
    {/if}
    </div>
    
    {/each}
</div>

<style>
    .slider {
        display: flex;
        width: 800px;
        margin: 16px;
        margin: 16px  auto;
        padding: 8px;
        background-color: white;
        border-radius: 24px;
        -webkit-box-shadow: 4px 4px 8px 4px #F2F3F5; 
        box-shadow: 2px 2px 8px 0px #F2F3F5;
    }
    .slider__pocket {
        height: 64px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        line-height: 1.2em;
        justify-content: center;
        align-items: center;
        position: relative;
        border: none;
        color: white;
    }
    .slider__pocket:first-of-type {
        border-radius: 16px 0px 0px 16px;;
    }
    .slider__pocket:last-of-type {
        border-radius: 0px 16px 16px 0px;
    }
    .slider__pocketInfo {
        display: flex;
        align-items: center;
        flex-direction: column;
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
    }
    .slider__pocket h3 {
        margin: 0;
        overflow: hidden;

    }
    .slider__handle {
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        border-radius: 32px;
        position: absolute;
        right: -9px;
        z-index: 100;
        cursor: grab;
    }
</style>