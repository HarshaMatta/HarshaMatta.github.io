import assert from 'node:assert/strict';
import{readFileSync}from'node:fs';
import{model}from'../src/math.js';
const refs=JSON.parse(readFileSync(new URL('./reference.json',import.meta.url)));
for(const [s,v,t,value]of refs)assert.ok(Math.abs(model(s,v,t).price-value)<.00003,'Price agrees with independent erf reference');
for(const s of [70,100,130])for(const v of [.05,.25,.7])for(const t of [1/12,1,2]){
const c=model(s,v,t),p=model(s,v,t,'put');
assert.ok(Math.abs(c.price-p.price-(s-100*Math.exp(-.04*t)))<1e-10,'put-call parity');
assert.ok(c.price>=-1e-8&&c.price<=s,'call price bounds');
assert.ok(c.delta>=0&&c.delta<=1&&p.delta>=-1&&p.delta<=0,'delta bounds');
assert.ok(c.gamma>=0&&Math.abs(c.gamma-p.gamma)<1e-12,'gamma symmetry');
}
console.log('Independent pricing references and 27 parameter combinations passed.');
