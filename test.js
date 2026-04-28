const getRepo = async () => {
    const r = await fetch('https://api.github.com/repos/yilin20020116-lab/companyweb-images/git/trees/main?recursive=1');
    const d = await r.json();
    console.log(JSON.stringify(d.tree.map(f => f.path), null, 2));
}
getRepo();
