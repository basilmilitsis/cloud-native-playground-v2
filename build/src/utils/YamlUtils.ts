import { load, dump } from 'js-yaml';
import * as fs from 'fs';

export class YamlUtils {

    static readFile<T>(path: string): T {
        try {
            const doc = load(fs.readFileSync(path, 'utf8'));
            console.log(doc);
            return doc;
        } catch (e) {
             console.log(e);
        }
    }

    static writeFile (path: string, yaml: Object): void {
        fs.writeFileSync(path, dump(yaml), {encoding: 'utf8'});
    }
}
