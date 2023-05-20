const fs = require('fs');
const path = require('path');
const lockfile = require('@yarnpkg/lockfile');

if(process.argv.length !== 4){
    console.error(`usage: node ${process.argv[1]} path/to/yarn.lock dependency@version`);
    process.exit(1);
}

const filePath = process.argv[2];
const baseDependency = process.argv[3];
const dependencyJson = lockfile.parse(fs.readFileSync(filePath, 'utf8')).object;

const joinName = (name, version) => [name, version].join('@');

const unpackDependency = (fullName) => {
    const parents = Object.entries(dependencyJson).map(([parentKey, parent]) => {
        if(parentKey === fullName || !parent.dependencies){
            return false;
        }
        const found = Object.entries(parent.dependencies).find(([name, version]) => {
            const dependencyFullName = joinName(name, version);
            return dependencyFullName === fullName;
        });
        return found ? unpackDependency(parentKey) : false;
    }).filter(value => value);

    return {
        name: fullName,
        parents,
    };
};

const prettyPrint = ((unpackedDependencies, level=0) => {
    return [`${'\t'.repeat(level)}${unpackedDependencies.name}\n`]
        .concat(unpackedDependencies.parents.map(key => prettyPrint(key, level + 1)))
        .join('');
});

// console.log(JSON.stringify(unpackDependency(baseDependency)));
console.log(prettyPrint(unpackDependency(baseDependency)));