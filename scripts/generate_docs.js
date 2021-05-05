/**
 * Build the documentation for the transformer library
 */

const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');


const EMPTY_STRING = '​';

set_empty_string = function(data) {
  // Hacky fix for: https://github.com/jsdoc/jsdoc/issues/1529
  data.forEach((e)=>{
    if (typeof(e.params) === 'object') {
        e.params.forEach((p)=>{
          if (p.defaultvalue === '""') {
            p.defaultvalue = EMPTY_STRING;
          }
        })
    }
  })
}


console.log(`[generate_docs] : Building documentation into 'API.md'`);

var data = jsdoc2md.getTemplateDataSync({
  files : "lib/*js",
  configure : "scripts/jsdoc_configuration.json"
});

set_empty_string(data);

var output = jsdoc2md.renderSync({ data : data });

fs.writeFileSync('API.md', output);
