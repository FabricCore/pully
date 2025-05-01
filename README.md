# Pully

Package magnager for JSCore.

### Installation

#### Using install script

> This only works if pully is previously **_not_** installed.

```
/js web https://raw.githubusercontent.com/FabricCore/pully/refs/heads/master/installer.js
```

#### Using pully

> If pully is not previously installed, use the install script.

```
/pully install pully
```

## Commands

#### /pully install &lt;package 1&gt; &lt;package 2&gt; &lt;package 3&gt;

Install a package and its dependencies.

#### /pully uninstall &lt;package 1&gt; &lt;package 2&gt; &lt;package 3&gt;

Uninstall a package and its dependencies.

#### /pully update

Update all packages.

> **/pully** aliases to **/pully update**

#### /pully clean

Removes undepended packages that are not installed explicitly.

## Library Functions

#### pully.pullOne(pack: String, remote: String, print: boolean?) → boolean

Install one package (without installing additional dependencies).

- **pack** is the name of the package as in **package.json**
- **remote** is the URL to the zip file
- **print** prints download start and installed messages if true, default: false.

#### pully.installed() → { Object }

Returns a list of all packages with their dependencies.

#### pully.fullDepTree() → { Object }

Returns a list of all packages, with their dependencies and dependents.

#### pully.repo(then: F)

**_where F: (repo: JSON)_**

Fetches package index from repository.

#### pully.repoBlocking() → JSON

Fetches package index from repository, blocking variant.

#### pully.remove(packs: [String], then: F, print: boolean?)

\*\*\*where F: (success: boolean)
Remove a list of packages.

- Will result in a failure if removing a package result in a missing dependency.
- **print** defaults to true.

#### pully.clean(then: F)

**\*where F: ()**

Removes unused dependencies.

#### pully.pull(packs: [String], then: F)

**_where F: (changed: boolean)_**

Install a list of packages with their dependencies.

- **changed** is true if at least 1 package is installed.

#### pully.updateAll(then: F)

**_where F: ()_**

Update all packages.
