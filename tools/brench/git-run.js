import {exec} from '../develop/exec';

export default function gits() {
    console.log('Git操作: '.cyan + '提交到远程库'.green);

    return exec(`karma start karma.config.js`)
        .then(()=>
            exec(`git add -u`)
        ).then(()=>
            exec("git commit -m  'by prom'")
        )
        .then(()=>
            exec("git push -u origin master")
        )
        .then(()=>
            exec("git status")
        )
        .then(() => console.log('Git: '.cyan + '提交结束'.green));
}