var displayAtWork = [0,0];

var x = document.getElementById('X');
var y = document.getElementById('Y');

var upd = true;
var updLocal = [[0,0],false]
var updNeed = new Map();

var mouseTriggers = [null,null];
var isMouseDown = false;

var itmNow = 0;
var guiCom = [false,0,0]

var power = 0;
var con = [false,0,false,true];

//glass variable
var pow = 0;

var me = 0;
var temp = [[40, 35, 40],0];

class Display {
    constructor(display, scale, colour) {
        this.display = document.getElementById(display);
        this.field = this.display.getContext('2d');
        this.scale = scale;
        this.colour = colour;

        this.display.width = this.scale[0];
        this.display.height = this.scale[1];

        this.field.fillStyle = this.colour;
        this.field.fillRect(0, 0, this.display.width, this.display.height);
    }
    changeScale(scale) {
        if (scale[0] != this.scale[0] || scale[1] != this.scale[1]) {
            this.scale = scale;
            upd = true
        }
    }
    changeColour(colour) {
        this.colour = colour;
    }
    updateScale() {
        this.display.width = this.scale[0];
        this.display.height = this.scale[1];
    }
    updateScreen() {
        this.field.fillStyle = this.colour;
        this.field.fillRect(0, 0, this.display.width, this.display.height);
    }
}

function displayAtWorkSet(workPlace) {
    window.displayAtWork = [workPlace.display,workPlace.field];
}

function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function pos(e) {
    x = e.pageX;
    y = e.pageY;
    /*if (x != e.pageX || y != e.pageY){
        x = e.pageX;
        y = e.pageY;
        upd = true
    }*/
}

function click() {
    window.CLICK = true;
}

function getCenterX() {
    return Math.round(window.displayAtWork[0].width/2);
}

function getCenterY() {
    return Math.round(window.displayAtWork[0].height/2);
}

function doPixel(coord, colour) {
    window.displayAtWork[1].strokeStyle = colour;
    window.displayAtWork[1].field.strokeRect(coord[0], coord[1], 1, 1);
}

function doSquare(elem1, colour, scale) {
    window.displayAtWork[1].fillStyle = colour;
    window.displayAtWork[1].fillRect(elem1[0], elem1[1], scale[0], scale[1]);
}

function doSprite(elem1, coord, scale) {
    i = 2;
    for (let x = 0; x != elem1[0]*scale[0]; x=x+scale[0]) {
        for (let y = 0; y != elem1[1]*scale[1]; y=y+scale[1]) {
            if (elem1[i][0]+elem1[i][1]+elem1[i][2] != 0) {
                doSquare([coord[0]+x,coord[1]+y],"rgb("+elem1[i][0]+","+elem1[i][1]+","+elem1[i][2]+")",[scale[0],scale[1]]);
            }
            else null;
            i++;
        }
    }
}

function doRedSprite(elem1, coord, scale, power) {
    i = 2;
    for (let x = 0; x != elem1[0]*scale[0]; x=x+scale[0]) {
        for (let y = 0; y != elem1[1]*scale[1]; y=y+scale[1]) {
            if (elem1[i][0]+elem1[i][1]+elem1[i][2] != 0) {
                doSquare([coord[0]+x,coord[1]+y],"rgb("+elem1[i][0]+","+(elem1[i][1]+power/10)+","+(elem1[i][2]+power/10)+")",[scale[0],scale[1]]);
            }
            else null;
            i++;
        }
    }
}

function doGraySprite(elem1, coord, scale) {
    i = 2;
    for (let x = 0; x != elem1[0]*scale[0]; x=x+scale[0]) {
        for (let y = 0; y != elem1[1]*scale[1]; y=y+scale[1]) {
            if (elem1[i][0]+elem1[i][1]+elem1[i][2] != 0) {
                doSquare([coord[0]+x,coord[1]+y],"rgb("+elem1[i][1]+","+elem1[i][1]+","+elem1[i][1]+")",[scale[0],scale[1]]);
            }
            else null;
            i++;
        }
    }
}

function stab(pow1,pow2) {
    if (pow1 > pow2) {
        return pow2
    }
    else if (1 > pow1) {
        return 0
    }
    else {
        return pow1
    }
}

function kickIf(obj,name) {
    if (obj == name) {
        return false
    }
    else {
        return true
    }
}

function isFree(RealCoord,where) {
    window.TempObj = window.obj.get((RealCoord[0]+where[0])+','+(RealCoord[1]+where[1]));
    if (window.TempObj == undefined || window.TempObj[2][2] == false || window.me[2][0] == false) { return false }
    else {
        return true
    }
}

function doGui(size, RealCoord) {
    Gui.size = size
    guiCom[0] = true
    guiCom[1] = RealCoord[0]+','+RealCoord[1]
    guiCom[2] = 1;
    Gui.coord = [getCenterX()-Gui.size[0]/2,getCenterY()-Gui.size[1]/2]
    outSWI = true;
}

