dis = new Display("display", [100,100], "#1f1f1f");
displayAtWorkSet(dis);
Slot = new Slot();
Gui = new Gui();

Gui.size = [200,200]

var scope = 1;
var start = [0,0];

var map = [19,19];
var blocks = [0,0];
var obj = new Map();

function step() {
    setTimeout(function() {
        dis.changeScale([window.innerWidth,window.innerHeight]);
        requestAnimationFrame(step);
        dis.updateDisplay();
        for (let w = 0; w <= 16*scope*map[1]; w = w+(16*scope)) {
            for (let q = 0; q <= 16*scope*map[0]; q = q+(16*scope)) {
                displayAtWork[1].lineWidth = 2;
                displayAtWork[1].strokeStyle = "#2a2a2a";
                displayAtWork[1].strokeRect(q+(start[0]*16*scope), w+(start[1]*16*scope), 16*scope, 16*scope);
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
        if (10 > con[1]) {
            con[1]++
        }
        TYPE();
        clearTimeout(step);
    }, 1000 / fps);
}
step();
