export function addBoldToMatchedQuery(query:string, refText:string){
  let queryLetters = query.split('');
  let searchStart = 0;
  let positions = [];
  for (const letter of queryLetters) {
    const pos = refText.indexOf(letter, searchStart);
    if (pos !== -1) {
      positions.push(pos);
      searchStart = pos + 1;
    }
  }
  let newOutput = "";
  for (let i = 0; i < refText.length; i++) {
    if (positions.includes(i)) {
      newOutput += `<span class="font-bold">${refText[i]}</span>`;
    } else {
      newOutput += refText[i];
    }
  }
  refText = newOutput;
  return refText;
}