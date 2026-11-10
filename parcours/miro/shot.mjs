import {createRequire} from 'node:module';const {chromium}=createRequire(import.meta.url)('playwright');
const b=await chromium.launch();const p=await b.newPage({viewport:{width:3600,height:1760},deviceScaleFactor:1});
await p.goto('file://'+process.cwd()+'/render.html');await p.waitForTimeout(500);
await p.locator('#f').screenshot({path:'miro.png'});await b.close();