function findEnergy(RealCoord,type) {
    me = window.obj.get(RealCoord[0]+','+RealCoord[1]);
    power = window.obj.get(RealCoord[0]+','+RealCoord[1])[1];
    if (type == 0) {
        n = me[3][2].filter((value) => value).length;
    }
    else {
        n = 0
    }

    window.TempObj = window.obj.get(RealCoord[0]+','+(RealCoord[1]-1));
    if (window.TempObj == undefined) { window.TempObj=[0] }
    else if (window.TempObj[2][2] == false || me[2][0] == false) {}
    else {
        me[3][2][0] = true;
        if (power[1] > power[0] && window.TempObj[1][0] > n && me[3][1][0] == true) {
            power[0] = power[0] + (n+1)
            window.TempObj[1][0] = window.TempObj[1][0] - (n+1)
            if (window.TempObj[3][0] == 1) {
                window.TempObj[3][1][2] = false
            }
        }
    }

    window.TempObj = window.obj.get((RealCoord[0]+1)+','+RealCoord[1]);
    if (window.TempObj == undefined) { window.TempObj=[0] }
    else if (window.TempObj[2][1] == false || me[2][3] == false) {}
    else {
        me[3][2][1] = true;
        if (power[1] > power[0] && window.TempObj[1][0] > n && me[3][1][1] == true) {
            power[0] = power[0] + (n+1)
            window.TempObj[1][0] = window.TempObj[1][0] - (n+1)
            if (window.TempObj[3][0] == 1) {
                window.TempObj[3][1][3] = false
            }
        }
    }

    window.TempObj = window.obj.get(RealCoord[0]+','+(RealCoord[1]+1));
    if (window.TempObj == undefined) { window.TempObj=[0] }
    else if (window.TempObj[2][0] == false || me[2][2] == false) {}
    else {
        me[3][2][2] = true;
        if (power[1] > power[0] && window.TempObj[1][0] > n && me[3][1][2] == true) {
            power[0] = power[0] + (n+1)
            window.TempObj[1][0] = window.TempObj[1][0] - (n+1)
            if (window.TempObj[3][0] == 1) {
                window.TempObj[3][1][0] = false
            }
        }
    }

    window.TempObj = window.obj.get((RealCoord[0]-1)+','+RealCoord[1]);
    if (window.TempObj == undefined) { window.TempObj=[0] }
    else if (window.TempObj[2][3] == false || me[2][1] == false) {}
    else {
        me[3][2][3] = true;
        if (power[1] > power[0] && window.TempObj[1][0] > n && me[3][1][3] == true) {
            power[0] = power[0] + (n+1)
            window.TempObj[1][0] = window.TempObj[1][0] - (n+1)
            if (window.TempObj[3][0] == 1) {
                window.TempObj[3][1][1] = false
            }
        }
    }
    power[0] = stab(power[0],power[1])
    window.obj.get(RealCoord[0]+','+RealCoord[1])[1][0] = power[0];
    return power[0]
}

function updSlot(RealCoord) {
    displayAtWork[1].fillStyle = this.colour;
    displayAtWork[1].fillStyle = "#1a1a1a";
    displayAtWork[1].fillRect(RealCoord[0]*16*scope+(start[0]*16*scope), RealCoord[1]*16*scope+(start[1]*16*scope), 16*scope, 16*scope);
    displayAtWork[1].lineWidth = 2;
    if (con[3]) {
        displayAtWork[1].strokeStyle = "#2a2a2a";
        displayAtWork[1].strokeRect(RealCoord[0]*16*scope+(start[0]*16*scope), RealCoord[1]*16*scope+(start[1]*16*scope), 16*scope, 16*scope);
    }
}

function updHad(upd) {
    if (upd) {
        return true
    }
    else {
        return false
    }
}

function onScreen(RealCoord) {
    if (RealCoord[0]*16*scope+start[0]*16*scope > displayAtWork[0].width || RealCoord[0]*16*scope+start[0]*16*scope < 0 || RealCoord[1]*16*scope+start[1]*16*scope > displayAtWork[0].height || RealCoord[1]*16*scope+start[1]*16*scope < 0) {
        return false
    }
    else {
        return true
    }
}

