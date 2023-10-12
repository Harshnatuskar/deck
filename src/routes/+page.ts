import type {PageLoad} from "./$types"

type ApiMonster = {
    name: string;
    url: string;
}

export type IndexMonster = ApiMonster & {
    id: string;
    image: string;
}

export const load =(async ({fetch}) => {//this will be server rendered, used to avoid slow loading of items
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')// native fetch function
    const json = await response.json() 
    const monsters :IndexMonster[] = json.results.map((monster: IndexMonster)=>{
        const splitUrl = monster.url.split('/')
        const id = splitUrl[splitUrl.length -2]
        return{
            name: monster.name,
            url: monster.url,
            id,
            image:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        }

    })

    return{
        monsters 
    }
}) satisfies PageLoad