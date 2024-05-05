dis = new Display("display", [100,100], "#1a1a1a");
displayAtWorkSet(dis);
Slot = new Slot();
Gui = new Gui();

Gui.size = [200,200]

var fps = [120,0,[41]];

var scope = 2;
var start = [10,5];

var map = [19,19];
var blocks = [0,0];
var obj = new Map();

dis.changeScale([window.innerWidth,window.innerHeight]);
dis.updateScale();
//requestAnimationFrame(step);

function step() {
    setTimeout(function() {
        dis.changeScale([window.innerWidth,window.innerHeight]);
        if (upd) {
            dis.updateScale();
            dis.updateScreen();
            displayAtWork[1].lineWidth = 2;
            displayAtWork[1].strokeStyle = "#2a2a2a";
            if (con[3] == false) {
                displayAtWork[1].strokeRect(start[0]*16*scope, start[1]*16*scope, 16*scope*(map[0]+1), 16*scope*(map[1]+1));
            }
        }
        for (let w = 0; w <= 16*scope*map[1]; w = w+(16*scope)) {
            for (let q = 0; q <= 16*scope*map[0]; q = q+(16*scope)) {
                if (upd) {
                    if (con[3]) {
                        displayAtWork[1].strokeRect(q+(start[0]*16*scope), w+(start[1]*16*scope), 16*scope, 16*scope);
                    }
                }
                Slot.show([q+start[0]*16*scope,w+start[1]*16*scope],blocks);
                blocks[0]++
            }
            blocks[0] = 0
            blocks[1]++
        }
        blocks[1] = 0;
        if (guiCom[0]) {
            Gui.show();
        }
        if (20 > con[1]) {
            con[1]++
        }
        displayAtWork[1].fillStyle = "#1f1f1f";
        displayAtWork[1].fillRect(0, 0, 150, displayAtWork[0].height);
        doRusText(fps[2], [10,10],13,[3,3])
        fps[1]++
        upd = false
        TYPE();
        clearTimeout(step);
        step();
    }, 1000 / fps[0]);
}

function fpsCount() {
    setTimeout(function() {
        fps[2] = RusToDis(String(fps[1]));
        fps[1] = 0;
        clearTimeout(fpsCount);
        fpsCount();
    }, 1000);
}
fpsCount();
step();