class Slot {
    constructor() {
        this.pos1 = [];
        this.pos2 = [];
        this.coord = [];
        this.RealCoord = [];
    }
    posInteraction(elem1, coord1) {
        this.coord = coord1
        this.pos1 = [coord1[0],coord1[1]];
        this.pos2 = [coord1[0]+elem1[0],coord1[1]+elem1[1]];
    }
    interaction(RealCoord) {
        this.RealCoord = RealCoord;
        if (this.pos1[0] < window.x && this.pos1[1] < window.y && this.pos2[0] > window.x && this.pos2[1] > window.y) {
            window.temp[0] = RusToDis(String(this.RealCoord))
            window.TempObj = window.obj.get(this.RealCoord[0]+','+this.RealCoord[1]);
            if (window.TempObj == undefined) {
                window.TempObj = [[false]];
                pow = 0;
            }
            else {
                pow = window.TempObj[1][0];
            }
            if (isMouseDown && guiCom[0] == false) {
                switch(window.itmNow) {
                    case 0:
                        window.TempObj = window.obj.get(this.RealCoord[0]+','+this.RealCoord[1]);
                        if (window.TempObj == undefined) { window.TempObj=[['']] }
                        switch(window.TempObj[0][0]) {
                            case "battery":
                                temp[1] = RusToDis('медная батарейка'+'('+String(this.RealCoord[0])+','+String(this.RealCoord[1])+')');
                                doGui([300,70], this.RealCoord)
                                guiCom[2] = 1;
                                break
                            case "copper_wire":
                                temp[1] = RusToDis('медный провод'+'('+String(this.RealCoord[0])+','+String(this.RealCoord[1])+')');
                                doGui([300,70], this.RealCoord)
                                guiCom[2] = 2;
                                break
                            case "computer":
                                temp[1] = RusToDis('компьютер'+'('+String(this.RealCoord[0])+','+String(this.RealCoord[1])+')');
                                doGui([300,70], this.RealCoord)
                                guiCom[2] = 3;
                                break
                            case "lamp":
                                temp[1] = RusToDis('лампа'+'('+String(this.RealCoord[0])+','+String(this.RealCoord[1])+')');
                                doGui([300,70], this.RealCoord)
                                guiCom[2] = 4;
                                break
                            case "capacitor":
                                temp[1] = RusToDis('конденсатор'+'('+String(this.RealCoord[0])+','+String(this.RealCoord[1])+')');
                                doGui([300,70], this.RealCoord)
                                guiCom[2] = 5;
                                break
                            case "quad":
                                temp[1] = RusToDis('квадрокоптер'+'('+String(this.RealCoord[0])+','+String(this.RealCoord[1])+')');
                                doGui([300,70], this.RealCoord)
                                guiCom[2] = 6;
                                break
                            case "sand":
                                temp[1] = RusToDis('песок'+'('+String(this.RealCoord[0])+','+String(this.RealCoord[1])+')');
                                doGui([300,70], this.RealCoord)
                                guiCom[2] = 7;
                                break
                            case "mine":
                                temp[1] = RusToDis('шахта'+'('+String(this.RealCoord[0])+','+String(this.RealCoord[1])+')');
                                doGui([300,70], this.RealCoord)
                                guiCom[2] = 8;
                                break
                            default:
                                break
                        }
                        break
                    case 1:
                        if (con[0] && con[1] == 20) {
                            con[0] = false
                            con[1] = 0
                        }
                        else if (con[0] == false && con[1] == 20) {
                            con[0] = true
                            con[1] = 0
                        }
                        break
                    case 2:
                        window.obj.delete(this.RealCoord[0]+','+this.RealCoord[1]);
                        updSlot(this.RealCoord)
                        break
                    case 3:
                        if (kickIf(window.TempObj[0][0],"battery")) {
                            updSlot(this.RealCoord)
                            window.obj.set(this.RealCoord[0]+','+this.RealCoord[1], [["battery",true],[1000,1000],[true,true,true,true],[0]]);
                        }
                        break
                    case 4:
                        if (kickIf(window.TempObj[0][0],"copper_wire")) {
                            updSlot(this.RealCoord)
                            window.obj.set(this.RealCoord[0]+','+this.RealCoord[1], [["copper_wire",true],[0,20],[true,true,true,true],[1,[true,true,true,true],[false,false,false,false]]]);
                        }
                        break
                    case 5:
                        break
                    case 6:
                        if (kickIf(window.TempObj[0][0],"computer")) {
                            updSlot(this.RealCoord)
                            window.obj.set(this.RealCoord[0]+','+this.RealCoord[1], [["computer",true],[0,1],[true,true,true,true],[0,[true,true,true,true],[false,false,false,false],[]]]);
                        }
                        break
                    case 7:
                        if (kickIf(window.TempObj[0][0],"lamp")) {
                            updSlot(this.RealCoord)
                            window.obj.set(this.RealCoord[0]+','+this.RealCoord[1], [["lamp",true],[0,5],[true,true,true,true],[0,[true,true,true,true],[false,false,false,false],[0,250]]]);
                        }
                        break
                    case 8:
                        if (kickIf(window.TempObj[0][0],"capacitor")) {
                            updSlot(this.RealCoord)
                            window.obj.set(this.RealCoord[0]+','+this.RealCoord[1], [["capacitor",true],[0,250],[true,true,true,true],[1,[true,true,true,true],[false,false,false,false]]]);
                        }
                        break
                    case 9:
                        if (kickIf(window.TempObj[0][0],"mine")) {
                            updSlot(this.RealCoord)
                            window.obj.set(this.RealCoord[0]+','+this.RealCoord[1], [["mine",true],[0,0],[false,false,false,false],[0,[true,true,true,true],[false,false,false,false],[0,100]]]);
                        }
                        break
                    case 10:
                        if (kickIf(window.TempObj[0][0],"solar_panel")) {
                            updSlot(this.RealCoord)
                            window.obj.set(this.RealCoord[0]+','+this.RealCoord[1], [["solar_panel",true],[1,10],[true,true,true,true],[1,[true,true,true,true],[false,false,false,false],[0,100]]]);
                        }
                        break
                    case 11:
                        if (kickIf(window.TempObj[0][0],"quad")) {
                            updSlot(this.RealCoord)
                            window.obj.set(this.RealCoord[0]+','+this.RealCoord[1], [["quad",true],[1,50],[false,false,false,false],[0,[true,true,true,true],[false,false,false,false],[0,0,[],[]],[0,5]]]);
                        }
                        break
                    case 12:
                        if (kickIf(window.TempObj[0][0],"furnace")) {
                            updSlot(this.RealCoord)
                            window.obj.set(this.RealCoord[0]+','+this.RealCoord[1], [["furnace",true],[0,100],[false,false,true,false],[0,[true,true,true,true],[false,false,false,false],[0,50]]]);
                        }
                        break
                    case 13:
                        if (kickIf(window.TempObj[0][0],"sand")) {
                            updSlot(this.RealCoord)
                            window.obj.set(this.RealCoord[0]+','+this.RealCoord[1], [["sand",true],[0,500],[false,false,false,false],[0,[true,true,true,true],[false,false,false,false],[0,5]]]);
                        }
                        break
                    case 14:
                        if (kickIf(window.TempObj[0][0],"bricks")) {
                            updSlot(this.RealCoord)
                            window.obj.set(this.RealCoord[0]+','+this.RealCoord[1], [["bricks",true],[0,0],[false,false,false,false],[0,[true,true,true,true],[false,false,false,false]]]);
                        }
                        break
                    default:
                        break
                }
                if (guiCom[1] == this.RealCoord[0]+','+this.RealCoord[1] && itmNow > 1) {
                    guiCom[0] = false;
                    outSWI = [];
                    outSWI = false;
                }
            }
        }
    }
    show(coord,RealCoord) {
        this.posInteraction([16*window.scope,16*window.scope], coord);
        this.interaction(RealCoord);
        window.TempObj = window.obj.get(this.RealCoord[0]+','+this.RealCoord[1]);
        if (window.TempObj == undefined) { window.TempObj=[0] }
        switch(window.TempObj[0][0]) {
            case "battery":
                me = window.obj.get(this.RealCoord[0]+','+this.RealCoord[1]);
                if ((upd || updHad(me[0][1])) && onScreen(this.RealCoord)) {
                    doSprite(window.battery, coord, [window.scope,window.scope]);
                    me[0][1] = false
                }
                //power = window.obj.get(this.RealCoord[0]+','+this.RealCoord[1])[1];
                //doRedSprite(window.battery, coord, [window.scope,window.scope], stab(power[0],power[1]));
                break
            case "copper_wire":
                me = window.obj.get(this.RealCoord[0]+','+this.RealCoord[1]);
                power = window.obj.get(this.RealCoord[0]+','+this.RealCoord[1])[1];
                n = me[3][2].filter((value) => value).length;
                doRedSprite(window.copperWire[1], coord, [window.scope,window.scope],power[0]);
                window.TempObj = window.obj.get(this.RealCoord[0]+','+(this.RealCoord[1]-1));
                if (window.TempObj == undefined) { window.TempObj=[0] }
                else if (window.TempObj[2][2] == false || me[2][0] == false) {}
                else {
                    doRedSprite(window.copperWire[2], coord, [window.scope,window.scope], power[0]);
                    me[3][2][0] = true;
                    if (power[1] > power[0] && window.TempObj[1][0] > n && me[3][1][0] == true) {
                        power[0] = power[0] + (n+1)
                        window.TempObj[1][0] = window.TempObj[1][0] - (n+1)
                        if (window.TempObj[3][0] == 1) {
                            window.TempObj[3][1][2] = false
                        }
                    }
                    else if (me[3][1][0] == false) {
                        doRedSprite(window.copperWire[6], coord, [window.scope,window.scope], power[0]);
                    }
                }

                window.TempObj = window.obj.get((this.RealCoord[0]+1)+','+this.RealCoord[1]);
                if (window.TempObj == undefined) { window.TempObj=[0] }
                else if (window.TempObj[2][1] == false || me[2][3] == false) {}
                else {
                    doRedSprite(window.copperWire[3], coord, [window.scope,window.scope], power[0]);
                    me[3][2][1] = true;
                    if (power[1] > power[0] && window.TempObj[1][0] > n && me[3][1][1] == true) {
                        power[0] = power[0] + (n+1)
                        window.TempObj[1][0] = window.TempObj[1][0] - (n+1)
                        if (window.TempObj[3][0] == 1) {
                            window.TempObj[3][1][3] = false
                        }
                    }
                    else if (me[3][1][1] == false) {
                        doRedSprite(window.copperWire[7], coord, [window.scope,window.scope], power[0]);
                    }
                }

                window.TempObj = window.obj.get(this.RealCoord[0]+','+(this.RealCoord[1]+1));
                if (window.TempObj == undefined) { window.TempObj=[0] }
                else if (window.TempObj[2][0] == false || me[2][2] == false) {}
                else {
                    doRedSprite(window.copperWire[4], coord, [window.scope,window.scope], power[0]);
                    me[3][2][2] = true;
                    if (power[1] > power[0] && window.TempObj[1][0] > n && me[3][1][2] == true) {
                        power[0] = power[0] + (n+1)
                        window.TempObj[1][0] = window.TempObj[1][0] - (n+1)
                        if (window.TempObj[3][0] == 1) {
                            window.TempObj[3][1][0] = false
                        }
                    }
                    else if (me[3][1][2] == false) {
                        doRedSprite(window.copperWire[8], coord, [window.scope,window.scope], power[0]);
                    }
                }

                window.TempObj = window.obj.get((this.RealCoord[0]-1)+','+this.RealCoord[1]);
                if (window.TempObj == undefined) { window.TempObj=[0] }
                else if (window.TempObj[2][3] == false || me[2][1] == false) {}
                else {
                    doRedSprite(window.copperWire[5], coord, [window.scope,window.scope], power[0]);
                    me[3][2][3] = true;
                    if (power[1] > power[0] && window.TempObj[1][0] > n && me[3][1][3] == true) {
                        power[0] = power[0] + (n+1)
                        window.TempObj[1][0] = window.TempObj[1][0] - (n+1)
                        if (window.TempObj[3][0] == 1) {
                            window.TempObj[3][1][1] = false
                        }
                    }
                    else if (me[3][1][3] == false) {
                        doRedSprite(window.copperWire[9], coord, [window.scope,window.scope], power[0]);
                    }
                }
                power[0] = stab(power[0],power[1])
                window.obj.get(this.RealCoord[0]+','+this.RealCoord[1])[1][0] = power[0];
                break
            case "computer":
                n = findEnergy(this.RealCoord,0)
                if ((upd || updHad(me[0][1])) && onScreen(this.RealCoord)) {
                    doSprite(window.comp, coord, [window.scope,window.scope]);
                    me[0][1] = false
                }
                break
            case "lamp":
                n = findEnergy(this.RealCoord,1)
                window.TempObj = window.obj.get(this.RealCoord[0]+','+this.RealCoord[1]);
                if (n > 0 && window.TempObj[3][3][1] > window.TempObj[3][3][0]) {
                    doSprite(window.lamp[1], coord, [window.scope,window.scope]);
                    TempObj[3][3][0]++
                    if (window.TempObj[3][3][0] == window.TempObj[3][3][1]) {
                        window.TempObj[3][3][0] = 0;
                        n--;
                    }
                }
                else {
                    doSprite(window.lamp[0], coord, [window.scope,window.scope]);
                }
                window.obj.get(this.RealCoord[0]+','+this.RealCoord[1])[1][0] = n;
                break
            case "capacitor":
                me = window.obj.get(this.RealCoord[0]+','+this.RealCoord[1]);
                n = findEnergy(this.RealCoord,0)
                if ((upd || updHad(me[0][1])) && onScreen(this.RealCoord)) {
                    doSprite(window.capa, coord, [window.scope,window.scope]);
                    me[0][1] = false
                }
                //doRedSprite(window.capa, coord, [window.scope,window.scope], n);
                window.obj.get(this.RealCoord[0]+','+this.RealCoord[1])[1][0] = n;
                break
            case "mine":
                me = window.obj.get(this.RealCoord[0]+','+this.RealCoord[1]);
                window.TempObj = window.obj.get(this.RealCoord[0]+','+(this.RealCoord[1]-1));
                if ((upd || updHad(me[0][1])) && onScreen(this.RealCoord)) {
                    doSprite(window.mine, coord, [window.scope,window.scope]);
                    me[0][1] = false
                }
                if (me[3][3][1] > me[3][3][0] && window.TempObj == undefined) {
                    me[3][3][0]++
                    if (me[3][3][0] == me[3][3][1]) {
                        window.obj.set(this.RealCoord[0]+','+(this.RealCoord[1]-1), [["sand",true],[0,500],[true,true,true,true],[0,[true,true,true,true],[false,false,false,false],[0,5]]]);
                        me[3][3][0] = 0;
                        me[0][1] = true
                    }
                    else if ((me[3][3][0] + 10) == me[3][3][1]) {
                        doSprite(window.sand, coord, [window.scope,window.scope]);
                    }
                }
                break
            case "solar_panel":
                n = findEnergy(this.RealCoord,1)
                me = window.obj.get(this.RealCoord[0]+','+this.RealCoord[1]);
                window.TempObj = window.obj.get(this.RealCoord[0]+','+this.RealCoord[1]);
                if ((upd || updHad(me[0][1])) && onScreen(this.RealCoord)) {
                    doSprite(window.sol, coord, [window.scope,window.scope]);
                    me[0][1] = false
                }
                if (window.TempObj[1][1] > window.TempObj[1][0] && window.TempObj[3][3][1] > window.TempObj[3][3][0]) {
                    TempObj[3][3][0]++
                    if (window.TempObj[3][3][0] == window.TempObj[3][3][1]) {
                        window.TempObj[3][3][0] = 0;
                        n++;
                    }
                }
                window.obj.get(this.RealCoord[0]+','+this.RealCoord[1])[1][0] = n;
                break
            case "quad":
                me = window.obj.get(this.RealCoord[0]+','+this.RealCoord[1]);
                if (me[3][3][3] == undefined) {
                    doSprite(window.quad[0], coord, [window.scope,window.scope]);
                }
                else if (me[3][3][3].length == 0) {
                    doSprite(window.quad[0], coord, [window.scope,window.scope]);
                }
                else {
                    doSprite(window.quad[1], coord, [window.scope,window.scope]);
                }
                power = window.obj.get(this.RealCoord[0]+','+this.RealCoord[1])[1];

                window.TempObj = window.obj.get(this.RealCoord[0]+','+(this.RealCoord[1]+1));
                if (window.TempObj == undefined) { window.TempObj=[0,0,0,[0,0,0,[0,0,0]]] }
                else {
                    if (power[1] > power[0] && window.TempObj[1][0] > 0 && window.TempObj[0][0] == "computer") {
                        power[0] = power[0] + 1
                        window.TempObj[1][0] = window.TempObj[1][0] - 1
                    }
                }
                //if (window.TempObj[3][3][2].length == undefined) {window.TempObj[3][3][2].length = 0}
                if (power[1] == power[0] && window.TempObj[0][0] == "computer") {
                    me[3][3][0] = 0;
                    me[3][3][2] = window.TempObj[3][3]
                    me[3][3][1] = window.TempObj[3][3].length
                }

                if (me[3][4][1] > me[3][4][0]) {
                    me[3][4][0]++
                    if (me[3][4][0] == me[3][4][1]) {
                        if (me[3][3][1] > me[3][3][0] && power[0] != 0) {
                            switch(me[3][3][2][me[3][3][0]]) {
                                case 51:
                                    window.TempObj = window.obj.get(this.RealCoord[0]+','+(this.RealCoord[1]-1));
                                    if (window.TempObj == undefined) {
                                        window.obj.delete(this.RealCoord[0]+','+this.RealCoord[1]);
                                        window.obj.set(this.RealCoord[0]+','+(this.RealCoord[1]-1),me)
                                    }
                                    power[0]--
                                    break
                                case 52:
                                    window.TempObj = window.obj.get((this.RealCoord[0]+1)+','+this.RealCoord[1]);
                                    if (window.TempObj == undefined) {
                                        window.obj.delete(this.RealCoord[0]+','+this.RealCoord[1]);
                                        window.obj.set((this.RealCoord[0]+1)+','+this.RealCoord[1],me)
                                    }
                                    power[0]--
                                    break
                                case 53:
                                    window.TempObj = window.obj.get(this.RealCoord[0]+','+(this.RealCoord[1]+1));
                                    if (window.TempObj == undefined) {
                                        window.obj.delete(this.RealCoord[0]+','+this.RealCoord[1]);
                                        window.obj.set(this.RealCoord[0]+','+(this.RealCoord[1]+1),me)
                                    }
                                    power[0]--
                                    break
                                case 54:
                                    window.TempObj = window.obj.get((this.RealCoord[0]-1)+','+this.RealCoord[1]);
                                    if (window.TempObj == undefined) {
                                        window.obj.delete(this.RealCoord[0]+','+this.RealCoord[1]);
                                        window.obj.set((this.RealCoord[0]-1)+','+this.RealCoord[1],me)
                                    }
                                    power[0]--
                                    break
                                case 55:
                                    switch(me[3][3][2][me[3][3][0]-1]) {
                                        case 51:
                                            window.TempObj = window.obj.get(this.RealCoord[0]+','+(this.RealCoord[1]-1));
                                            if (me[3][3][3] == undefined) {}
                                            else if (window.TempObj == undefined) {
                                                me[3][3][0]--
                                            }
                                            else {
                                                me[3][3][3] = window.TempObj
                                                window.obj.delete(this.RealCoord[0]+','+(this.RealCoord[1]-1));
                                            }
                                            break
                                        case 52:
                                            window.TempObj = window.obj.get((this.RealCoord[0]+1)+','+this.RealCoord[1]);
                                            if (me[3][3][3] == undefined) {}
                                            else if (window.TempObj == undefined) {
                                                me[3][3][0]--
                                            }
                                            else {
                                                me[3][3][3] = window.TempObj
                                                window.obj.delete((this.RealCoord[0]+1)+','+this.RealCoord[1]);
                                            }
                                            break
                                        case 53:
                                            window.TempObj = window.obj.get(this.RealCoord[0]+','+(this.RealCoord[1]+1));
                                            if (me[3][3][3] == undefined) {}
                                            else if (window.TempObj == undefined) {
                                                me[3][3][0]--
                                            }
                                            else {
                                                me[3][3][3] = window.TempObj
                                                window.obj.delete(this.RealCoord[0]+','+(this.RealCoord[1]+1));
                                            }
                                            break
                                        case 54:
                                            window.TempObj = window.obj.get((this.RealCoord[0]-1)+','+this.RealCoord[1]);
                                            if (me[3][3][3] == undefined) {}
                                            else if (window.TempObj == undefined) {
                                                me[3][3][0]--
                                            }
                                            else {
                                                me[3][3][3] = window.TempObj
                                                window.obj.delete((this.RealCoord[0]-1)+','+this.RealCoord[1]);
                                            }
                                            break
                                        default:
                                            window.TempObj = window.obj.get(this.RealCoord[0]+','+(this.RealCoord[1]+1));
                                            if (me[3][3][3] == undefined) {}
                                            else if (window.TempObj == undefined) {
                                                me[3][3][0]--
                                            }
                                            else {
                                                me[3][3][3] = window.TempObj
                                                window.obj.delete(this.RealCoord[0]+','+(this.RealCoord[1]+1));
                                            }
                                            break
                                    }
                                    power[0]--
                                    break
                                case 56:
                                    switch(me[3][3][2][me[3][3][0]-1]) {
                                        case 51:
                                            window.TempObj = window.obj.get(this.RealCoord[0]+','+(this.RealCoord[1]-1));
                                            if (me[3][3][3] == undefined) {}
                                            else if (window.TempObj == undefined) {
                                                window.obj.set(this.RealCoord[0]+','+(this.RealCoord[1]-1), me[3][3][3]);
                                                me[3][3][3] = [];
                                            }
                                            break
                                        case 52:
                                            window.TempObj = window.obj.get((this.RealCoord[0]+1)+','+this.RealCoord[1]);
                                            if (me[3][3][3] == undefined) {}
                                            else if (window.TempObj == undefined) {
                                                window.obj.set((this.RealCoord[0]+1)+','+this.RealCoord[1], me[3][3][3]);
                                                me[3][3][3] = [];
                                            }
                                            break
                                        case 53:
                                            window.TempObj = window.obj.get(this.RealCoord[0]+','+(this.RealCoord[1]+1));
                                            if (me[3][3][3] == undefined) {}
                                            else if (window.TempObj == undefined) {
                                                window.obj.set(this.RealCoord[0]+','+(this.RealCoord[1]+1), me[3][3][3]);
                                                me[3][3][3] = [];
                                            }
                                            break
                                        case 54:
                                            window.TempObj = window.obj.get((this.RealCoord[0]-1)+','+this.RealCoord[1]);
                                            if (me[3][3][3] == undefined) {}
                                            else if (window.TempObj == undefined) {
                                                window.obj.set((this.RealCoord[0]-1)+','+this.RealCoord[1], me[3][3][3]);
                                                me[3][3][3] = [];
                                            }
                                            break
                                        default:
                                            window.TempObj = window.obj.get(this.RealCoord[0]+','+(this.RealCoord[1]+1));
                                            if (me[3][3][3] == undefined) {}
                                            else if (window.TempObj == undefined) {
                                                window.obj.set(this.RealCoord[0]+','+(this.RealCoord[1]+1), me[3][3][3]);
                                                me[3][3][3] = [];
                                            }
                                            break
                                    }
                                    power[0]--
                                    break
                                case 57:
                                    window.TempObj = window.obj.get(this.RealCoord[0]+','+(this.RealCoord[1]-1));
                                    if (window.TempObj == undefined) {
                                        window.obj.delete(this.RealCoord[0]+','+this.RealCoord[1]);
                                        window.obj.set(this.RealCoord[0]+','+(this.RealCoord[1]-1),me)
                                        power[0]--
                                    }
                                    else {
                                        me[3][3][0]--
                                    }
                                    break
                                case 58:
                                    window.TempObj = window.obj.get((this.RealCoord[0]+1)+','+this.RealCoord[1]);
                                    if (window.TempObj == undefined) {
                                        window.obj.delete(this.RealCoord[0]+','+this.RealCoord[1]);
                                        window.obj.set((this.RealCoord[0]+1)+','+this.RealCoord[1],me)
                                        power[0]--
                                    }
                                    else {
                                        me[3][3][0]--
                                    }
                                    break
                                case 59:
                                    window.TempObj = window.obj.get(this.RealCoord[0]+','+(this.RealCoord[1]+1));
                                    if (window.TempObj == undefined) {
                                        window.obj.delete(this.RealCoord[0]+','+this.RealCoord[1]);
                                        window.obj.set(this.RealCoord[0]+','+(this.RealCoord[1]+1),me)
                                        power[0]--
                                    }
                                    else {
                                        me[3][3][0]--
                                    }
                                    break
                                case 60:
                                    window.TempObj = window.obj.get((this.RealCoord[0]-1)+','+this.RealCoord[1]);
                                    if (window.TempObj == undefined) {
                                        window.obj.delete(this.RealCoord[0]+','+this.RealCoord[1]);
                                        window.obj.set((this.RealCoord[0]-1)+','+this.RealCoord[1],me)
                                        power[0]--
                                    }
                                    else {
                                        me[3][3][0]--
                                    }
                                    break
                                case 61:
                                    break
                                default:
                                    break
                            }
                            me[3][3][0]++
                        }
                        me[3][4][0] = 0;
                    }
                }
                break
            case "furnace":
                power = window.obj.get(this.RealCoord[0]+','+this.RealCoord[1])[1];
                me = window.obj.get(this.RealCoord[0]+','+this.RealCoord[1]);

                window.TempObj = window.obj.get(RealCoord[0]+','+(RealCoord[1]+1));
                if (window.TempObj == undefined) { window.TempObj=[0] }
                else if (window.TempObj[2][0] == false || me[2][2] == false) {}
                else {
                    if (power[1] > power[0] && window.TempObj[1][0] > 0) {
                        power[0]++
                        window.TempObj[1][0]--
                        if (window.TempObj[3][0] == 1) {
                            window.TempObj[3][1][0] = false
                        }
                    }
                }

                if (power[0] > 0 && me[3][3][1] > me[3][3][0]) {
                    doSprite(window.furn[1], coord, [window.scope,window.scope]);
                    me[3][3][0]++
                    if (me[3][3][0] == me[3][3][1]) {
                        me[3][3][0] = 0;
                        power[0]--;
                    }
                }
                else {
                    doSprite(window.furn[0], coord, [window.scope,window.scope]);
                }
                window.obj.get(this.RealCoord[0]+','+this.RealCoord[1])[1][0] = power[0];
                break
            case "sand":
                me = window.obj.get(this.RealCoord[0]+','+this.RealCoord[1]);
                power = window.obj.get(this.RealCoord[0]+','+this.RealCoord[1])[1];
                window.TempObj = window.obj.get(this.RealCoord[0]+','+(this.RealCoord[1]+1));

                if (window.TempObj == undefined) {}
                else {
                    if (power[1] > power[0] && window.TempObj[1][0] > 0 && window.TempObj[0][0] == "furnace") {
                        power[0]++
                        window.TempObj[1][0]--
                    }
                }

                if (me[3][3][1] > me[3][3][0]) {
                    me[3][3][0]++
                    if (me[3][3][0] == me[3][3][1]) {
                        if (power[0] > 0) {
                            power[0]--
                        }
                        window.TempObj = window.obj.get(this.RealCoord[0]+','+(this.RealCoord[1]+1));
                        if (window.TempObj == undefined && this.RealCoord[1] != map[1]) {
                            window.obj.delete(this.RealCoord[0]+','+this.RealCoord[1]);
                            //updSlot(this.RealCoord);
                            window.obj.set(this.RealCoord[0]+','+(this.RealCoord[1]+1),me)
                        }
                        me[3][3][0] = 0;
                    }
                }

                if (power[0] == power[1]) {
                    window.obj.set(this.RealCoord[0]+','+this.RealCoord[1], ["glass",[0,0],[true,true,true,true],[0,[true,true,true,true],[false,false,false,false]]]);
                }
                if ((upd || updHad(me[0][1])) && onScreen(this.RealCoord)) {
                    doSprite(window.sand, coord, [window.scope,window.scope]);
                    me[0][1] = false
                }
                //doRedSprite(window.sand, coord, [window.scope,window.scope], power[0]);
                break
            case "glass":
                me = window.obj.get(this.RealCoord[0]+','+this.RealCoord[1]);
                if (upd || updHad(me[0][1])) {
                    doSprite(window.glass, coord, [window.scope,window.scope]);
                    me[0][1] = false
                }
                break
            case "bricks":
                me = window.obj.get(this.RealCoord[0]+','+this.RealCoord[1]);
                if ((upd || updHad(me[0][1])) && onScreen(this.RealCoord)) {
                    doSprite(window.bricks, coord, [window.scope,window.scope]);
                    me[0][1] = false
                }
                break
        }
    }
}

