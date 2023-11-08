import { CardYugioh } from "../models/card.interface";

export function typeMonster(card: CardYugioh):boolean{
    return card.Type !== 'Magic' && card.Type !== 'Field' && card.Type !== 'Equip' && card.Type !== 'Trap' && card.Type !== 'Ritual';
}
export function typeMagic(card: CardYugioh):boolean{
    return card.Type === 'Magic' || card.Type === 'Field' || card.Type === 'Equip';
}
export function typeTrap(card: CardYugioh):boolean{
    return card.Type === 'Trap';
}
export function typeRitual(card: CardYugioh):boolean{
    return card.Type === 'Ritual';
}