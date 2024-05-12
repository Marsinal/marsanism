body = document.querySelector("body")
body.style.overflow = "hidden"
body.style.backgroundColor = "#0f0f0f"

disp = document.getElementById("display")
disp.style.position = "absolute"
disp.style.margin = "auto"
disp.style.top = 0
disp.style.right = 0
disp.style.bottom = 0
disp.style.left = 0

dis = new Display("display", [100,100], "#1a1a1a");
displayAtWorkSet(dis);
Slot = new Slot();
Gui = new Gui();
Button = new Tab();

var tab = 0;

Gui.size = [200,200]

var fps = [140,0,[41]];

var scope = 2;
var start = [15,5];

var map = [40,40];
map[0] = map[0]-1
map[1] = map[1]-1

var blocks = [0,0];
var obj = new Map();

var sizes = [40,40]
/*for (let w = 0; w <= map[1]; w++) {
    for (let q = 0; q <= map[0]; q++) {
        window.obj.set(q+','+w, [["bricks",true],[0,0],[false,false,false,false],[0,[true,true,true,true],[false,false,false,false]]]);
    }

}*/

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
        doRusText(RusToDis(String(map[0]+1)),[start[0]*16*scope,(start[1]-2)*16*scope],13,[3,3])
        doRusText(RusToDis(String(map[1]+1)),[(start[0]-2)*16*scope,start[1]*16*scope],13,[3,3])
        for (let w = 0; w <= 16*scope*map[1]; w = w+(16*scope)) {
            for (let q = 0; q <= 16*scope*map[0]; q = q+(16*scope)) {
                if (upd) {
                    if (con[3] && onScreen(blocks)) {
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
        displayAtWork[1].fillStyle = "#2f2f2f";
        displayAtWork[1].fillRect(0, 0, 150, displayAtWork[0].height);
        doSprite(tabs[0],[150,0],[3,3]);
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
//empty