class Gui {
    constructor() {
        this.pos1 = [];
        this.pos2 = [];
        this.pos3 = [];
        this.pos4 = [];

        this.size = [];

        this.ratio = [];
        this.press = false;
        this.coord = [0,0];
        this.RealCoord = [];
    }
    posInteraction(elem1, coord1) {
        this.pos1 = [coord1[0],coord1[1]];
        this.pos2 = [coord1[0]+elem1[0],coord1[1]+elem1[1]];
        this.pos3 = [coord1[0]+elem1[0],coord1[1]+15];
        this.pos4 = [coord1[0]+15,coord1[1]+15];
    }
    interaction() {
        if (this.pos1[0] < window.x && this.pos1[1] < window.y && this.pos4[0] > window.x && this.pos4[1] > window.y) {
            if (window.CLICK == true) {
                guiCom[0] = false;
                out = [];
                outSWI = false;
            }
        }
        else if (this.pos1[0] < window.x && this.pos1[1] < window.y && this.pos3[0] > window.x && this.pos3[1] > window.y) {
            this.press = true
            upd = true
        }
        window.CLICK = false;
        if (isMouseDown == true && this.press) {
            if (this.ratio === undefined || this.ratio.length == 0) {
                this.ratio[0] = window.x - this.coord[0];
                this.ratio[1] = window.y - this.coord[1];
            }
            this.coord = [window.x-this.ratio[0],window.y-this.ratio[1]]
        }
        else {
            this.ratio = [];
            this.press = false;
        }
    }
    show() {
        this.interaction();
        this.posInteraction(this.size, this.coord);
        displayAtWork[1].fillStyle = "#1b1b1b";
        displayAtWork[1].fillRect(this.coord[0], this.coord[1], this.pos2[0] - this.coord[0], this.pos2[1] - this.coord[1]);

        displayAtWork[1].fillStyle = "#2f2f2f";
        displayAtWork[1].fillRect(this.coord[0], this.coord[1], this.pos3[0] - this.coord[0], this.pos3[1] - this.coord[1]);

        doRusText(temp[1], [this.coord[0]+20,this.coord[1]+2],13,[2,2])

        displayAtWork[1].fillStyle = "#9f0000";
        displayAtWork[1].fillRect(this.coord[0], this.coord[1], this.pos4[0] - this.coord[0], this.pos4[1] - this.coord[1]);
        doSprite(lettersRus[50],[this.coord[0],this.pos3[1]],[2,2])
        n = out
        if (con[2]) {
            n.push(50)
        }
        else {
            n.push(36)
        }
        doRusText(n, [this.coord[0]+15,this.pos3[1]],12,[2,2])
        n.pop();
    }
}

