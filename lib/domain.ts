export const MARKETS=['Gulabbagh','Bikramganj','Bihar Sharif'];
export const DISTRICTS:Record<string,string>={Gulabbagh:'Purnia',Bikramganj:'Rohtas','Bihar Sharif':'Nalanda'};
export const MODEL='Four-week trend baseline';
export type Price={market:string;date:string;price:number;source:string};
export function estimate(values:number[]){const a=values.slice(-4);const last=a.at(-1)!;const slope=(a.at(-1)!-a[0])/(a.length-1);return Math.round(last+Math.max(-last*.025,Math.min(last*.025,slope)));}
export function makeForecast(rows:Price[]){
 if(rows.length<16)throw Error('At least 16 consecutive weekly observations are needed.');
 const clean=[...rows].sort((a,b)=>a.date.localeCompare(b.date));
 for(let i=1;i<clean.length;i++)if((Date.parse(clean[i].date)-Date.parse(clean[i-1].date))/86400000!==7)throw Error('Use one observation every seven days. Aggregate daily prices to a consistent weekly series first.');
 const vals=clean.map(r=>r.price);const tests=[];for(let i=Math.max(4,vals.length-12);i<vals.length;i++){const prediction=estimate(vals.slice(0,i));tests.push({date:clean[i].date,actual:vals[i],prediction,naive:vals[i-1]});}
 const mae=tests.reduce((s,t)=>s+Math.abs(t.actual-t.prediction),0)/tests.length;
 const naiveMae=tests.reduce((s,t)=>s+Math.abs(t.actual-t.naive),0)/tests.length;
 const predicted=estimate(vals),current=vals.at(-1)!;const range=Math.max(10,Math.round(mae*2));const target=new Date(Date.parse(clean.at(-1)!.date)+7*86400000).toISOString().slice(0,10);
 return {model:MODEL,current,predicted,change:((predicted-current)/current)*100,low:predicted-range,high:predicted+range,mae:Math.round(mae*10)/10,naiveMae:Math.round(naiveMae*10)/10,observations:clean.length,lastDate:clean.at(-1)!.date,target,source:clean[0].source,tests,synthetic:clean.some(p=>p.source==='Synthetic demonstration series')};
}
const gsm="@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !\"#¤%&'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà";
const ext='^{}\\[~]|€';
export function smsInfo(message:string){let units=0;let unicode=false;for(const c of message){if(gsm.includes(c))units++;else if(ext.includes(c))units+=2;else{unicode=true;break;}}if(unicode)units=message.length;const single=unicode?70:160,multi=unicode?67:153;return {encoding:unicode?'Unicode':'GSM-7',units,segments:units===0?0:units<=single?1:Math.ceil(units/multi)};}
export function messageFor(f:any,market:string,lang:string){return lang==='Hindi'?`HarvestSignal: ${market} में अगले सप्ताह धान का अनुमानित भाव ₹${f.predicted}/क्विंटल। यह अनुमान है, बिक्री का निर्णय अपनी जरूरत के अनुसार लें।`:`HarvestSignal: ${market} paddy next week ~Rs ${f.predicted}/qtl. Estimate only. Consider your costs and needs before selling.`;}
export function parseCSV(input:string){const rows:string[][]=[];let row:string[]=[],cell='',quoted=false;for(let i=0;i<input.length;i++){const c=input[i];if(c==='"'){if(quoted&&input[i+1]==='"'){cell+='"';i++;}else quoted=!quoted;}else if(c===','&&!quoted){row.push(cell.trim());cell='';}else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&input[i+1]==='\n')i++;row.push(cell.trim());if(row.some(Boolean))rows.push(row);row=[];cell='';}else cell+=c;}if(quoted)throw Error('CSV contains an unclosed quotation mark.');row.push(cell.trim());if(row.some(Boolean))rows.push(row);const headers=rows.shift()?.map(h=>h.replace(/^\uFEFF/,'').toLowerCase())||[];return rows.map(r=>Object.fromEntries(headers.map((h,i)=>[h,r[i]??''])));}
export function csvText(rows:Record<string,any>[]){if(!rows.length)return '';const keys=Object.keys(rows[0]);const quote=(v:any)=>{let s=String(v??'');if(/^[=+@\-]/.test(s))s="'"+s;return '"'+s.replaceAll('"','""')+'"'};return [keys,...rows.map(r=>keys.map(k=>r[k]))].map(r=>r.map(quote).join(',')).join('\r\n');}
export function syntheticPrices(){return MARKETS.flatMap((market,m)=>Array.from({length:52},(_,i)=>({market,date:new Date(Date.UTC(2025,8,22)+i*7*86400000).toISOString().slice(0,10),price:Math.round(2010+m*65+i*5+Math.sin(i*.61+m)*38+Math.cos(i*1.9)*14),source:'Synthetic demonstration series'})));}
