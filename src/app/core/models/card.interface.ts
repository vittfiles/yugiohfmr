export interface CardYugioh {
    "Name"?: string | null,
    "Type"?: string | null,
    "Guardian Star"?: string | null,
    "ATK"?: string | number | null,
    "DEF"?: string | number | null,
    "Level"?: string | null,
    "Description"?: string | null,
    "Materials"?: string | null,
    "id": string | number | null,
    "Password"?: string | null,
    "Star cost"?: string | null,
    "src" ?: string | null,
    monster?: boolean | null,
    magic?: boolean | null,
    trap?: boolean | null,
    ritual?: boolean | null,
    guardian1?: string | null,
    guardian2?: string | null,
    idInt: number
}

export interface CardDeck {
    id: number,
    Name: string
}

export interface Deck{
    name: string,
    cards: CardDeck[],
    description: string
}

export interface CardFilter {
    id: number,
    position: number,
    hide: boolean,
    count: number,
    use?: number,
    showUse?: boolean
}
//my cards
export interface MyCard{
    id: number,
    count: number
}

//character info 
export interface CardCharacter{
    id: number,
    name: string,
    chance100: number,
    chance2048: number
}

export interface Character{
    "name": string,
    "deck": CardCharacter[],
    src: string
}

export interface CardCharacterShow{
    id: number,
    name: string,
    chance100: number,
    chance2048: number,
    card: CardYugioh
}

export interface CharacterShow{
    name: string,
    src: string,
    deck: CardCharacter[]
}