document.addEventListener('keydown', function(event) {
    if (outSWI == false) {
        if (event.code == 'KeyQ') {
            if (scope != 0.5) {
                window.scope++;
            }
            else window.scope=1;
            upd = true;
        }
        else if (event.code == 'KeyE') {
            if (window.scope == 0.5) {
                null
            }
            else if (scope != 1) {
                window.scope--;
            }
            else window.scope=0.5;
            upd = true;
        }

        if (event.code == 'KeyA') {
            window.start[0]++;
            upd = true;
        }
        else if (event.code == 'KeyD') {
            window.start[0]--;
            upd = true;
        }

        if (event.code == 'KeyW') {
            window.start[1]++;
            upd = true;
        }
        else if (event.code == 'KeyS') {
            window.start[1]--;
            upd = true;
        }

        if (event.code == 'KeyT') {
            window.itmNow++
            if (window.itmNow > bundle.length-1) {
                window.itmNow = 0;
            }
            upd = true;
        }
        else if (event.code == 'KeyR') {
            window.itmNow--
            if (window.itmNow < 0) {
                window.itmNow=bundle.length-1
            }
            upd = true;
        }

        if (event.code == 'KeyP') {
            if (window.con[3]) {
                window.con[3] = false
            }
            else {
                window.con[3] = true;
            }
            upd = true;
        }
    }
})
function wheel(e) {
    window.itmNow = window.itmNow + event.deltaY/100 * -1
    if (window.itmNow > bundle.length-1) {
        window.itmNow = 0;
    }
    else if (window.itmNow < 0) {
        window.itmNow=bundle.length-1
    }
}
function nearItem(list,leng) {
    if (list > bundle.length-1) {
        return list - leng.length;
    }
    else if (list < 0) {
        return leng.length+list
    }
    else {
        return list
    }
}

