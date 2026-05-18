const fs = require('fs');
let h = fs.readFileSync('index.html', 'utf8');

// Replace the brand anchor section - use regex to find and replace the block
const newBrand = `                <a href="#" class="font-heading font-bold tracking-tight text-foreground leading-none whitespace-nowrap text-[13px] sm:text-base md:text-2xl">
                    She Gorgeous Makeup Studio and Academy<span class="text-primary">.</span>
                </a>`;

// Match the brand anchor tag block (from <a href="#" ... to </a>)
const re = /<a href="#" class="font-heading[^"]*"[\s\S]*?<\/a>/;
const match = h.match(re);
if (match) {
    console.log('Found:', match[0].substring(0, 100));
    h = h.replace(re, newBrand);
    fs.writeFileSync('index.html', h, 'utf8');
    console.log('DONE');
} else {
    console.log('NOT FOUND');
}
