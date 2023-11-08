import { CardYugioh } from "../models/card.interface";

export function filterYugiohCards(obj: any,res: CardYugioh[]): CardYugioh[]{
  if(obj.filters){
    res = res.filter(card => {
      if(obj.filters.monsters && card.monster)return true;
      if(obj.filters.magics && card.magic)return true;
      if(obj.filters.traps && card.trap)return true;
      if(obj.filters.rituals && card.ritual)return true;
      return false;
    });
  }
  if(obj.search){
    res = res.filter(card => {
      if(card.Type?.toLowerCase().includes(obj.search.toLowerCase())){
        return true;
      }else if(card['Guardian Star']?.toLowerCase().includes(obj.search.toLowerCase())){
        return true;
      }else{
        return card.Name?.toLowerCase().includes(obj.search.toLowerCase());
      }
    })
  }
  if(obj.order){
    if(obj.order === 'id')
      res.sort((a, b) => ((a.id as number) > (b.id as number)) ? obj.ascending*1 : obj.ascending*(-1))
    else if(obj.order === 'name')
      res.sort((a, b) => ((a.Name as string) > (b.Name as string)) ? obj.ascending*1 : obj.ascending*(-1))
    else if(obj.order === 'atk')
      res.sort((a, b) => {
        if(a.monster && b.monster){
          if((a.ATK as number) > (b.ATK as number)){
            return obj.ascending*1;
          }else{
            return obj.ascending*(-1);
          }
        }else if(!a.monster){
          return 1;
        }else{
          return -1;
        }
      })
    if(obj.order === 'def')
      res.sort((a, b) => {
        if(a.monster && b.monster){
          if((a.DEF as number) > (b.DEF as number)){
            return obj.ascending*1;
          }else{
            return obj.ascending*(-1);
          }
        }else if(!a.monster){
          return 1;
        }else{
          return -1;
        }
      })
  }

  return res;
}