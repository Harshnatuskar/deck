<script lang="ts">
    import type { PageData } from "./$types";
    import { page } from "$app/stores";
    import type { IndexMonster} from "./+page";
    import { generations } from "./generations";
     

    export let data: PageData;

    let monsterId: string = $page.url.search;
 
    $: monster = data.monsters.find((monster) => monster.id === monsterId);
    const monsterClick = (monster: IndexMonster) =>{
        monsterId = monster.id; //an id is lot easy to pass than passing the whole data
    }

    
</script>

<h1>{monsterId}</h1> 

<h2>{monster?.name}</h2>
 
{$page.url.searchParams.get("monsterId")}

<div class="generations">
    {#each generations as generation (generation.id)}
        <div class="generation">{generation.name}</div> 
    {/each}
</div>
 


<div class="monsters" > 
    {#each data.monsters  as monster (monster.id)}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="monster" on:click={()=>monsterClick(monster)}>
            <div class="monster-content">
                <img src={monster.image} alt={monster.name}/>
                <p>{monster.name}</p> 
            </div> 
                <div class="monster-id">
                    <p>{monster.id}</p> 
                </div> 
        </div>
    {/each}
</div> 
 

<style>
.generations{
    display: flex;
    flex-direction: row;
    flex-wrap:wrap ; 
    justify-content: center;
}

.generation{
    margin: 10px;
    padding: 5px 10px;
    border: 1px solid black;
    border-radius: 5px;
    background-color: rgb(235, 231, 231);
}

.generation:hover{
    background-color: rgb(160, 160, 160);
}

.monsters{
    display: flex; 
    flex-direction: row;
    flex-wrap: wrap;
}

.monster{ 
    width: 100px; 
    border: 1px solid rgb(119, 119, 119);
    border-radius: 5px;
    margin: 10px;
    padding: 10px;
    position: relative; /*to have the monster id be inside the card*/
    background-color: lightgrey;
}

.monster-id{
    position: absolute; 
    top:0;
    left: 15px; 
    font-size: small;
    color: rgb(82, 87, 92);
}

.monster:hover{
    background-color: whitesmoke;
}

.monster-content{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>