function TYPE() {
    doSprite(bundle[nearItem(itmNow-2,bundle)],[50,getCenterY()-150],[2,2]);
    doSprite(bundle[nearItem(itmNow-1,bundle)],[50,getCenterY()-75],[3,3]);
    doSprite(bundle[itmNow],[50,getCenterY()-20],[5,5]);
    doSprite(bundle[nearItem(itmNow+1,bundle)],[50,getCenterY()+75],[3,3]);
    doSprite(bundle[nearItem(itmNow+2,bundle)],[50,getCenterY()+150],[2,2]);

    doSprite(bundle[nearItem(itmNow,bundle)],[25,50],[6,6]);

    if (con[0]) {
        n = Array.from(String(window.pow), Number);
        for (let i = 0; i != n.length; i++) {
            doSprite(numbers[n[i]],[52+(i*10),150],[3,3]);
        }
        doRusText(temp[0],[50,170],13,[3,3])
    }

    /*doSprite(bundle[itmNow],[window.x-15,window.y-20],[2,2]);
    if (con[0]) {
        n = Array.from(String(window.pow), Number);
        for (let i = 0; i != n.length; i++) {
            doSprite(numbers[n[i]],[window.x+20+(i*10),window.y-15],[3,3]);
        }
        doRusText(temp[0], [window.x+5,window.y-35],13,[3,3])
    }*/
}

document.body.onmousedown = function() {
    isMouseDown = true;
}
document.body.onmouseup = function() {
    isMouseDown = false;
}

addEventListener("wheel", wheel);
addEventListener('mousemove', pos, false);
addEventListener('click', click, false);
